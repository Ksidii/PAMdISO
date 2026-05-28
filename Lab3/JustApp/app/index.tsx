import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  ListRenderItem,
  TextInput,
  Pressable
} from 'react-native';

// --- INTERFEJSY ---
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}


export default function App() {
  // --- STANY CZĘŚCI A (Pobieranie) ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // --- STANY CZĘŚCI B (Formularz i wysyłanie) ---
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [createdPost, setCreatedPost] = useState<Post | null>(null);

  // --- FUNKCJE LOGIKI BIZNESOWEJ ---

  // Funkcja pobierająca listę (Część A)
  const fetchPosts = async () => {
    try {
      setIsFetching(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      if (err instanceof Error) {
        setFetchError(err.message);
      } else {
        setFetchError('Wystąpił nieznany błąd połączenia.');
      }
    } finally {
      setIsFetching(false);
    }
  };

  // Funkcja dodająca nowy post (Część B)
  const createPost = async () => {
    // 1. Walidacja: sprawdzenie, czy pola nie są puste
    if (!title.trim() || !body.trim() || !userId.trim()) {
      setFeedback({ type: 'error', message: 'Wypełnij wszystkie pola formularza.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback(null);
      setCreatedPost(null);

      // 2. Żądanie POST
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Zamieniamy userId na liczbę, bo tego oczekuje API
        body: JSON.stringify({
          title: title,
          body: body,
          userId: parseInt(userId, 10),
        }),
      });

      // 3. Sprawdzenie poprawności odpowiedzi
      if (!response.ok) {
        throw new Error(`Błąd serwera przy zapisie: ${response.status}`);
      }

      // 4. Sukces: Parsowanie i aktualizacja stanów
      const data: Post = await response.json();
      
      setFeedback({ type: 'success', message: 'Sukces! Post został wysłany.' });
      setCreatedPost(data); // Zapisujemy odpowiedź serwera, by ją wyświetlić
      
      // Opcjonalnie: dodanie nowego posta na samą górę naszej lokalnej listy
      setPosts((prevPosts) => [data, ...prevPosts]);

      // 5. Czyszczenie formularza
      setTitle('');
      setBody('');
      setUserId('');

    } catch (err) {
      // Obsługa błędów sieciowych
      if (err instanceof Error) {
        setFeedback({ type: 'error', message: err.message });
      } else {
        setFeedback({ type: 'error', message: 'Nie udało się wysłać posta.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Uruchomienie pobierania przy starcie (Część A)
  useEffect(() => {
    fetchPosts();
  }, []);

  // --- KOMPONENTY INTERFEJSU ---

  // Wygląd pojedynczego elementu na liście
  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <View className="bg-white p-4 mb-3 rounded-xl shadow-sm elevation-2 border border-gray-100">
      <View className="flex-row justify-between mb-2">
        <Text className="text-xs text-blue-500 font-bold">User: {item.userId}</Text>
        <Text className="text-xs text-gray-400">Post #{item.id}</Text>
      </View>
      <Text className="text-lg font-bold text-gray-900 mb-2 capitalize">
        {item.title}
      </Text>
      <Text className="text-sm text-gray-600 leading-5">
        {item.body}
      </Text>
    </View>
  );

  // Komponent formularza (nagłówek listy)
  const FormHeader = () => (
    <View className="mb-6">
      <Text className="text-2xl font-bold text-center my-4 text-gray-800">
        Panel Postów
      </Text>

      {/* Wizualnie oddzielony formularz */}
      <View className="bg-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm elevation-1 mb-6">
        <Text className="text-lg font-bold text-blue-900 mb-4">Dodaj nowy wpis</Text>

        <TextInput
          className="bg-white border border-blue-200 rounded-lg p-3 mb-3 text-base text-gray-800"
          placeholder="Tytuł posta"
          value={title}
          onChangeText={setTitle}
        />
        
        <TextInput
          className="bg-white border border-blue-200 rounded-lg p-3 mb-3 text-base text-gray-800 min-h-[80px]"
          placeholder="Treść (body)"
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />

        <TextInput
          className="bg-white border border-blue-200 rounded-lg p-3 mb-4 text-base text-gray-800"
          placeholder="ID Użytkownika (np. 1)"
          value={userId}
          onChangeText={setUserId}
          keyboardType="numeric" // Wywołuje klawiaturę numeryczną
        />

        <Pressable 
          className={`p-4 rounded-lg items-center ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600'}`}
          onPress={createPost}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-bold text-base">Wyślij post</Text>
          )}
        </Pressable>

        {/* Informacja zwrotna (Sukces / Błąd) */}
        {feedback && (
          <View className={`mt-4 p-3 rounded-lg ${feedback.type === 'success' ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
            <Text className={`text-center font-bold ${feedback.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {feedback.message}
            </Text>
          </View>
        )}

        {/* Wyświetlenie odpowiedzi serwera po sukcesie */}
        {createdPost && (
          <View className="mt-4 p-4 bg-gray-900 rounded-lg">
            <Text className="text-gray-300 text-xs mb-2 uppercase tracking-widest font-bold">Odpowiedź serwera (JSON):</Text>
            <Text className="text-green-400 font-mono text-xs">
              {JSON.stringify(createdPost, null, 2)}
            </Text>
          </View>
        )}
      </View>

      <Text className="text-xl font-bold text-gray-800 mb-2">Ostatnie wpisy</Text>
    </View>
  );

  // --- GŁÓWNY RENDER ---

  if (isFetching) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600 font-medium">Ładowanie danych...</Text>
      </View>
    );
  }

  if (fetchError) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <Text className="text-2xl font-bold text-red-600 mb-2 text-center">Błąd połączenia</Text>
        <Text className="text-gray-600 text-center mb-6">{fetchError}</Text>
        <Pressable className="bg-blue-600 px-6 py-3 rounded-lg" onPress={fetchPosts}>
          <Text className="text-white font-bold">Spróbuj ponownie</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 h-full bg-gray-50">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        // Używamy ListHeaderComponent, aby formularz przewijał się razem z listą!
        ListHeaderComponent={<FormHeader />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}