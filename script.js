var todoList = {
    todos: [],
  
    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
  
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
  
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
  
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
  
    toggleAll: function () {
        var isAllTrue = true;
        var self = this;

        this.todos.forEach(function (element) {
            if (element.completed !== true) {
                isAllTrue = false;
            }
        });
        
        this.todos.forEach(function (todo, index) {
            if (isAllTrue === true) {
                self.toggleCompleted(index);
            } else {
                if (todo.completed === false) {
                    self.toggleCompleted(index);
                }
            }
        });
    },
  
    setDefaultTodoList: function () {
        this.todos = []; 
        var defaultSize = 6;
        for (var i = 0; i < defaultSize; i++ ) {
            var todoText = "item " + (i + 1);
            this.addTodo(todoText);
        }
        this.toggleCompleted(2);
        this.toggleCompleted(5);
    }
};

var handlers = {
    displayTodos: function() {
        view.displayTodos();
    },
  
    addTodo: function() {
        var addTodoTextInput = document.getElementById("addTodoTextInput");
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
  
    changeTodo: function() {
        var changeTodoPositionElement = document.getElementById("changeTodoPositionInput");
        var changeTodoTextElement = document.getElementById("changeTodoTextInput");
        var changeTodoPosition = changeTodoPositionElement.valueAsNumber;
        var changeTodoText = changeTodoTextElement.value;
        todoList.changeTodo(changeTodoPosition, changeTodoText);
        changeTodoPositionElement.value = "";
        changeTodoTextElement.value = "";
        view.displayTodos();
    },
  
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
        view.displayTodos();
    },
  
    toggleTodo: function(position) {
        todoList.toggleCompleted(position);
        view.displayTodos();
    },

  
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
  
    setDefaultTodos: function() {
        todoList.setDefaultTodoList();
        view.displayTodos();
    }
  
};

//This is the concept of rendering.
var view = {
    displayTodos: function () {
        var todosUl = document.querySelector("ul");
        todosUl.innerHTML = "";
        
        todoList.todos.forEach(function(todo, index) {
            var todoLi = document.createElement("li");
            var completedText = "";
            
            completedText = completedText + "(";
            if (todo.completed === true) {
                completedText = completedText + "x";
            } else {
                completedText = completedText + " ";
            }
            completedText = completedText + ")" + todo.todoText + " ";
            
            todoLi.id = index;
            todoLi.textContent = completedText;
           
            var toggleButton = this.createToggleButton();
            var deleteButton = this.createDeleteButton();
            todoLi.appendChild(toggleButton);
            todoLi.appendChild(deleteButton);

            todosUl.appendChild(todoLi);

        }, this);
    },
    
    createDeleteButton: function() {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },

    createToggleButton: function() {
        var toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle";
        toggleButton.className = "toggleButton";
        return toggleButton;
    },

    setUpEventListeners: function() {
        var todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", function () {
            var elementClicked = event.target;
            if (elementClicked.className === "deleteButton") {
                var liParent = elementClicked.parentNode;
                var id = parseInt(liParent.id);
                handlers.deleteTodo(id);
            } else if (elementClicked.className === "toggleButton") {
                var liParent = elementClicked.parentNode;
                var id = parseInt(liParent.id);
                handlers.toggleTodo(id);
            }
        }); 
    }

};

view.displayTodos();
view.setUpEventListeners();


