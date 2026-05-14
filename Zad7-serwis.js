/**
 * Początkowy stan rejestru zgłoszeń serwisowych.
 * Kolekcja obiektów zawierająca dane klientów, sprzętu i statusu naprawy.
 */
const repairs = [
    { id: 1, client: "Anna", device: "laptop", status: "nowe" },
    { id: 2, client: "Piotr", device: "telefon", status: "w trakcie" },
    { id: 3, client: "Ola", device: "tablet", status: "zakończone" }
  ];
  
  /**
   * Wyszukanie konkretnego zgłoszenia na podstawie unikalnego identyfikatora (ID).
   * Metoda find() zwraca pierwszą pasującą referencję do obiektu.
   */
  const repairToFind = repairs.find(repair => repair.id === 2);
  console.log(`🔍 Znaleziono zgłoszenie: ${repairToFind.client} - ${repairToFind.device}`);
  
  /**
   * ROZSZERZENIE WŁASNE:
   * Niemutowalna aktualizacja statusu zgłoszenia.
   * Funkcja zwraca nową instancję tablicy, zapobiegając modyfikacji danych wejściowych.
   * Dodaje automatyczny znacznik czasu dla modyfikowanego rekordu.
   * * @param {Array} repairList - Kolekcja zgłoszeń do przetworzenia.
   * @param {number} targetId - Identyfikator modyfikowanego zgłoszenia.
   * @param {string} newStatus - Docelowy status naprawy.
   * @returns {Array} Nowa tablica ze zaktualizowanym zgłoszeniem.
   */
  function updateRepairStatus(repairList, targetId, newStatus) {
      // Mapowanie tworzy i zwraca nową tablicę
      return repairList.map(repair => {
          if (repair.id === targetId) {
              // Zastosowanie spread syntax (...) do bezpiecznego skopiowania obiektu
              // i nadpisania/dodania wybranych właściwości
              return { 
                  ...repair, 
                  status: newStatus, 
                  lastUpdated: new Date().toLocaleDateString() 
              };
          }
          // Zwrócenie oryginalnej referencji dla niemodyfikowanych rekordów
          return repair;
      });
  }
  
  // Wykonanie aktualizacji zgłoszenia o ID 1
  const updatedRepairs = updateRepairStatus(repairs, 1, "w trakcie");
  
  /**
   * Zliczenie aktywnych napraw.
   * Filtrowanie zaktualizowanej kolekcji i pobranie rozmiaru wynikowej tablicy.
   */
  const inProgressCount = updatedRepairs.filter(repair => repair.status === "w trakcie").length;
  
  // -----------------------------------------------------------------
  // PREZENTACJA WYNIKÓW I WERYFIKACJA NIEMUTOWALNOŚCI
  // -----------------------------------------------------------------
  
  console.log("\n=== ORYGINALNA TABLICA (nie naruszona!) ===");
  console.log(repairs);
  
  console.log("\n=== ZAKTUALIZOWANA TABLICA ===");
  console.log(updatedRepairs);
  
  console.log(`\nLiczba napraw w toku: ${inProgressCount}`);