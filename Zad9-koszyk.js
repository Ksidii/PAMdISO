/**
 * Reprezentacja koszyka zakupowego.
 * Tablica obiektów zawierająca asortyment, ceny jednostkowe i wybrane ilości.
 */
const cart = [
    { name: "Chleb", price: 4.5, quantity: 2 },
    { name: "Ser", price: 9.9, quantity: 1 },
    { name: "Sok", price: 6.2, quantity: 3 }
  ];
  
  /**
   * Stałe biznesowe określające politykę rabatową.
   */
  const discountThreshold = 30;
  const discountPercent = 10;
  
  /**
   * Transformacja danych do warstwy prezentacji (widoku).
   * Oblicza wartość cząstkową każdej pozycji i formatuje ją do postaci ciągu znaków.
   */
  const itemDescriptions = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      return `- ${item.quantity} × ${item.name} (wartość: ${itemTotal.toFixed(2)} zł)`;
  });
  
  /**
   * Agregacja całkowitej wartości koszyka przed uwzględnieniem zniżek.
   * Wykorzystuje reduce() do zsumowania iloczynów cen i ilości.
   */
  const totalValue = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
  }, 0);
  
  // Ewaluacja warunków rabatowych i modyfikacja ceny końcowej
  let finalPrice = totalValue;
  let hasDiscount = false;
  
  if (totalValue > discountThreshold) {
      const discountMultiplier = 1 - (discountPercent / 100);
      finalPrice = totalValue * discountMultiplier;
      hasDiscount = true;
  }
  
  /**
   * Próg kwotowy uprawniający do darmowej dostawy.
   */
  const FREE_SHIPPING_THRESHOLD = 40;
  
  /**
   * ROZSZERZENIE WŁASNE:
   * Moduł kalkulacji kosztów logistycznych.
   * Oblicza opłatę za dostawę na podstawie wartości zamówienia po uwzględnieniu rabatów.
   * * @param {number} cartTotal - Wartość koszyka do weryfikacji.
   * @returns {Object} Obiekt zawierający koszt numeryczny oraz sformatowany komunikat UI.
   */
  function calculateShipping(cartTotal) {
      if (cartTotal >= FREE_SHIPPING_THRESHOLD) {
          return { cost: 0, message: "Darmowa dostawa!" };
      } else {
          const missingAmount = FREE_SHIPPING_THRESHOLD - cartTotal;
          return { cost: 15, message: `Dostawa: 15.00 zł (Brakujące ${missingAmount.toFixed(2)} zł do darmowej dostawy)` };
      }
  }
  
  // Inicjalizacja kalkulacji dostawy i ostatecznego rachunku
  const shippingInfo = calculateShipping(finalPrice);
  const totalWithShipping = finalPrice + shippingInfo.cost;
  
  // -----------------------------------------------------------------
  // GENEROWANIE RAPORTU KOŃCOWEGO
  // -----------------------------------------------------------------
  
  console.log("=== TWOJE ZAMÓWIENIE ===");
  console.log("Lista produktów:");
  // Złączenie tablicy stringów za pomocą znaku nowej linii
  console.log(itemDescriptions.join('\n'));
  
  console.log("\n=== PODSUMOWANIE FINANSOWE ===");
  console.log(`Wartość produktów: ${totalValue.toFixed(2)} zł`);
  
  // Warunkowe renderowanie informacji o naliczonym rabacie
  if (hasDiscount) {
      console.log(`Naliczono rabat -${discountPercent}% (zakupy powyżej ${discountThreshold} zł)`);
      console.log(`Wartość po rabacie: ${finalPrice.toFixed(2)} zł`);
  }
  
  console.log(shippingInfo.message);
  console.log("----------------------------");
  console.log(`DO ZAPŁATY (łącznie): ${totalWithShipping.toFixed(2)} zł`);