// Punkt startowy
const todos = [
  { id: 1, title: "Oddać projekt", done: false },
  { id: 2, title: "Przeczytać rozdział", done: true },
  { id: 3, title: "Przygotować prezentację", done: false }
];

// 1. Funkcja dodająca nowe zadanie (Niemutowalnie - używamy spread syntax)
function addTask(todoList, newTitle) {
    // Generujemy nowe ID na podstawie długości tablicy
    const newId = todoList.length > 0 ? Math.max(...todoList.map(t => t.id)) + 1 : 1;
    
    // Tworzymy nowy obiekt zadania
    const newTask = { id: newId, title: newTitle, done: false };
    
    // Zwracamy nowa tablicę, która zawiera wszystkie stare zadania i nowe zadanie na końcu
    return [...todoList, newTask];
}

// 2. Funkcja oznaczająca wybrane zadanie jako wykonane 
function markAsDone(todoList, targetId) {
    return todoList.map(task => {
        // Jeśli znajdziemy zadanie z podanym ID, tworzymy jego nową wersję
        if (task.id === targetId) {
            return { ...task, done: true }; // Rozsypujemy stare dane i nadpisujemy 'done'
        }
        // Jeśli to nie to zadanie, zwracamy je bez zmian
        return task;
    });
}

// 3. Funkcja zwracająca tylko zadania niewykonane
function getPendingTasks(todoList) {
    return todoList.filter(task => task.done === false);
}

// --- ROZSZERZENIE WŁASNE ---
// Dodatkowa funkcja: Usuwanie zadania
function deleteTask(todoList, targetId) {
    // Filter zostawia tylko te zadania, których ID nie jest równe usuwanemu ID
    return todoList.filter(task => task.id !== targetId);
}

// Dodatkowa funkcja pomocnicza do ładnego wyświetlania w konsoli
function printTodos(title, todoList) {
    console.log(`\n=== ${title.toUpperCase()} ===`);
    todoList.forEach(task => {
        const statusIcon = task.done ? "✅" : "⏳";
        console.log(`${statusIcon} [${task.id}] ${task.title}`);
    });
}

// --- WYKONANIE I TESTOWANIE ---

// Stan początkowy
printTodos("Oryginalna lista", todos);

// Test 1: Dodajemy zadanie
const todosWithNewTask = addTask(todos, "Zrobić zakupy spożywcze");
printTodos("Po dodaniu nowego zadania", todosWithNewTask);

// Test 2: Oznaczamy zadanie nr 3 jako wykonane
const todosAfterUpdate = markAsDone(todosWithNewTask, 3);
printTodos("Po oznaczeniu zadania nr 3 jako wykonane", todosAfterUpdate);

// Test 3: Filtrujemy tylko niewykonane
const pendingOnly = getPendingTasks(todosAfterUpdate);
printTodos("Tylko zadania do zrobienia (niewykonane)", pendingOnly);

// Test 4 (Rozszerzenie): Usuwamy zadanie nr 2 z listy
const todosAfterDelete = deleteTask(todosAfterUpdate, 2);
printTodos("Po usunięciu zadania nr 2 (Rozszerzenie)", todosAfterDelete);

// OSTATECZNY DOWÓD NIEMUTOWALNOŚCI:
console.log("\n=== CZY ORYGINAŁ PRZETRWAŁ? ===");
console.log(todos);