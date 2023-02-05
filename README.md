# proverble

Wordle clone where you guess a word from a proverb, the proverb changes daily. 

![gameplay](./proverble.png)

### Frontend
- Typescript
- React
- Styled Components

### Backend
- Spring boot
- MySQL database

### How to run?

You need to have the database up and running before starting the spring boot application. When the spring boot application starts it loads the contents from csv folder to the database, if you want to add new ones you can do that there.

#### Database
Install Docker, Docker Compose
cd to `proverble/spring-backend/sanonta-backend/docker`
run `docker-compose up`

#### Backend
I'm using Java 17 and openJDK.
cd to `proverble/springboot-backend/sanonta-backend`  
run `mvn spring-boot:run`

#### Frontend
I'm using node version 18
cd to `proverble/frontend`
run `npm install && npm run dev`

To run the production build of the app:
`npm run buld`
`npm run preview`

### More about the project
When the UI renders it sends a request for todays proverb to http://localhost:8080/today, it then simply splits the proverb and takes the middle word from it, which will be the one the user has to guess. If a user guesses correctly then the whole proverb is displayed.

### TODO
- test :-)
- docs

