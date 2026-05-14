/**
 * Baza danych filmów reprezentowana jako tablica obiektów.
 * Przechowuje metadane: tytuł, gatunek, ocenę oraz status obejrzenia.
 */
const movies = [
  { title: "Arrival", category: "sci-fi", rating: 8.1, watched: true },
  { title: "Whiplash", category: "drama", rating: 8.5, watched: false },
  { title: "Dune", category: "sci-fi", rating: 8.0, watched: false },
  { title: "Inside Out", category: "animation", rating: 8.1, watched: true }
];

/**
 * Filtrowanie kolekcji w celu wyodrębnienia nieobejrzanych pozycji.
 * Metoda filter() ewaluuje warunek logiczny dla flagi 'watched'.
 */
const unwatchedMovies = movies.filter(movie => movie.watched === false);

/**
 * Filtrowanie filmów, których ocena przewyższa przyjęty próg (8.0).
 */
const topRatedMovies = movies.filter(movie => movie.rating > 8.0);

/**
 * Projekcja danych za pomocą metody map().
 * Ekstrakcja samej właściwości 'title' z tablicy wysoko ocenianych produkcji.
 */
const topRatedTitles = topRatedMovies.map(movie => movie.title);

/**
 * ROZSZERZENIE WŁASNE:
 * Funkcja pomocnicza demonstrująca łańcuchowanie metod (method chaining).
 * Odwzorowuje logikę ekstrakcji tytułów z podziałem na określoną kategorię,
 * formatując jednocześnie wyniki w dodatkowe cudzysłowy.
 * @param {Array} movieList - Zbiór filmów do przetworzenia.
 * @param {string} targetCategory - Docelowy gatunek filmowy.
 * @returns {Array} Tablica sformatowanych tytułów.
 */
function getTitlesByCategory(movieList, targetCategory) {
    return movieList
        .filter(movie => movie.category === targetCategory)
        .map(movie => `"${movie.title}"`); 
}

const sciFiMovies = getTitlesByCategory(movies, "sci-fi");

// -----------------------------------------------------------------
// GENEROWANIE RAPORTU KOŃCOWEGO
// -----------------------------------------------------------------

console.log("=== KINOMANIAK: RAPORT ===");
console.log(`Masz do obejrzenia jeszcze ${unwatchedMovies.length} filmy/ów.`);
// Zastosowanie metody join() do czytelnej, przecinkowej konkatenacji elementów tablicy
console.log(`Hity z oceną powyżej 8.0 to: ${topRatedTitles.join(", ")}`);

// Wynik wywołania rozszerzenia własnego
console.log(`Twoje filmy z kategorii sci-fi: ${sciFiMovies.join(", ")}`);