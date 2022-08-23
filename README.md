<h1 align="center">The Redbook (Back-end)</h1>
<h4 align="center">A full stack facebook imitation</h4>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

### :link: [Link to front-end](https://github.com/AndyOooh/redbook_frontend)

### :link: [Link to back-end](https://github.com/AndyOooh/redbook_backend)

### :house: [www.theredbook.xyz](www.theredbook.xyz)

- [Description](#description)
- [Usage](#usage)
- [Pages](#pages)
- [Features](#features)
- [Technologies](#technologies)
- [Author](#author)
  

## Description
This project is a part of my education to become a full stack developer. It is for showcasing my skills and knowledge. 

Looking for a project to put together all the skills I have learned so far, I began a Udemy course called [Build Facebook clone with REACT JS AND THE MERN STACK 2022](https://www.udemy.com/course/build-facebook-clone-and-master-react-js-mern-stack-2022/). It ticked many boxes, e.g. using Redux, MongoDb, Cloudinary, Google cloud and more. However, I quickly came to the relization that it was lacking in quality. The code wasn't DRY, not making use of the latest technologie (e.g. Redux Toolkit), and the project was not well structured. Instead of ditching the project I set out to do it my own way with better structure, newer technologies, and a more DRY approach.


## Usage
There are two choices for usage: 
1. **Go to the website and peak around.**
   1. Log in with the dummy-user *Michal Scott:*  
   Email: thatswhat@shesaid.com Password: 1234.
   2. Or create a user with your own or a [throw-away email].(https://temp-mail.org/en/)
2. **Clone the project to your machine. 
NB: You will need to clone both the front-end and back-end repo.** 
   Prerequisites for option 2:
   - Node.js v15.x or higher.
   - Fill out .env.sample with your own credentials. You will need:
     - A Mongodb database.
     - A Google Cloud Platform account.
     - A Cloudinary account.

    Then (in both repos) run:
  
```sh
 npm install
```

```sh
npm start
```
   

## Pages
- Home
- Login
- Profile
  - Posts
  - About
  - Friends
- Reset Password

## Features
- [x] Account creation & verification (email)
- [x] Login & authentication with Refresh/Access tokens
- [x] User posts
- [x] Post comments, likes and emojis
- [ ] Profile updates including profile/cover pictures with cropping and resizing
- [ ] Connections (friends)
- [ ] Notifications
- [ ] Messaging


## Technologies
**Back-end**
- NodeJs/Express
- MongoDb/Mongoose
- NodeMailer & Google Cloud (mail)
- Cloudinary 
- Multer
- jsonwebtoken


**Front-end**
- React v18
- Redux Toolkit/RTK Query
- React router v6
- SASS

**Deployment**
- AWS EC2 (back-end)
- Firebase (front-end)
- NGINX as proxy with SSL
- [git-secret](https://git-secret.io/) for handling env variables.
- Github Actions CI/CD with firebase.



## Author

👤 **AndyOooh**

* Website: [andyo.xyz](andyo.xyz)
