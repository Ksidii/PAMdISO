/**
 * Tablica obiektów reprezentująca rejestr aktywności fizycznych.
 * Każdy wpis zawiera typ aktywności, czas trwania w minutach oraz spalone kalorie.
 */
const activities = [
  { type: "bieg", minutes: 35, calories: 320 },
  { type: "rower", minutes: 50, calories: 410 },
  { type: "spacer", minutes: 20, calories: 90 },
  { type: "siłownia", minutes: 60, calories: 450 }
];

/**
 * Agregacja całkowitego czasu treningów.
 * Wykorzystuje metodę reduce() do zsumowania właściwości 'minutes' wszystkich obiektów.
 */
const totalTime = activities.reduce((acc, activity) => acc + activity.minutes, 0);

/**
 * Agregacja całkowitej liczby spalonych kalorii.
 * Analogiczne użycie reduce() dla właściwości 'calories'.
 */
const totalCalories = activities.reduce((acc, activity) => acc + activity.calories, 0);

/**
 * Ekstrakcja aktywności wydłużonych.
 * Zastosowanie metody filter() z predykatem odrzucającym treningi poniżej progu 30 minut.
 */
const longActivities = activities.filter(activity => activity.minutes > 30);

/**
 * Transformacja (projekcja) przefiltrowanych danych.
 * Użycie map() w celu wyciągnięcia tablicy zawierającej same nazwy typów aktywności.
 */
const longActivitiesNames = longActivities.map(activity => activity.type);

/**
 * ROZSZERZENIE WŁASNE:
 * Wyszukanie najbardziej obciążającego treningu pod kątem spalonych kalorii.
 * Metoda reduce() porównuje bieżący element z dotychczasowym maksimum,
 * zachowując referencję do obiektu o wyższej wartości 'calories'.
 */
const mostCaloricWorkout = activities.reduce((max, current) => {
    return current.calories > max.calories ? current : max;
}, activities[0]); // Inicjalizacja pierwszym elementem tablicy jako punktem odniesienia

/**
 * Weryfikacja realizacji założonego tygodniowego celu treningowego.
 * @param {number} minutes - Całkowity czas aktywności do weryfikacji.
 * @returns {string} Zwraca sformatowany komunikat o statusie na podstawie operatora trójargumentowego.
 */
const checkWeeklyGoal = (minutes) => {
    return minutes >= 150 
        ? "Osiągnięto cel tygodniowy (minimum 150 min)!" 
        : "W tym tygodniu musisz jeszcze trochę poćwiczyć.";
};

/**
 * Generowanie końcowego raportu z wykorzystaniem template literals (interpolacja ciągów znaków).
 * Agreguje wszystkie wyliczone wcześniej metryki w spójny blok wielolinijkowego tekstu.
 */
const finalReport = `
=== TYGODNIOWY RAPORT SPORTOWY ===
Łączny czas treningów: ${totalTime} minut
Spalone kalorie: ${totalCalories} kcal

Dłuższe aktywności (powyżej 30 min): ${longActivities.length} (${longActivitiesNames.join(", ")})

Najbardziej kaloryczny trening: 
- ${mostCaloricWorkout.type.toUpperCase()} (${mostCaloricWorkout.calories} kcal w ${mostCaloricWorkout.minutes} min)

Cel tygodniowy:
${checkWeeklyGoal(totalTime)}
==================================
`;

// Wypisanie wygenerowanego raportu na standardowe wyjście (konsola)
console.log(finalReport);