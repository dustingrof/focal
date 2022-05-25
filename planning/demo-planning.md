## Demo Guide

- db reset server
- npm start server
- npm start client
- window scale to

overview of homepage, when first signed in (sign in), a user
overview of kanban page

# Start

Dustin: Hi, my name is Dustin. I came into this program with 10 years experience developing WordPress websites, and I am happy to say that I am now a full-stack developer.
Nicole: Hi, my name is Nicole & background

Iaan: My name is Iaan & background

Nicole: Hi, my name is Nicole.

Dustin: My name is Dustin & background

Stack goes here

...and we are here to present "focal" -- our app for project management and time tracking that we know will help teams stay focused and get things done.

Our motivation for building this app was seeing existing kanban boards lacking features that we wanted, like integrated communication and built in time tracking.


**share before or after?**

## Homepage

I'll start on the home page board. You can see the avatar in the top corner showing I am already signed in.

I'm presented with some widgets--the weather widget uses weather-API and the time tracking chart uses the chart-js library.

There is also a summary of tasks assigned to us.

Along the top header is the logo, which is linked to this homepage, as well as some other controls on the right.

These include a pomodoro timer, a global task timer, a toggle for light and dark mode, a chat button, and a user avatar.
These include a pomodoro timer, a global task timer, a toggle for light and dark mode, a chat button that we will circle back to, and a user avater.

While we are here, let's start the timer and change our theme to dark.

Along the left nav bar is list of the boards, with a button at the top to create a new one.

I can position the mouse over to see the board name.

Next up we are going to look at the boards

## Kanban

Time to get into the core functionality of the app. Follow along as we click to open first boards view.

Here we can see our 4 colums (Backlog, Doing, Pending, Complete) and kanban cards.

As you would expect, you can click and drag to move a card to a different status box.

Each card has an edit button, the name of the task, a due date if it has one, and a reminder flag that shows up depending on the date.

Warning flags show in black when a task has 2 days remaining, and show in red when a task is overdue. A popover appears as you hover over the flags to tell you what they mean.

Cards with more than 2 days left show no flag, and cards in the complete status box instead show only a green checkmark.

(would like to make sure people see the flag turns into a checkmark as its dragged in)

## Card Edit

Clicking on the card edit card button brings up a detail window, and blurs the background to keep our focus on the task at hand.

Sometimes details and specs change, so from this view we can edit the card name and description.

The due date can be changed using the calendar dropdown.

And since collaboration is a big part of getting tasks done, we have added a few ways to stay connected up to date with your team.

First, each task can have multiple users assigned. You will then see your own assigned tasks on the homepage.

We can also send an email directly from this task card, and the subject line is auto-populated with the task name.

Sometimes it's best to talk face-to-face, so along with email, we have integrated Google Meet.

All it takes is to click this button for a video chat to begin. Where you can copy the link and send it to your teammates.

**Edit description from "Demo Day Presentation" to "Great Demo Day Presentaiton"**

Back to the task edit view, we can see our global timer is still running.

It is important keep track of time on our projects for many reasons. But billing, estimates, and performance reviews are a few good examples. To do this, we can click the little green button.

We then see the task time update to reflect our addition, and the global timer resets. We can also restart the time from here for our next task we are working on.

The description handles rich text as well as embedded images.

We could delete the card if need be, but in this case I will just exit by clicking off the card. Changes are automatically saved.

I will now pass it over to Iaan

## New board

To create a new board, I can click on the plus button here. If I try to save without entering enough information, I get an error message.

Let's make a new board:
**name**
**desc**
**image**

https://media.istockphoto.com/photos/shiny-red-ball-with-shadow-on-a-white-background-picture-id172290409?b=1&k=20&m=172290409&s=170667a&w=0&h=GSsss-rYlO7cSqvxe3ju-sdfAGg-cXKN_6kA6ia7zJY=

We can see our new board has been added to the board list. Let's check it out.

## New card

To make a new card, I can click this button in the top right and enter the information

**Enter new card info, click on the new board**

And it shows up on the board!

## Chat

**unless bug fixed, hit F5 to refresh here**

We can see that I'm logged in as \_\_\_

When I open the chat, I can see my own messages and messges from others.

**type something like "Hey Iaan", close window, notification and Iaan responds "Hi there"**

This chat was built using websockets, so messages pop up right away.

If my chat is closed when I receive a message, I get a notification in the bottom and the icon also adds a small red notification badge.
If my chat is closed when I receive a message, I get a notification on the chat icon.

## About

Lastly, we have an about page which outlines the stack we used, our contact information and an email form if you want to get in touch with us.

Our app is deployed on heroku if you'd like to go check it out! Here is the link now in the chat.


Challenges

Future objectives (deploy worldwide and get 1M users)

Thanks for letting us walk you through our app -- this was a very fun and challenging project and we look forward
