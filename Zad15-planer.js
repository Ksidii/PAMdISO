// Punkt startowy
const schedule = [
  { day: "poniedziałek", subject: "Programowanie", room: "A12", online: false },
  { day: "wtorek", subject: "Bazy danych", room: "online", online: true },
  { day: "czwartek", subject: "Grafika", room: "B03", online: false },
  { day: "piątek", subject: "UX", room: "online", online: true }
];

// 1. Funkcja zwracająca zajęcia dla podanego dnia (użycie filter)
function getClassesByDay(scheduleArray, dayOfWeek) {
    return scheduleArray.filter(item => item.day === dayOfWeek.toLowerCase());
}

// 2 & 3. Funkcja budująca czytelną listę z warunkowym oznaczeniem trybu
function formatSchedule(scheduleArray) {
    return scheduleArray.map(item => {
        const mode = item.online ? "Online" : "Stacjonarne";
        return `- ${item.subject} — Sala: ${item.room} — Tryb: ${mode}`;
    });
}

// --- ROZSZERZENIE WŁASNE ---
// Wyszukiwanie zajęć po trybie (online / stacjonarnie)
function getClassesByMode(scheduleArray, isOnline) {
    return scheduleArray.filter(item => item.online === isOnline);
}

// 4. Policz, ile wszystkich zajęć znajduje się w planie
const totalClasses = schedule.length;

// --- WYGENEROWANIE RAPORTU ---

console.log("=== TWOJ PLAN TYGODNIA ===");
console.log(`Liczba wszystkich zajęć w tym tygodniu: ${totalClasses}\n`);

// Test dla konkretnego dnia
const searchDay = "poniedziałek";
const classesForDay = getClassesByDay(schedule, searchDay);

console.log(`ZAJĘCIA: ${searchDay.toUpperCase()}`);
if (classesForDay.length > 0) {
    console.log(formatSchedule(classesForDay).join('\n'));
} else {
    console.log("Hurra! Dzisiaj masz wolne.");
}

// Test dla rozszerzenia
console.log("\n=== TWOJE ZAJĘCIA ZDALNE ===");
const onlineClasses = getClassesByMode(schedule, true);
console.log(formatSchedule(onlineClasses).join('\n'));