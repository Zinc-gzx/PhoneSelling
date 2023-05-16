# Getting Started with Our Web

## Available Scripts

In the project directory, you need to setup db first

### `node setup` in backend folder

This will help you to reset the database and create two collections: userprofile and users.\
We hold our database on mongodb locally with link (mongodb://localhost:27017/COMP5347).\
All the user in database has been added a innitial password: Password. to test.\
For the user email, please see the userlist.json.\

### `npm install` in frontend

Run `npm install` to install the required package and node_modules in frontend

### `npm install` in backend

Run `npm install` to install the required package and node_modules in backend

### `npm start` in frontend

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start` in backend

Runs the app backend to apply the supportted functionalities and access dataset

## Secret key

Some of the secret key has been stored in the .env file which contains:\
MAIL_SERVICE_AUTH_USER\
MAIL_SERVICE_AUTH_PASS\
MAIL_SERVICE_FROM\
APP_SESSION_SECRET\
PASSWORD_RESET_POLL\
BCRYPT_SALT_ROUNDS\

## Gunmail
Due to the gunmail is a secured email validation thrid party, all the email address needed to verified should be added into gunmail manually.\
The database contains a lot of acoounts to test only.\
If you need to setup a new account, and need email verify, please contact us at xixu8329@uni.sydney.edu.au\

## Learn More

We use gunmail to generate third party email verification.\
We use mui to style our fronted.\
We use axios to handle our data transmission.\
We use js-cookies to set cookies.\
We use js-password-checklist to validate password.\



