#Blogger app with login and cookies#
Blogger is a fullstack SPA application used to browse and read blog posts. It is compromised from three different parts: database, server(backend) and frontend. Blogger uses React and React bootstrap for the frontend and Axios to communicate with the REST API located in the backend. Backend uses BCrypt to hash users passwords and express to provide backend funtionality. Database works as a simple JSON-server, but it could be easily transformed to a noSQL MongoDB.

#Usage#
For each part of application (database, server, frontend) type the following commands:
--
npm install
npm start
--

then you can use the application locally at http://localhost:3000/