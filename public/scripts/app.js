$(document).ready(function() {
  $.getJSON("/api/todos")
  .then(addTodos)

  $('.form__input').keypress(function(event) {
    if(event.which == 13) {
      createTodo();
    }
  });

  $('.list').on('click', '.list__task--par', function() {
    updateTodo($(this).parent());
  })

  $('.list').on('click', '.list__task--icon-span', function(event) {
    event.stopPropagation();
    removeTodo($(this).parent());
  })
});


function addTodos(todos) {
  todos.forEach(function(todo) {
    addTodo(todo);
  });
}

//'<span class="list__task--icon-span">' + todo.created_date + '</span>' +

function addTodo(todo) {
  let newTodo = $('<li class="list__task">' + '<span class="list__task--icon-span">' + '</span>' + '<p class="list__task--par">' + todo.name + '</p>' + '</li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if(todo.completed) {
    $(newTodo).find('.list__task--par').addClass('complete');
    $(newTodo).find('.list__task--icon-span').addClass('icon_complete');
  }
  $('.list').append(newTodo);
}

function createTodo() {
  //send request to create new todo
  let userInput = $('.form__input').val();
  $.post('/api/todos', {name: userInput })
  .then(function(newTodo) {
    $('.form__input').val('');
    addTodo(newTodo);
  })
  .catch(function(err) {
    console.log(err);
  })
}

function removeTodo(todo) {
  let clickedId = todo.data('id');
  let deleteURL = '/api/todos/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deleteURL
  })
  .then(function(data) {
    todo.remove();
  })
  .catch(function(err) {
    console.log(err);
  })
}

function updateTodo(todo) {
  let updateURL = '/api/todos/' + todo.data('id');
  let isDone = !todo.data('completed');
  let updateData = {completed: isDone};

  $.ajax({
    method: 'PUT',
    url: updateURL,
    data: updateData
  })
  .then(function(updateTodo) {
    $(todo).find('.list__task--par').toggleClass('complete');
    $(todo).find('.list__task--icon-span').toggleClass('icon_complete');
    todo.data('completed', isDone);
  })
}
