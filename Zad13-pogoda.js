/**
 * Funkcja asynchroniczna pobierająca dane pogodowe z API Open-Meteo.
 * Rozszerzenie własne: Zamiast sztywnych danych, funkcja przyjmuje parametry 
 * (latitude, longitude, cityName), co pozwala na jej wielokrotne użycie.
 */
async function getWeather(latitude, longitude, cityName) {
    // Dynamiczne budowanie endpointu API na podstawie przekazanych współrzędnych
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;

    // Użycie try...catch do przechwytywania błędów sieciowych lub błędów API
    try {
        console.log(`Łączenie z API pogodowym dla miasta: ${cityName}...`);

        // Wysłanie zapytania HTTP. Używamy await, ponieważ fetch zwraca Promise (obietnicę)
        const response = await fetch(url);

        // Ręczne sprawdzenie statusu odpowiedzi. 
        // fetch() nie wyrzuca błędu automatycznie dla kodów HTTP 4xx i 5xx.
        if (!response.ok) {
            throw new Error(`Błąd serwera HTTP. Kod statusu: ${response.status}`);
        }

        // Dekodowanie odpowiedzi z formatu JSON na obiekt JavaScript
        const data = await response.json();

        // Destrukturyzacja / wyciągnięcie konkretnych wartości z zagnieżdżonego obiektu
        const temperature = data.current.temperature_2m;
        const windSpeed = data.current.wind_speed_10m;

        // Wyświetlenie sformatowanego raportu w konsoli
        console.log(`\n=== RAPORT POGODOWY: ${cityName.toUpperCase()} ===`);
        console.log(`Temperatura: ${temperature}°C`);
        console.log(`Prędkość wiatru: ${windSpeed} km/h`);
        console.log("=====================================\n");

    } catch (error) {
        // Blok catch wyłapie błędy takie jak brak internetu, literówka w adresie URL 
        // lub błąd wyrzucony wyżej (kod statusu błędu)
        console.error(`\nBŁĄD POBIERANIA DANYCH DLA: ${cityName}`);
        console.error(`Szczegóły: ${error.message}\n`);
    }
}

// -----------------------------------------------------------------
// WYWOŁANIA I TESTOWANIE FUNKCJI
// -----------------------------------------------------------------

// 1. Sprawdzenie działania dla danych z punktu startowego zadania
getWeather(50.29, 19.10, "Katowice");

// 2. Demonstracja działania rozszerzenia (wielokrotne użycie z innymi parametrami)
getWeather(51.50, -0.12, "Londyn");

// 3. Symulacja błędu - sprawdzenie, czy blok catch poprawnie wyłapie nieprawidłowy adres URL
getWeather("złe", "dane", "Nibylandia");