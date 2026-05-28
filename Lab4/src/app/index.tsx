import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  ScrollView, 
  RefreshControl, 
  SafeAreaView 
} from 'react-native';
import * as Location from 'expo-location';

// Interfejsy danych
interface AirQualityData {
  pm10: number;
  pm2_5: number;
}

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [currentAirQuality, setCurrentAirQuality] = useState<AirQualityData | null>(null);
  const [compareAirQuality, setCompareAirQuality] = useState<AirQualityData | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Współrzędne dla miasta do porównania (np. Warszawa)
  const COMPARE_CITY = { name: 'Warszawa', lat: 52.2297, lon: 21.0122 };

  const fetchAirQuality = async (lat: number, lon: number) => {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Błąd połączenia z API Open-Meteo');
    const data = await response.json();
    
    if (!data.current) throw new Error('Brak danych dla tej lokalizacji');
    return {
      pm10: data.current.pm10,
      pm2_5: data.current.pm2_5,
    };
  };

  const loadData = async () => {
    setErrorMsg(null);
    try {
      // 1. Sprawdzenie i prośba o uprawnienia
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Odmowa dostępu do lokalizacji. Aplikacja nie może działać bez GPS.');
        setLoading(false);
        return;
      }

      // 2. Pobranie lokalizacji
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // 3. Pobranie danych o jakości powietrza dla bieżącej lokalizacji i miasta porównawczego
      const [currentData, compareData] = await Promise.all([
        fetchAirQuality(currentLocation.coords.latitude, currentLocation.coords.longitude),
        fetchAirQuality(COMPARE_CITY.lat, COMPARE_CITY.lon)
      ]);

      setCurrentAirQuality(currentData);
      setCompareAirQuality(compareData);

    } catch (error: any) {
      setErrorMsg(error.message || 'Wystąpił nieoczekiwany błąd.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  // Funkcja pomocnicza do kolorowania wskaźników (bardzo uproszczona skala)
  const getQualityColor = (value: number, type: 'pm10' | 'pm2_5') => {
    const limit = type === 'pm10' ? 40 : 25; // Przykładowe normy WHO w uproszczeniu
    return value > limit ? '#e74c3c' : '#2ecc71';
  };

  const renderCard = (title: string, data: AirQualityData | null) => {
    if (!data) return null;
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>PM2.5:</Text>
          <Text style={[styles.value, { color: getQualityColor(data.pm2_5, 'pm2_5') }]}>
            {data.pm2_5} µg/m³
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>PM10:</Text>
          <Text style={[styles.value, { color: getQualityColor(data.pm10, 'pm10') }]}>
            {data.pm10} µg/m³
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10 }}>Pobieranie danych GPS i jakości powietrza...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.header}>Monitor Jakości Powietrza</Text>

        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : (
          <>
            {renderCard('Twoja Lokalizacja', currentAirQuality)}
            
            <View style={styles.divider} />
            
            {renderCard(`Porównanie: ${COMPARE_CITY.name}`, compareAirQuality)}
            
            <Text style={styles.hint}>Pociągnij w dół, aby odświeżyć dane</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2f3640', marginTop: 20 },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#353b48', textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 16, color: '#7f8fa6' },
  value: { fontSize: 16, fontWeight: 'bold' },
  errorContainer: { backgroundColor: '#ffcccc', padding: 15, borderRadius: 8, width: '100%' },
  errorText: { color: '#c0392b', textAlign: 'center', fontWeight: 'bold' },
  divider: { height: 1, width: '80%', backgroundColor: '#dcdde1', marginVertical: 15 },
  hint: { marginTop: 20, color: '#a4b0be', fontSize: 12 },
});