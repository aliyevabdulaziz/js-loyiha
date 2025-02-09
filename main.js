function openModal() {
  document.getElementById('taskModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('taskModal').style.display = 'none';
}
let barchsi = document.querySelector('.barchasi');
let bajarilgan = document.querySelector('.bajarilgan');
let bajarilmagan = document.querySelector('.bajarilmagan');
barchsi.addEventListener(('click'),()=>{
  barchsi.classList.add('item__active');
  bajarilgan.classList.remove('item__active');
  bajarilmagan.classList.remove('item__active')
});


bajarilgan.addEventListener(('click'),()=>{
  bajarilgan.classList.add('item__active');
  barchsi.classList.remove('item__active');
  bajarilmagan.classList.remove('item__active')
});

bajarilmagan.addEventListener(('click'),()=>{
  bajarilmagan.classList.add('item__active');
  barchsi.classList.remove('item__active');
  bajarilgan.classList.remove('item__active')
});

document.querySelector('.barchasi').addEventListener('click', function() {
  filterTasks("all");
});

document.querySelector('.bajarilmagan').addEventListener('click', function() {
  filterTasks("completed");
});

document.querySelector('.bajarilgan').addEventListener('click', function() {
  filterTasks("pending");
});

function filterTasks(filterType) {
  let tasks = document.querySelectorAll('.task');

  tasks.forEach(task => {
      let isCompleted = task.classList.contains('active'); // "active" bo'lsa bajarilgan
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



function addTask() {
  let title = document.getElementById('taskTitle').value;
  let detail = document.getElementById('taskDetail').value;
  let date = document.getElementById('taskDate').value;
  let select =document.getElementById('select').value;
  
  
  if (title && detail && date) {
    let taskList = document.getElementById('taskList');
    let task = document.createElement('div');
    let titleBtn = document.createElement('div');
    let spanText=document.createElement('div')
    const taskListTitle=document.createElement('h2');
      const taskListText=document.createElement('p');
      const taskListText2=document.createElement('p');
      const taskCloseBtn=document.createElement('button');
      const span=document.createElement('span');
      
      // className
      spanText.classList='spanText'
      span.className='span';
      task.className = 'task';
      titleBtn.className='titleBtn'
      taskListText.className='task-list__text';
      taskListText2.className='task-list__text-2';
      taskListTitle.className='task-list__title';
      
      //textContent
      
      span.textContent=(`${select}`)
      taskListText2.textContent=(`${date}`)
      taskListText.textContent=(`${detail}`);
      taskListTitle.textContent=(`${title}`)
      // task.innerHTML = `<h2>${title}  <br> ${detail} <br>(${date})</h2> <button onclick="this.parentElement.remove()">❌</button>`;
      
      

      taskCloseBtn.style.display='none'
      taskList.appendChild(task);
      task.append(titleBtn,taskListText ,spanText);
      titleBtn.append(taskListTitle,taskCloseBtn);
      spanText.append(taskListText2,span)
      closeModal();
      task.addEventListener(('click'),()=>{
        task.classList.toggle('active');
        taskCloseBtn.style.display='inline-block';
        taskCloseBtn.textContent=('Removed');
        taskCloseBtn.className='taskCloseBtn';
        task.style.transition='all 0.4s ease'
        
        taskCloseBtn.addEventListener(('click'),()=>{
          task.remove();
        });
      });
      

    } else {
      alert(`Barcha maydonlarni to'ldiring!`);
    };
  };
  
