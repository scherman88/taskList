//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove Task event
  taskList.addEventListener('click', removeTask);
  //Clear Tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.map(function(task){
     //Creat li Element
  const li = document.createElement('li');
  //Add Class
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(task));
  //Create new link element
  const link = document.createElement('a');
  //Add Class
  link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class="fas fa-trash"></i>';
  //Append link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);
  })
}

//Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert("Add a Task!");
    return;
  }

  //Creat li Element
  const li = document.createElement('li');
  //Add Class
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement('a');
  //Add Class
  link.className = 'delete-item secondary-content';
  //Add icon HTML
  link.innerHTML = '<i class="fas fa-trash"></i>';
  //Append link to li
  li.appendChild(link);
  //Append li to ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();

    //Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
  if(confirm("Are you sure?")){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksfromLocalStorage();
  }
}

//Remove Tasks fro LS
function clearTasksfromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
      console.log(item.toLowerCase().indexOf(text))
    } else{
      task.style.display = 'none';
    }
  });

}