GET boards/
  - retrieves the collection of boards
  - used by navbar to render the board items in a list
  
POST boards/new
  - creates a new board using the provided request body
  -  when user clicks "add board" button to create a new board

PUT boards/:id
  - updates a specific board
  - when any board fields are edited use this endpoint

GET boards/:id
  - retrieves the board with the specified id
  - when a user selects a board from the navbar

DELETE boards:id
  - deletes a specific board
  - button on board focus view to delete board (extra confirm like scheduler?)

<!-- POST boards/new
- renders a form that collects information about a new board 
- not going to have a form for creating a board. just new board shows up, then you can edit it in focus mode -->

<!-- GET /boards/:id/edit
  - renders a form that collect information for altering a board -->


GET boards/:id/tasks/
  - retrieves the collection of tasks for given board
  - when a board is clicked on, load all associated tasks
  
POST boards/:id/tasks/new
  - creates a new task using the provided request body
  - when user clicks on "add task" button

PUT boards/:id/tasks/:id
  - updates a specific task
  - when user closes task focus view

GET boards/:id/tasks/:id
  - retrieves the board with the specified id
  - when user clicks on task card to open task focus view
  - is this necessary, or do we get all tasks in an object on page load
  - includes JOIN on query with users_tasks

DELETE boards/:id/tasks:id
  - deletes a specific task
  - when user clicks "delete" on task focus view


GET users/
  - retrieves the collection of users
  - in task focus card, load all users in a dropdown menu for adding to the task
  <!-- - potential: load for dropdown user selector menu from header -->
  
<!-- POST users/
  - creates a new user using the provided request body
  - not needed for demo day -->

<!-- PUT users/:id
  - updates a specific user
  - not needed for demo day -->

<!-- GET users/:id
  - should this be GET boards/:id/users/:id?
  - retrieves the user with the specified id
  - not needed for demo day -->

<!-- DELETE users:id
  - deletes a specific user
  - not needed for demo day -->


