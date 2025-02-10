// Modal ochish va yopish
function openModal() {
  document.getElementById('taskModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('taskModal').style.display = 'none';
}

// Filtr tugmalari
let barchsi = document.querySelector('.barchasi');
let bajarilgan = document.querySelector('.bajarilgan');
let bajarilmagan = document.querySelector('.bajarilmagan');

barchsi.addEventListener('click', () => {
  barchsi.classList.add('item__active');
  bajarilgan.classList.remove('item__active');
  bajarilmagan.classList.remove('item__active');
  filterTasks("all");
});

bajarilgan.addEventListener('click', () => {
  bajarilgan.classList.add('item__active');
  barchsi.classList.remove('item__active');
  bajarilmagan.classList.remove('item__active');
  filterTasks("completed");
});

bajarilmagan.addEventListener('click', () => {
  bajarilmagan.classList.add('item__active');
  barchsi.classList.remove('item__active');
  bajarilgan.classList.remove('item__active');
  filterTasks("pending");
});

// LocalStorage bilan ishlash
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Filtrlash
function filterTasks(filterType) {
  let tasks = document.querySelectorAll('.task');

  tasks.forEach(task => {
    let isCompleted = task.classList.contains('active'); // "active" bo‘lsa bajarilgan
    if (filterType === "all") {
      task.style.display = "block";
    } else if (filterType === "completed" && isCompleted) {
      task.style.display = "block";
    } else if (filterType === "pending" && !isCompleted) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// **Yangi topshiriq qo‘shish**
function addTask() {
  let title = document.getElementById('taskTitle').value;
  let detail = document.getElementById('taskDetail').value;
  let date = document.getElementById('taskDate').value;
  let select = document.getElementById('select').value;

  if (title && detail && date) {
    let tasks = loadTasksFromLocalStorage();
    let newTask = {
      id: Date.now(),
      title: title,
      detail: detail,
      date: date,
      person: select,
      completed: false
    };

    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);
    renderTasks();
    closeModal();
  } else {
    alert(`Barcha maydonlarni to'ldiring!`);
  }
}

// **Topsiriqlarni ekranga chiqarish**
function renderTasks() {
  let tasks = loadTasksFromLocalStorage();
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = ""; // Avvalgi ma'lumotlarni tozalash

  tasks.forEach(task => {
    let taskDiv = document.createElement('div');
    let titleBtn = document.createElement('div');
    let spanText = document.createElement('div');
    let taskListTitle = document.createElement('h2');
    let taskListText = document.createElement('p');
    let taskListText2 = document.createElement('p');
    let taskCloseBtn = document.createElement('button');
    let span = document.createElement('span');

    // Klasslar
    spanText.classList = 'spanText';
    span.className = 'span';
    taskDiv.className = 'task';
    titleBtn.className = 'titleBtn';
    taskListText.className = 'task-list__text';
    taskListText2.className = 'task-list__text-2';
    taskListTitle.className = 'task-list__title';

    // Ma'lumotlarni joylash
    span.textContent = task.person;
    taskListText2.textContent = task.date;
    taskListText.textContent = task.detail;
    taskListTitle.textContent = task.title;

    if (task.completed) {
      taskDiv.classList.add('active');
    }

    // **Remove tugmasi**
    taskCloseBtn.textContent = 'Remove';
    taskCloseBtn.className = 'taskCloseBtn';
    taskCloseBtn.addEventListener('click', () => removeTask(task.id));

    // UI-ga joylash
    taskList.appendChild(taskDiv);
    taskDiv.append(titleBtn, taskListText, spanText);
    titleBtn.append(taskListTitle, taskCloseBtn);
    spanText.append(taskListText2, span);

    // Bajarilgan / bajarilmagan qilish
    taskDiv.addEventListener('click', () => toggleTask(task.id));
  });
}

// **Topsiriqni bajarilgan deb belgilash**
function toggleTask(id) {
  let tasks = loadTasksFromLocalStorage();
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTasksToLocalStorage(tasks);
  renderTasks();
}

// **Topsiriqni LocalStorage va UI-dan o‘chirish**
function removeTask(id) {
  let tasks = loadTasksFromLocalStorage();
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage(tasks);
  renderTasks();
}

// Sahifa yangilansa ham ma’lumotlar saqlansin
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});
