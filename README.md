# Trainmasters - travel project from group 8

## Code Standard
- ESLint will enforce some code standards, and will automatically warn if not followed when starting the app.
- No specific standard has implemented as of now, follow the project's existing standards.
    - E.g. indent lines by 2 spaces.

## Project Folder Structure
- **/api**: root of the API server.
    - **/api/models**: Definitions our MongoDB collections.
- **/client**: root of the Frontend layer of the applicatio
    - **/client/pages**: contains the different views displayed in the browser
    - **/client/contexts**: currently two context variables are used in the app. They are wrapped around the **app.js** as a context provider.

## Version Control
- Implement bugfixes and new features on a new by branching from the **staging**.
- Merge the latest **staging** changes into your branch before merging your branch into **staging**.
- Create PR (Pull Request) when done and merge your branch into **staging**.
- Once you have verified that no breaking changes have been introduced to **staging**, create a PR and merge **staging** into **main**.

## Important setup requirements
- Clone the repository.

In order to get the app running, theres a few accounts that needs to be created in order for the app to work:

- Create an account for MongoDB atlas. The login credentials needs to be exchanged in the .env file within the backend folder (api) so the backend can maintain a connection to the database.

    > Update the connection information in the project's **.env** file.
    ![The backend's .env file.](docs/images/backend-.env-file.png)

- Create a 2 dummy mail accounts. One acts as the apps client mail and one as the recipient of a booking confirmation. (Tip: mailtrap.io is a good way of setting up a test mail environment.) This is of course a temporary solution that will change to the users mail address in further development.

- Note that in order to start the app locally you need to start both the api and the client in separate terminals. 

---

## Technology Stack
- MERN (MongoDB, Express.js, React, Node.js)

---

## API (backend)

Api is setup to run on localhost port 3001 (the port can be changed in the Api folders **.env** file).

### Node.js Scripts
- `npm install` - updates the api with the latest packages
- `npm start` - runs the backend **without** nodemon package (changes will not be instantly changed during local development, used for the deployed version at herokuapp)
- `npm run devstart` - runs the backend including the nodemon package (better for local development, enables hot-refresh)

### Technologies
- CORS (Cross-Origin Resource Sharing).
- crypto-js (Used to encrypt and decrypt passwords on login and account creation)
- jsonwebtoken (Used to create a JSON Web Token for use when authenticating users)
- Express.js (To create a server to run our API on)
- Mongoose (MongoDB database helper library)
- Nodemailer (To send email messages from our backend)
- Nodemon (To make the app react to changes made in active local development)

### The `Verify` middleware.
- Can be found in: `/verifyToken.js`
- Uses the **jsonwebtoken** package.
- The salt used in account creation and authentication is specified in our **.env** file under `SECRET_KEY`.


---

## Database
- MongoDB (See above on notes on how to connect to the database).

### Setup
> Collections are automatically created when the API app (backend) is started. You can easily add more collections by creating a new mongoose file in the api models folder.

- To populate the database with some initial data on available trips, you can use the **tripplans.json** file in `/docs/database json data/`.



---

## Client (frontend)

### Node.js Scripts
- `npm install`: Install all dependencies.
- `npm build`: Build the **frontend** app for deployment.
- `npm start` | `npm run start` : Start the **frontend** app locally.
- `start-nobrowser`: Same as 


Client is setup to run on localhost port 3000 (the port can be changed in the Client folders **.env** file on the)

### Technologies
> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- React
    - material-ui (GUI components such as Buttons)
    - **axios** (To make API requests against our API).
- Jest (Unit testing)
    - Only one simple test exists as of yet (found in **client/test/fieldValidation.test.js**)


### Start locally
- Install **Node.js**, we suggest the LTS (Long Term Support) branch, e.g. version 16.* (https://nodejs.org/en/).
- Once **Node.js** has been installed, start/restart your favourite Terminal app and navigate to the "client" dir in the project.
- Run `npm install` to install all dependencies.







### Tests
1. Follow the instructions under **Start locally** to install all dependencies.
1. Navigate to `/client/`.
1. Run `npm run test`

> Add new tests for the **frontend** app to `/client/tests/`.


### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


#### `npm run no-browser`

Same as `npm start`, except that it doesn't open a browser window.

#### `npm run test`

todo: Jest ...
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Hosting

???























TO RUN THE APP:

-CLONE THE REPO

-START THE FRONTEND:

1. cd /client
2. npm install
3. npm start
4. Frontend is now running @ http://localhost:3000/

-START THE BACKEND (hot-refresh with nodemon):

1. cd /api
2. npm install
3. npm run devstart
4. Backend is now running @ http://localhost:3001/api
