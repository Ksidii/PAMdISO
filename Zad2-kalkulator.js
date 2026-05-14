// Zapis wydatków w tablicy
const expenses = [18.5, 42, 9.99, 27, 61.3, 15, 33.5];

// Obliczenie sumy wszystkich wydatków
const totalSum = expenses.reduce((acc, curr) => acc + curr, 0);

// Obliczenie średniego wydatku
const averageExpense = totalSum / expenses.length;

// Wyznaczenie największego pojedynczego wydatku
const maxExpense = Math.max(...expenses);

// Funkcja sprawdzająca czy nie przekroczono budżetu (rozszerzenie własne)
const budgetLimit = 200;
const checkBudget = (sum) => {
    return sum > budgetLimit 
        ? `Przekroczono budżet o ${(sum - budgetLimit).toFixed(2)} zł!` 
        : `Jesteś w bezpiecznej strefie finansowej.`;
};

// Wyświetlenie raportu w konsoli
console.log("--- RAPORT TYGODNIOWY ---");
console.log(`Suma wszystkich wydatków: ${totalSum.toFixed(2)} zł`);
console.log(`Średni wydatek: ${averageExpense.toFixed(2)} zł`);
console.log(`Największy pojedynczy wydatek: ${maxExpense} zł`);
console.log(checkBudget(totalSum));