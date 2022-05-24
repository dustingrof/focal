## Demo Guide

- db reset server
- npm start server
- npm start client
- window scale to 



- single driver for screen share



overview of homepage, when first signed in (sign in), a user 
overview of kanban page






Nicole: Hi, my name is Nicole

Iaan: My name is Iaan

Dustin: My name is Dustin

Nicole: ...and we are here to present our app "focal" -- a project management and time tracking tool that helps teams stay focused and get things done.

Our motivation for building this app was seeing existing kanban boards lacking features we wanted, like integrated communication and time tracking for specific cards.

We have deployed our app on Heroku if you'd like to check it out as we review it here, here is a link now in the chat.

## Homepage

I'll start on the home page board. You can see the avatar in the top corner showing I am already signed in. I'm presented with some widgets--the weather widget uses the weather-API and the time tracking pie chart uses the chart-js API.

There is also a summary of tasks assigned to me, which I can expand to show more details like other assigned people, which board the task belongs to, and a description.

Along the top header is the logo, which is linked to the homepage, as well as some other controls on the right.

These controls include a pomodoro timer, a global task timer, a toggle for light and dark mode, a chat button, and a user avater.

While we are here, let's start the timer and change our theme to dark.

Along the left nav bar is list of the boards, with a button at the top to create a new board.

I can position the mouse over to see the board name.

## Kanban

I will click on this first board to go into it.

Now we can see the kanban cards.

I can click and drag to move a card to a different status box.

Each card has an edit button, the name of the task, a due date if it has one, and a reminder flag that shows up depending on the date.

Warning flags show in black when a task has 2 days remaining, and show in red when a task is overdue. A pop

Cards with more than 2 days left show no flag, and cards in the complete status box instead show only a green checkmark.

## Card Edit

Clicking on the card edit button brings up a detail window, and blurs the background to keep our focus on the task at hand.

Sometimes details and specs change, so from this view I can edit the card name and description.

The due date can be changed using the calendar dropdown.

We believe in collaboration, so each task can have multiple users assigned, and this list can be updated using the checkboxes.

I can send an email directly from this task card, and the subject line is auto-generated with the task name.

Sometimes it's best to talk face-to-face instead an email, in which case I can click this button to start a video call in a new tab.

**Edit description from "Demo Day Presentation" to "Great Demo Day Presentaiton"**

We can see our global timer is still running.

To help me stay on track, I want to save that 2 minutes to this task. I can do using the green button.

We can see the task time update to reflect, and the global timer resets. I can also restart the time from here for the next task.

We could delete the card if need be, but in this case I will just exit by clicking off the card. Changes are automatically saved.

## New board

To create a new board, I can click on the plus button here. If I try to save without entering enough information, I get an error message.

Let's make a new board:
**name**
**desc**
**image** (something really obvious)

We can see our new board has been added to the board list. Let's check it out.

## New card

To make a new card, I can click this button in the top right and enter the information

**Enter new card info, click on the new board**

And it shows up on the board!

## Chat

**unless bug fixed, hit F5 to refresh here**

We can see that I'm logged in as ___

When I open the chat, I can see my own messages and messges from others.

**type something like "Hey Iaan" and Iaan responds "Hi there"**

## About

Lastly, we have an about page which outlines the stack used, our contact information and an email form if you want to get in touch with us.

As mentioned at the beginning, our app is deployed on heroku if you'd like to go check it out! Here is the link again in the chat.

Thanks for letting us walk you through our app -- this was a very fun and challenging project and we look forward  

















