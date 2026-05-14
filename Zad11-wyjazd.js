// Punkt startowy
const tripCosts = [
  { label: "nocleg", amount: 420, paidBy: "Anna" },
  { label: "paliwo", amount: 260, paidBy: "Piotr" },
  { label: "jedzenie", amount: 180, paidBy: "Anna" },
  { label: "bilety", amount: 140, paidBy: "Ola" }
];

// 1. Policz całkowity koszt wyjazdu
const totalCost = tripCosts.reduce((sum, item) => sum + item.amount, 0);

// 2. Zbuduj strukturę pomocniczą (agregacja wydatków per osoba)
// Zamiast tablicy, wynikiem tego reduce będzie obiekt np. { Anna: 600, Piotr: 260, Ola: 140 }
const expensesPerPerson = tripCosts.reduce((acc, item) => {
    // Jeśli w obiekcie nie ma jeszcze danej osoby, dodajemy ją z wartością 0
    if (!acc[item.paidBy]) {
        acc[item.paidBy] = 0;
    }
    // Dodajemy kwotę do konta tej osoby
    acc[item.paidBy] += item.amount;
    return acc;
}, {}); // <-- Zwróć uwagę, że stanem początkowym jest tu PUSTY OBIEKT {}

// 3. Wskaż, kto zapłacił najwięcej
let topPayer = "";
let maxAmount = 0;

// Object.entries pozwala nam przeiterować po obiekcie tak, jakby był tablicą
for (const [person, amount] of Object.entries(expensesPerPerson)) {
    if (amount > maxAmount) {
        maxAmount = amount;
        topPayer = person;
    }
}

// --- ROZSZERZENIE WŁASNE: Rozliczenie (kto komu oddaje) ---
// Pobieramy listę wszystkich uczestników, żeby policzyć średnią na osobę
const participantsCount = Object.keys(expensesPerPerson).length;
const averageCostPerPerson = totalCost / participantsCount;

// 4. Wyświetl raport końcowy
console.log("=== PODSUMOWANIE WYJAZDU ===");
console.log(`Całkowity koszt wyjazdu: ${totalCost} zł`);
console.log(`Liczba uczestników: ${participantsCount}`);
console.log(`Średni koszt na osobę: ${averageCostPerPerson.toFixed(2)} zł\n`);

console.log("=== WYDATKI INDYWIDUALNE ===");
for (const [person, amount] of Object.entries(expensesPerPerson)) {
    console.log(`- ${person} zapłacił(a) łącznie: ${amount} zł`);
}

console.log(`\nNajwięcej zapłacił(a): ${topPayer} (${maxAmount} zł)\n`);

console.log("=== STATUS ROZLICZEŃ (ROZSZERZENIE) ===");
for (const [person, amount] of Object.entries(expensesPerPerson)) {
    const balance = amount - averageCostPerPerson;
    
    if (balance > 0) {
        console.log(`${person} musi odzyskać: ${balance.toFixed(2)} zł`);
    } else if (balance < 0) {
        // Używamy Math.abs(), żeby nie wyświetlać minusa przed kwotą długu
        console.log(`${person} musi dopłacić: ${Math.abs(balance).toFixed(2)} zł`);
    } else {
        console.log(`${person} jest rozliczony(a) na zero.`);
    }
}