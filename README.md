# focal
A full stack web app made to help teams stay organized and productive. Built with React on the frontend and Express/PostgreSQL on the backend, and uses the [Mantine](https://mantine.dev/) component library as well as [Footable](https://fooplugins.github.io/FooTable/).

This app was built as a final project for the Lighthouse Labs web development program by:
* Nicole MacLean [[LinkedIn](https://www.linkedin.com/in/nicole-maclean-501aa6b6/)] [[Github](https://github.com/niccmac)]
* Dustin Grof [[LinkedIn](https://www.linkedin.com/in/dustingrof/)] [[Github](https://github.com/dustingrof)]
* Iaan Johnston [[LinkedIn](https://www.linkedin.com/in/iaanjohnston/)] [[Github](https://github.com/double-slide)]

## Video Link
Project Demo
[on LinkedIn](https://www.linkedin.com/posts/iaanjohnston_webdevelopment-teamworkmakesthedreamwork-activity-6945849088844197888-TMt2/?utm_source=linkedin_share&utm_medium=member_desktop_web)

## Product Views (Light Mode)
!["Kanban Board View"](https://github.com/dustingrof/focal/blob/main/public/images/focal1-light.png?raw=true)
!["Edit Card View"](https://github.com/dustingrof/focal/blob/main/public/images/focal2-light.png?raw=true)
!["Slideout Chat View"](https://github.com/dustingrof/focal/blob/main/public/images/focal3-light.png?raw=true)
!["About Page View"](https://github.com/dustingrof/focal/blob/main/public/images/focal4-light.png?raw=true)

## Product Views (Dark Mode)
!["Kanban Board View"](https://github.com/dustingrof/focal/blob/main/public/images/focal1-dark.png?raw=true)
!["Edit Card View"](https://github.com/dustingrof/focal/blob/main/public/images/focal2-dark.png?raw=true)
!["Slideout Chat View"](https://github.com/dustingrof/focal/blob/main/public/images/focal3-dark.png?raw=true)
!["About Page View"](https://github.com/dustingrof/focal/blob/main/public/images/focal4-dark.png?raw=true)

## Setup From Repo
1. Locally clone the repo
2. Navigate to `/server`
3. Install depencies using `npm install`
4. Reboot the database using `npm run db:reset`
5. Start the server using `npm start`
6. Navigate to `/client`
7. Install all dependices using `npm install`
8. Start the client using `npm start`
9. Navigate to http://localhost:3006

## Functionality
The app is configured for demo currently--start by selecting one of the three users from the dropdown.

### View:
- all boards in the left navigation bar
- all tasks for a board in the kanban view
- all their own tasks in the homepage view
- the current weather in their homepage view

### Timetrack:
- using the onboard Pomodoro time
- using the global timer, which can then be assigned to a task

### Create, edit & delete:
- new boards
- new tasks--on an existing board

### Communicate:
- send messages to all other users through the group chat
- send an email about a task, from the task detail view
- initiate a video chat call, from the task detail view
  
