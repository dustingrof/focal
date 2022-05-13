# Final Project Planning

## Project title:
focal

## Project description:
- Used for organizing tasks on a project in a visually clear manner (Kanban board) with multiples boxes--backlog, in progress, pending, completed (we will simplify this).
- Each task will be on a 'card' with it's own information including contributors/assignees, name, description, date started, due date, date completed, time tracking
- To change a task card status it can be dragged from one box to another
- This app will solve the problem of organization & efficiency during project management

## Target audience:
- small and large companies, anyone who wants to organize tasks

## Team members:
Nicole, Dustin, Iaan

## User stories:
(*italics* => out-of-scope)
- *A user can create an account and use to sign in and out*
- A user has an account with name, avatar, *credentials*
- A user can create a project [X]
- A user can see all projects [X]
- A user can create one or more task cards within a project [x]
- A user can edit task information including status (which box) [X]
- A user can delete a task card [X]
- A user can start/stop a time-tracking feature on a given task card [x]

- Each project
  - can contain multiple task cards [X]
  - will have a project name [X]
  - will have a project description [X]
  - will have a project image URL [X]
  - from main page, click project image to open project [X]
  - inside project view, click task card to 'focus' on that task  [x]
  - inside project view, click project name to 'focus' on project overview [x]

- Each task card will have (barebones)
  - name (50 char) [X]
  - single accountable user [X]
  - due date [X]
  - description (300 char) [X]
  - checklist [X]
  - notes[X]
  - Importance - 3-days, 1day, overdue [X]

## Stretch user stories
- When editing task card, card becomes central view & background blurs [x]
- Each task card will have dynamic flag based on urgency/due date [x]
- User in task card shows icon and name on hover. 
- Task will send responsible user text (or other) reminder X days before due
- Task will send text notification to others upon status change to completion
- Each project view will have a chat forum [x]
- Each task card will have a 'schedule meeting' button [x]
- A user can upload files and attach them to a task card [x]
- Base boards to copy for repeating projects/boards/tasks. [x]
- Tasks will have 'keywords' assigned 

## Stack Choices
- Front end
  - ReactJS
- Back end
  - nodeJS
  - express
- Database
  - PostgreSQL
- 