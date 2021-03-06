const addButton = document.querySelector(".addButton");
const toDoList = document.querySelector(".todos");
const finishedToDos = document.querySelector(".finishedtodos");
const searchBar = document.querySelector(".search input");
const coll = document.getElementsByClassName("collapsible");
const searchBarContainer = document.querySelector(".search");
// Function used to create a to do 
const createToDo = value => {
	const htmlTemplate = `
	<li class="list-group-item d-flex justify-content-between align-items-center mb-1">
		<span class="span">${value}</span>
		<i class="far fa-trash-alt delete"></i>
	</li>
	`;
	toDoList.innerHTML += htmlTemplate;
};
// Function used to add a selected to-do to another place
const addRemoveToDoHtml = innerHtml => {
	const newHtml = `
	<li class="list-group-item d-flex justify-content-between align-items-center mb-1">
		${innerHtml}
	</li>`;
	return newHtml;
}

const filterToDos = search => {
	let incompleteTasks = Array.from(toDoList.children);
	let completedTasks = Array.from(finishedToDos.children);
	let tasks = incompleteTasks.concat(completedTasks);

	tasks
	.filter( task => {
		return !task.textContent.toLowerCase().includes(search);
	})
	.forEach(task => task.classList.add("filtered"));
	
	tasks
	.filter( task => {
		return task.textContent.toLowerCase().includes(search);
	})
	.forEach(task => task.classList.remove("filtered"));
};

const returnsFalse = () => {
	return false;
};

/* This piece of code creates a new to do based off the HTML template and the user sumbitted value
once the submit button is pressed*/
addButton.addEventListener("submit", event => {
	
	event.preventDefault();
	
	const newToDoValue = addButton.usersText.value.trim();
	if (newToDoValue.length) {
		createToDo(newToDoValue);
		addButton.reset();
	}
	
});

// Deleting to dos if the trash button is clicked and moving tasks to complete if the text is clicked
toDoList.addEventListener("click", event => {
	
	if (event.target.classList.contains("delete")) {
		// If the delete button is pressed, then the to-do will disappear
		event.target.parentElement.remove();
	} else if (event.target.classList.contains("span")) { //Completed to-do functionality
			//Changing the look of the todo (making it gray and striking it through)
			event.target.style['text-decoration'] = 'line-through';
			event.target.style['color'] = 'gray';
			//Adding it to the completed tasks
			finishedToDos.innerHTML+=addRemoveToDoHtml(event.target.parentElement.innerHTML);
			//Removing it from the incomplete tasks
			event.target.parentElement.remove();
	} 
});

// Deleting to dos if the trash button is clicked and moving tasks back to incomplete if the text is clicked
finishedToDos.addEventListener("click", event => {
	if (event.target.classList.contains("delete")) {
		event.target.parentElement.remove();
	} else if (event.target.classList.contains("span")) { //Completed to-do functionality
			event.target.style['text-decoration'] = 'none';
			event.target.style['color'] = 'white';
			toDoList.innerHTML+=addRemoveToDoHtml(event.target.parentElement.innerHTML);
			event.target.parentElement.remove();
	}
});

// Calling the search function when the user presses a key
searchBar.addEventListener("keyup", () => {
	const searchTerm = searchBar.value.trim().toLowerCase();
	filterToDos(searchTerm);
});

searchBarContainer.addEventListener("submit", e => {
	e.preventDefault();
});
//Creating collapsibility by adding and removing d:none with a button press

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
	  } 
  });
}