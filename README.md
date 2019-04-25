# VisitList
This is a web app for you to list all the places that you want to visit by interacting with a MapBox map.
It is implemented using **React.js** as the frontend framework and a backend REST API implemented using **Java** and the **Spring** framework. 
A **MongoDB** database is used in the backend.

There are two different build tools (npm for React and Maven for Java).
So the React client is placed within the Maven project and Maven calls npm on build and execution.
The initial Maven project structure was generated with https://start.spring.io/.
And the initial React project structure was generated with npx create-react-app.

How the application works: A user selects a spot on the map, enters a name and clicks button to add. 
A request containing the name and location is sent to the backend where the location is stored with the name as key.
The names of saved places are also stored in the frontend in order to render the list of names.
The user can choose to view a stored location, in this case a request containing the name is sent to the backend and the location is returned.
A marker is added to the map at the retrieved location. 
The user also has the choice to remove a location, in this case a request containing the name is sent to the backend and the location is removed from the database.

The React frontend can be found at: src/main/app/src/.

The Java backend can be found at: src/main/java/com/fullstack/togo/.


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
The application runs on ```localhost:8080``` by default.
