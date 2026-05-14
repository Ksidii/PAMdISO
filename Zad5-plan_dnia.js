/**
 * Startowa baza danych zawierająca przykładową listę aktywności.
 */
const tasks = ["zajęcia", "zakupy", "trening"];

/**
 * Generuje sformatowany plan dnia dla wskazanego użytkownika.
 * Zabezpieczona parametrem domyślnym przed błędem undefined w przypadku braku drugiego argumentu.
 * @param {string} name - Imię użytkownika.
 * @param {Array} [tasks=[]] - Opcjonalna kolekcja zadań (domyślnie pusta tablica).
 * @returns {string} Zwraca gotowy, sformatowany ciąg znaków.
 */
function createDayPlan(name, tasks = []) {
  
  // Pobranie rozmiaru tablicy do zmiennej pomocniczej
  const taskCount = tasks.length;
  
  // Wczesny powrót (guard clause) optymalizujący działanie dla pustej listy
  if (taskCount === 0) {
    return `Plan dnia dla ${name}: Dzisiaj masz wolne! Czas na relaks.`;
  }

  // ROZSZERZENIE WŁASNE:
  // Transformacja elementów tablicy poprzez dodanie inkrementowanego indeksu (numerowanie zadań).
  // Wynikowa tablica jest od razu konkatenowana (łączona) do stringa metodą join().
  const numberedTasks = tasks.map((task, index) => `${index + 1}. ${task}`).join(", ");
  
  // Interpolacja zmiennych (template literals) do zbudowania finalnego raportu
  return `Plan dnia dla ${name} (liczba zadań do zrobienia: ${taskCount}): ${numberedTasks}.`;
}

// -----------------------------------------------------------------
// WYWOŁANIA FUNKCJI I WERYFIKACJA
// -----------------------------------------------------------------

// Wywołanie standardowe z przekazaniem kompletnych argumentów
const planKasi = createDayPlan("Kasia", tasks);

// Wywołanie weryfikujące poprawne działanie parametru domyślnego
const planMarka = createDayPlan("Marek");

// Wypisanie wyników operacji na standardowe wyjście
console.log(planKasi);
console.log(planMarka);