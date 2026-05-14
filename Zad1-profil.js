
const user = {
  firstName: "Jan",
  lastName: "Kowalski",
  city: "Katowice",
  age: 21,
  fieldOfStudy: "informatyka"
};

user.hobby = "fotografia analogowa";
user.favoriteLanguage = "JavaScript";

// Wyświetlenie pełnego imienia i nazwiska
console.log("Użytkownik: " + user.firstName + " " + user.lastName);

// Komunikat opisowy z użyciem Template Literals
const description = `${user.firstName} mieszka w mieście ${user.city} i studiuje na kierunku ${user.fieldOfStudy}.`;
console.log(description);

// Komunikat zależny od wieku
if (user.age >= 18) {
  console.log("Status: Użytkownik jest pełnoletni.");
} else {
  console.log("Status: Użytkownik jest niepełnoletni.");
}

// Funkcja powitalna, która wykorzystuje dane z obiektu
function greetUser(person) {
    const welcomeMsg = `Cześć! Twoje hobby to ${person.hobby}. 
Czy wiedziałeś, że w ${person.favoriteLanguage} można pisać aplikacje mobilne?`;
    console.log(welcomeMsg);
}

greetUser(user);