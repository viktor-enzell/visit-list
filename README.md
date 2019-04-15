# ToGo List
This is a fullstack assignment for Hitta.se, implementing a ToGo list.
It is implemented using **React.js** as the frontend framework and a backend REST API implemented using **Java** and the **Spring** framework. 
A **MongoDB** database is used in the backend.

There are two different build tools (npm for React and Maven for Java).
So I chose to place the React client within the Maven project and let Maven call npm.
The initial Maven project structure was generated with https://start.spring.io/.
And the initial React project structure was generated with npx create-react-app.

The application works like ...


The React frontend can be found at: src/main/app/src/.

The Java backend can be found at: src/main/java/com/fullstack/togo/.


## Personal thoughts
I chose React as the frontend framework since it seems to be what is used at Hitta.se. 
I don't have too much experience in React so I'm not sure that I have followed all conventions.
The same goes for the API, I don't have much experience in writing REST APIs so I probably didn't follow all the conventions.
I left out the part "User can filter saved places" since I was not sure what was meant by it.
Overall I think it worked out fine.


## Dependencies
Java 1.8, Maven, MongoDB, npm.


## Running the application
A MongoDB server must be started before the application is started. 
The command can look like this on Mac: ```brew services start mongodb```.
Or like this on Linux: ```sudo service mongod start```. 
When that is done the application can be built and executed like this:
```bash
mvn clean install
java -jar target/togo-0.0.1-SNAPSHOT.jar
```
