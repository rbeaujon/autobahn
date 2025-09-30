This repository is a simple form to manage 3 fields (input-text, select, checkbox) with validations and fills the data from DB.
The design was made using material design.
It was created to manage a user session without login, and it uses uuid library to generate a random identification.

The BE manages all the validations, and reports by console and JSON all the status codes available.  
Additionally, a CORS control was added because it is required by the hosting server for this app.

Automated tests are covering all modules.

<img src="/assets/images/coverage.png" width="60%">


## Technical details

The Front-End was developed using REACTJS, JEST and SASS.
The Back-End was made on NodeJS using the ExpressJS framework and MySQL.

The Back-End and Front-End have their own dependencies package and runners under NPM.


## Views

<img src="/assets/images/form.png" width="80%">


### npm run +

    start: Run this script to execute the development server available for your React application.
    test:  To run the testing mode, using react-scripts: 5.0.1 and jest-dom 5.16.5
    build: This sets and creates a build directory with a production build of your app

#### Browser views

Front-End [http://localhost:3000]

Back-End API [http://localhost:3001]

## API Endpoints

Server URL : [http://localhost:3001]

### POST /session

#### Parameters
 
* session: number

#### Responses

* Status Code: 200
* Media type: application/json
* Schema :
 ```
 {
    userId: string,
    fieldId: array,
    session: number
 }
 ```
**** FAILED ****

* Status Code: 500
* Media type: application/json.
* JSON Response: Internal server error, the request return + error message.
* Console Message: Problems getting the session user data + error message.

### POST /register

#### Parameters

* Request body
* Media type: application/json.
* Schema :
 ```
 {
    userId: string,
    fieldId: array,
    session: number
 }
 ```

#### Responses

* Status Code: 201
* Media type: application/json.
* JSON Response: The register was successfully saved

**** If session exists ****

* JSON Response: The register was successfully updated

**** FAILED ****

If some fields are empties or undefined

* JSON Response: Partial Content, json with some fields emptied.
* Console Response: Partial Content, json with some fields emptied.

If some fields have different types

* JSON Response: Bad Request.
* Console Response: Bad Request.

If it has a DB error with the session data

* JSON Response: Problems consulting the registered users


### GET /sectors

#### Parameters

* No parameters are required

#### Responses

* Status Code: 200
* Media type: application/json.
* Schema :
 ```
 {
    userId: string,
    fieldId: array,
    session: number
 }
 ```

**** FAILED ****

* Status Code: 500
* JSON Response: Internal server error, the request return + error message.
* Console Response: Failed getting the registered user list + error message.


### GET /register

#### Parameters

* No parameters are required

#### Responses

* Status Code: 200
* Media type: application/json.
* Schema :
 ```
 {
    userId: string,
    fieldId: array,
    session: number
 }
 ```

**** FAILED ****

* Status Code: 500
* JSON Response: Internal server error, the request return + error message.
* Console Response: Failed getting the registered user list + error message.

## Out-of-scope
  
  * Create conceptual and communication diagrams to understand the application flow visually.
