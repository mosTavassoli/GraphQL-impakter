import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { typeDefs } from "../graphql/typeDefs";
import { resolvers } from "../graphql/resolvers";
import { mongooseConnection } from "../db/connectionDB";
import jwt from "jsonwebtoken";
import { logger } from "./../logger/index";

const SECRET: string = "!J#2>n|0z*XX3K6nJV4wLx}*^=4Xw&";

const getUser = async (token: string) => {
  try {
    const user = jwt.verify(token, SECRET);
    return user;
  } catch (err) {
    logger.error("Token is Invalid");
  }
};

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      try {
        let user: any;
        const token = req.headers.authorization || "";
        if (token) {
          user = await getUser(token);
        }
        return {
          SECRET,
          user: user,
        };
      } catch (err) {
        logger.error("Something Wrong happens");
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  await mongooseConnection();

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
