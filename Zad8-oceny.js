/**
 * Tablica wejściowa zawierająca oceny cząstkowe studenta.
 */
const grades = [3.0, 4.0, 5.0, 3.5, 4.5];

/**
 * Stała konfiguracyjna określająca minimalną średnią wymaganą do zaliczenia.
 */
const PASSING_THRESHOLD = 3.0;

/**
 * Oblicza statystyki i status zaliczenia na podstawie tablicy ocen.
 * @param {number[]} gradesArray - Tablica ocen do przetworzenia.
 * @returns {Object} Obiekt zawierający wyliczoną średnią, status i ocenę opisową.
 */
function calculateStudentResult(gradesArray) {
    
    // Wczesny powrót (guard clause) zapobiegający dzieleniu przez zero
    if (gradesArray.length === 0) {
        return { average: 0, status: "Brak ocen", classification: "Brak danych" };
    }

    // Agregacja sumy ocen przy użyciu reduce() i wyliczenie średniej arytmetycznej
    const sum = gradesArray.reduce((acc, curr) => acc + curr, 0);
    const average = sum / gradesArray.length;

    // Przypisanie statusu zaliczenia za pomocą operatora trójargumentowego
    const isPassed = average >= PASSING_THRESHOLD ? "Zaliczone" : "Niezaliczone";

    // ROZSZERZENIE WŁASNE: 
    // Klasyfikacja opisowa dopasowująca odpowiedni przedział dla uzyskanej średniej
    let descriptiveGrade = "";
    if (average >= 4.5) {
        descriptiveGrade = "Bardzo dobry";
    } else if (average >= 3.5) {
        descriptiveGrade = "Dobry";
    } else if (average >= 3.0) {
        descriptiveGrade = "Dostateczny";
    } else {
        descriptiveGrade = "Niedostateczny";
    }

    // Zwrócenie ustrukturyzowanych danych z zaokrągleniem średniej do 2 miejsc po przecinku
    return {
        averageScore: Number(average.toFixed(2)),
        status: isPassed,
        classification: descriptiveGrade 
    };
}

// -----------------------------------------------------------------
// WYWOŁANIE FUNKCJI I PREZENTACJA WYNIKÓW
// -----------------------------------------------------------------

const finalReport = calculateStudentResult(grades);

console.log("=== PODSUMOWANIE SEMESTRU ===");
console.log(`Średnia ocen: ${finalReport.averageScore}`);
console.log(`Status zaliczenia: ${finalReport.status}`);
console.log(`Ocena opisowa: ${finalReport.classification}`);

// Weryfikacja logiki programu dla przypadku negatywnego (niezaliczenie)
const failedStudentGrades = [2.0, 3.0, 2.0, 2.5];
console.log("\n=== TEST DLA INNEGO STUDENTA ===");
console.log(calculateStudentResult(failedStudentGrades));