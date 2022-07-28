# GraphQL Task

The project should consider following criteria with GraphQL API using Nodejs, MongoDB and Typescript.

    1. Able to perform mutations to create and update a user with a few sample fields.
    2. Able to query for users filtering by Id, and sample fields like name, zipcode, email etc. Should return paginated results if there are more than a certain number of search results.
    3. Add OAuth middleware to authenticate API requests.
    4. Add any logger of your choice to log the events.

To satisfy these meets, schemas are created on the file typeDefs.ts and the required implementation and functions provided in the resolvers.ts file.
The connection to the Database is created with the help of the connectionDB.ts file located in the db folder. In addition, in this folder, the schema related to the MongoDB was created with the required fields.
To grab the benefits of using the Typed system, related typescript interfaces and types are generated in the file types.ts located in the type folder.
The main file, index.ts located in the src, is the main file to start the application. All configurations related to the Server and express and MongoDB are found there.

## Installation and Run

To run the application, first need to install the NPM package, then run it with npm start.

    npm install
    npm start

The project starts as follows if there are no issues,

    http://localhost:4000/graphql

It is important to mention that, MongoDB should be run in advance since its connection is checked before using the application. For this reason, the specific file is known as _docker-compose.yaml_ created, and it can be run to have both MongoDb and mongo-express. The command to run the file:

        docker-compose -f docker-compose.yaml up

With the help of volumes, the data persistency is satisfied.

## Usage

The project uses apollo-server-express, which is the Apollo Server package for Express, the most popular Node. js web framework. It enables you to attach a GraphQL server to an existing Express server.
To use the application, just open the project, http://localhost:4000/graphq. The UI related to GraphQL opens and there the user can send its requests and receive the response based on the Schema defined in the typeDefs file.

## Libraries and Middleware

### logger

To use the logger system across the entire project, the _[Winston](https://www.npmjs.com/package/winston)_ logging system is used. It has some specific configuration in the file located in the logger/index.ts. The config contains some configuration about showing the timestamp and also using the color to print understandably instead of using a console log.

### jsonwebtoken and jwt

To satisfy the Authentication and Authorization, _[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)_ is used. The login mutation is created for logging into the system to gain the right permission to work with some specific requests. After logging, a token with the help of the jwt and sign method will be created for about one hour. Then this token will be used for further requests. This token is placed into the context of the server and could be accessible in each Query and Mutation. In this project, only authorized users can use updateUser API to update their information. This could be extended to other queries and Mutations as well.

## CAUTION

It is obvious that all critical information, such as the database username and password in the YAML file and also information related to the connection of MongoDB, and also the SECRET key that is used to generate the token should be placed in the .env file. However, this is a DEMO.

## GraphQL Schemas

| Name                | Description                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| createUser          | This is used to create a new User, the password is going to hash and save on DB. Be noticed that, the email of the user should be unique. |
| login               | Is used to log in to the system to access some specific APIs.                                                                             |
| updateUser          | Is used to update the user information, the user must be logged in advance.                                                               |
| getUser             | Users can the information by providing the email.                                                                                         |
| getUsersByFiltering | The user can get the information based on several filters.                                                                                |
