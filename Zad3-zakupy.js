// Tablica obiektów reprezentująca zakupy
const shoppingList = [
  { name: "chleb", quantity: 2, urgent: true },
  { name: "mleko", quantity: 1, urgent: false },
  { name: "jajka", quantity: 10, urgent: true },
  { name: "makaron", quantity: 3, urgent: false }
];

// Wyświetlenie wszystkich produktów (krótka lista)
console.log("Pełna lista zakupów:");
shoppingList.forEach(item => console.log(`- ${item.name} (${item.quantity} szt.)`));

// Przefiltrowanie listy - tylko produkty pilne (urgent: true)
const urgentItems = shoppingList.filter(item => item.urgent === true);

// Nowa tablica samych nazw zapisanych WIELKIMI LITERAMI
const upperCaseNames = shoppingList.map(item => item.name.toUpperCase());

// Funkcja sprawdzająca, czy lista jest "duża" (więcej niż 15 przedmiotów łącznie)
const totalQuantity = shoppingList.reduce((acc, curr) => acc + curr.quantity, 0);
const storageWarning = totalQuantity > 15 ? "Uwaga: Zabierz dużą torbę!" : "Małe zakupy.";

// Wyświetlenie wyników
console.log("\n--- RAPORT ZAKUPÓW ---");
console.log(`Liczba pilnych pozycji: ${urgentItems.length}`);
console.log("Nazwy produktów (caps lock):", upperCaseNames);
console.log(`Łączna ilość produktów: ${totalQuantity}`);
console.log(storageWarning);