<h1 align="center">The Redbook (Front-end)</h1>
<h4 align="center">A full stack facebook imitation</h4>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

<!-- ### :link: [Link to front-end](https://github.com/AndyOooh/redbook_frontend) -->

## Links

### :link: [Back-end repo](https://github.com/AndyOooh/redbook_backend)

### :house: Live demo: [www.theredbook.xyz](www.theredbook.xyz)

- [Description](#description)
- [Usage](#usage)
- [Pages](#pages)
- [Features](#features)
- [Technologies](#technologies)
- [Author](#author)
  

## Prelude
This project is for showcasing my capabilities as a full stack web developer.

It is inspired by [Build Facebook clone with REACT JS AND THE MERN STACK 2022](https://www.udemy.com/course/build-facebook-clone-and-master-react-js-mern-stack-2022/). 

However, it differs in implementation (and sometomes choice) of technologies and techniques. 

## Description
This project is an imitation of Facebook without the full suite of features facebook has. Refer to [features](#features) for a list of implemented and planned features.

## Usage

### Check out the live [demo](www.theredbook.xyz)
   1. Create a user with your own or a [throw-away email](https://temp-mail.org/en/).
   2. Upload pofile- and cover images, update your bio and other details, create posts, comment, like, request/accept friendships.

### Clone the repo
NB: This is not a mono-repo. See [links](#links) for the other repo.

#### Prerequisites for running the app
- Node.js v15.x or higher.
- Mongodb database.
- Cloudinary account.
- [Optional] Google Cloud Platform account. This feature can be toggle by ``USEEMAIL=true/false`` in .env (has to be done in both front- and back-end). False is default.


#### Steps
- Clone the repos.
- Fill out .env.sample with your own credentials and rename it to .env.
- In both repos run:
  
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
  - Photos
- Reset Password

## Features
**CRUD: users, posts, comments, reactions.**
- [x] Account creation & verification (email).
- [x] Login & authentication with refresh/access tokens.
- [x] Password reset (OTP to email).
- [x] Navigation (with protected routes).
- [x] Post creation with images, background and emojis.
- [x] Post comments and reaction-emojis.
- [x] Image uploads, including crop, resize and drag/drop.
- [x] Profile updates including bio, work, eductaion, relationship status and more.
- [x] Friend requests: send, cancel, accept, reject, follow, unfollow.
- [ ] Profile search.
- [ ] Notifications.
- [ ] Messaging.

## Technologies
**Back-end**
- Node.js/Express
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
- [git-secret](https://git-secret.io/) for handling environment variables.
- Github Actions CI/CD with firebase.

## Author

👤 **AndyOooh**

- Website: [andyo.xyz](https://www.andyo.xyz/)
- LinkedIn: [@andyooh](https://linkedin.com/in/andyooh)
- Resume: [andyo.xyz/resume](https://www.andyo.xyz/static/media/Andreas%20Oee%20-%20Junior%20Full%20Stack%20-%20Resume.ab537effccc087b4a020.pdf)
