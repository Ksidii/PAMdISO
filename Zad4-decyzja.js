/**
 * Flagi konfiguracyjne reprezentujące aktualny stan ekwipunku i kontekst dnia.
 */
const hasLaptop = true;
const hasCharger = false;
const hasNotebook = true;
const dayType = "laboratorium"; // Dopuszczalne wartości: "laboratorium" | "wykład" | "wolne"

// Weryfikacja minimalnych wymagań sprzętowych
let generalStatus = "";
if (hasLaptop && hasNotebook) {
    generalStatus = "Podstawowy sprzęt jest spakowany.";
} else {
    generalStatus = "Czegoś brakuje w plecaku!";
}

// Ewaluacja gotowości zasilania z użyciem operatora trójargumentowego
const readinessMessage = hasLaptop && hasCharger 
    ? "Pełna gotowość: laptop ma zasilanie." 
    : "Uwaga: Możesz mieć problem z baterią!";

// Warunkowe przypisanie ostrzeżenia (short-circuit evaluation)
const chargerWarning = !hasCharger && "BRAK ŁADOWARKI! Znajdź miejsce przy gniazdku.";

/**
 * ROZSZERZENIE WŁASNE:
 * Kalkulacja ryzyka rozładowania na podstawie poziomu baterii i braku ładowarki sieciowej.
 */
const batteryLevel = 25;
const needsPowerbank = batteryLevel < 30 && !hasCharger;

// -----------------------------------------------------------------
// GENEROWANIE RAPORTU
// -----------------------------------------------------------------

console.log(`--- STATUS DNIA: ${dayType.toUpperCase()} ---`);
console.log(generalStatus);
console.log(`Gotowość: ${readinessMessage}`);

// Wypisanie ostrzeżenia tylko w przypadku, gdy zmienna nie jest falsy value
if (chargerWarning) console.log(chargerWarning);

// Logika obsługi specyficznych komunikatów dla danego typu zajęć
if (dayType === "laboratorium") {
    console.log("Dziś laboratorium: Laptop jest niezbędny!");
} else if (dayType === "wykład") {
    console.log("Dziś wykład: Wystarczy notatnik.");
}

// Obsługa alertu krytycznego z rozszerzenia własnego
if (needsPowerbank) {
    console.log("Krytycznie niski poziom baterii! Dołóż powerbank do plecaka.");
}