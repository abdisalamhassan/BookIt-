const express = require('express');
const path = require('path');
const db = require('./config/connection');
// import  typeDefs and resolvers
const { typeDefs,resolvers } = require('./schemas');
const routes = require('./routes');
//import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// create Apollo Server and pass schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const start = async ()=> { 
  
  await server.start();

// incorporate middleWare server with express server
server.applyMiddleware({app});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});

};

start();
