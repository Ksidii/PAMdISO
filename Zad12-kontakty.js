/**
 * Początkowa baza kontaktów reprezentowana jako tablica obiektów.
 * Zawiera dane takie jak imię i nazwisko, numer telefonu, miasto oraz status "ulubionego".
 */
const contacts = [
    { name: "Anna Nowak", phone: "500-100-200", city: "Katowice", favorite: true },
    { name: "Piotr Lis", phone: "501-300-700", city: "Sosnowiec", favorite: false },
    { name: "Ola Marek", phone: "502-400-900", city: "Katowice", favorite: true }
  ];
  
  /**
   * Filtruje przekazaną listę kontaktów według zadanego miasta.
   * Nie modyfikuje oryginalnej tablicy, zwraca nową instancję.
   */
  function getContactsByCity(contactList, cityName) {
      return contactList.filter(contact => contact.city === cityName);
  }
  
  /**
   * Filtruje przekazaną listę kontaktów, zwracając wyłącznie te, 
   * które posiadają flagę favorite ustawioną na true.
   */
  function getFavoriteContacts(contactList) {
      return contactList.filter(contact => contact.favorite === true);
  }
  
  /**
   * Formatuje listę obiektów kontaktów do uproszczonej postaci tekstowej.
   * Zwraca tablicę stringów w formacie: "Imię Nazwisko — Telefon".
   */
  function formatContacts(contactList) {
      return contactList.map(contact => `${contact.name} — ${contact.phone}`);
  }
  
  /**
   * ROZSZERZENIE WŁASNE:
   * Wyszukuje kontakty na podstawie fragmentu nazwy (tzw. partial match).
   * Metoda ignoruje wielkość liter (case-insensitive), normalizując 
   * oba ciągi znaków przed wykonaniem weryfikacji.
   */
  function searchContactsByName(contactList, searchPhrase) {
      return contactList.filter(contact => {
          // Normalizacja do małych liter dla zapewnienia poprawnego porównania
          const lowerCaseName = contact.name.toLowerCase();
          const lowerCasePhrase = searchPhrase.toLowerCase();
          
          // Weryfikacja, czy znormalizowana nazwa zawiera szukaną frazę
          return lowerCaseName.includes(lowerCasePhrase);
      });
  }
  
  // -----------------------------------------------------------------
  // WYWOŁANIA FUNKCJI I PREZENTACJA WYNIKÓW
  // -----------------------------------------------------------------
  
  console.log("=== KONTAKTY: KATOWICE ===");
  const katowiceContacts = getContactsByCity(contacts, "Katowice");
  // Wynik formatowany do ciągłego tekstu przed wypisaniem do konsoli
  console.log(formatContacts(katowiceContacts).join("\n"));
  
  
  console.log("\n=== ULUBIONE KONTAKTY ===");
  const favoriteContacts = getFavoriteContacts(contacts);
  console.log(formatContacts(favoriteContacts).join("\n"));
  
  
  console.log("\n=== WYSZUKIWANIE (Rozszerzenie): 'now' ===");
  const searchResults = searchContactsByName(contacts, "now");
  
  // Zabezpieczenie przed pustym wynikiem wyszukiwania
  if (searchResults.length > 0) {
      console.log(formatContacts(searchResults).join("\n"));
  } else {
      console.log("Brak wyników wyszukiwania.");
  }