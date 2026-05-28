# Jakość powietrza w miejscu użytkownika

## Cel aplikacji
Aplikacja mobilna stworzona w celu uświadamiania użytkownika o aktualnym stanie powietrza w jego najbliższym otoczeniu. Głównym zadaniem aplikacji jest pobranie bieżących współrzędnych geograficznych urządzenia, odpytanie zewnętrznego API pogodowego, a następnie czytelna prezentacja zanieczyszczeń pyłami zawieszonymi (PM2.5 oraz PM10). Dodatkowo, w ramach rozszerzenia, aplikacja pozwala na szybkie porównanie lokalnego powietrza ze wskaźnikami dla wybranego dużego miasta (np. Warszawy).

## Wykorzystane dane z urządzenia
Aplikacja wykorzystuje **moduł GPS** urządzenia do pobierania bieżącej lokalizacji użytkownika (długość i szerokość geograficzna). Zgoda na dostęp do lokalizacji jest wymagana do poprawnego działania głównych funkcji aplikacji. Dane te są wykorzystywane wyłącznie w locie do konstruowania zapytań do API pogodowego i nie są nigdzie trwale zapisywane.

## Wykorzystane biblioteki i API
* **React Native / Expo** - główny framework oraz środowisko uruchomieniowe (SDK 52+).
* **expo-location** - biblioteka z ekosystemu Expo służąca do asynchronicznego żądania uprawnień oraz odczytu współrzędnych z modułu GPS.
* **Open-Meteo Air Quality API** (`https://open-meteo.com/en/docs/air-quality-api`) - darmowe, publiczne API niewymagające klucza autoryzacyjnego, z którego pobierane są surowe dane o jakości powietrza na podstawie przekazanych współrzędnych.

## Przepływ danych w aplikacji
1. **Inicjalizacja i Uprawnienia:** Po uruchomieniu aplikacji wyzwalany jest hook `useEffect`, który wywołuje metodę żądającą od użytkownika uprawnień do lokalizacji Foreground.
2. **Pobranie Współrzędnych:** W przypadku zgody, pobierane są aktualne współrzędne urządzenia. W przypadku braku zgody aplikacja zatrzymuje przepływ i wyświetla dedykowany komunikat błędu.
3. **Pobieranie Danych (Fetch):** Współrzędne są przekazywane jako parametry GET do endpointu Open-Meteo. Równolegle (za pomocą `Promise.all`) wykonywane jest drugie zapytanie dla stałych współrzędnych miasta porównawczego.
4. **Przetwarzanie i Renderowanie:** Otrzymane dane w formacie JSON są parsowane, zapisywane w stanie komponentu (React `useState`) i renderowane na ekranie w postaci kart.
5. **Odświeżanie:** Użytkownik może wywołać ponowny przepływ (od punktu 2) korzystając z gestu "Pull-to-refresh" obsługiwanego przez `RefreshControl`.

## Lista ograniczeń i problemów napotkanych podczas realizacji
* **Brak danych dla specyficznych lokalizacji:** W przypadku bardzo małych miejscowości lub głębokich lasów, API Open-Meteo może zwrócić wartość `null` dla wskaźników PM, co wymagało dodania dodatkowej obsługi błędów ("Brak danych dla tej lokalizacji").
* **Opóźnienia GPS wewnątrz budynków:** Moduł `getCurrentPositionAsync` może działać z zauważalnym opóźnieniem w zamkniętych pomieszczeniach. Aplikacja w tym czasie wyświetla globalny `ActivityIndicator`.
* **Uproszczona walidacja norm:** Standardy WHO dla pyłów PM2.5 i PM10 są dynamiczne i zależą od czasu ekspozycji (normy dobowe vs roczne). W aplikacji przyjęto statyczne, uproszczone progi ostrzegawcze (25 i 40 µg/m³) na potrzeby demonstracji zmiany koloru w UI.
