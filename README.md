# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.


### Links

- Solution URL: [Github](https://github.com/maurodollinger/interactive-comment-section)
- Live Site URL: [GitHub Page](https://maurodollinger.github.io/interactive-comment-section/build/)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Sass](https://sass-lang.com/) - For styles
- [Firebase](https://firebase.google.com/) - For Realtime Database
- Flexbox
- Desktop and Mobile layout - Responsive

### What I learned

I have built a comment section on React.js fetching realtime data from Firebase.
In this project I have properly learned how to use an AuthContext and I put in practice my aknowledges of React.
I have completed bonuses like adding Timestamp functionality with the data-fns library.
I'am proud of the comment tree component, that works with a recursive functionality that fetches the replies and generate infinite comment containers.
I also added some smooth animations for the comment appearence and for the modal. 
The user is picked randomly from the database, just to show better the components functionalities.


### Continued development

I want to improve the score functionality, now it only blocks the opportunity to make another click, but I would like to add a real verification by user. Also I would like to add a user creation and authentification. 

## Author

- Website - [Mauro Dollinger](https://www.maurodollinger.com.ar)
- Frontend Mentor - [@maurodollinger](https://www.frontendmentor.io/profile/maurodollinger)
- Twitter - [@dollingermauro](https://www.twitter.com/dollingermauro)


