import { AuthenticationError, UserInputError } from "apollo-server-core";
import User from "../db/model/users";
import {
  UserType,
  UserInput,
  UserLoginInput,
  UserUpdateInput,
  authorizedUser,
} from "../type/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../logger";

export const resolvers = {
  Mutation: {
    createUser: async (
      parent: any,
      args: { input: UserInput },
      context: any
    ) => {
      let { email, password, firstName, lastName, username } = args.input;
      password = await bcrypt.hash(password, 12);
      const isEmailExist = await User.findOne({ email });
      const userObj = new User({
        firstName,
        lastName,
        email,
        password,
        username,
      });
      if (isEmailExist === null) {
        return await userObj.save();
      }
      logger.error("This email already exsits");
      throw new UserInputError("This email already exsits");
    },

    login: async (
      parent: any,
      args: { input: UserLoginInput },
      context: { SECRET: string }
    ) => {
      const { email, password } = args.input;
      const user = await User.findOne({ email });

      if (!user) {
        logger.error("The email does not exist");
        throw new UserInputError("The email does not exist");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        logger.error("Incorrect Password");
        throw new UserInputError("Incorrect Password");
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        context.SECRET,
        { expiresIn: "1h" }
      );
      logger.info(`The Token has been created: ${token}`);
      return token;
    },

    updateUser: async (
      parent: any,
      args: { input: UserUpdateInput },
      context: { user: authorizedUser }
    ) => {
      const { user } = context;
      if (user) {
        const { email, firstName, lastName } = args.input;
        const filter = { email: email };
        const update = { firstName: firstName, lastName: lastName };
        logger.info("Data Updated Successfully");
        return await User.findOneAndUpdate(filter, update);
      } else {
        logger.error("you must be logged in");
        throw new AuthenticationError("you must be logged in");
      }
    },
  },

  Query: {
    getUser: async (parent: any, args: { email: String }, context: any) => {
      const { email } = args;
      const userData = await User.findOne({ email });
      if (userData === null) {
        logger.error("The email does not exist");
        throw new UserInputError("The email does not exist");
      }
      return userData;
    },

    getUsersByFiltering: async (
      parent: any,
      args: { filter: UserType },
      context: any
    ) => {
      const { filter } = args;
      let query = User.find();
      let users: UserInput[];
      if (filter.email) {
        query.where("email").equals(filter.email);
      }
      if (filter.firstName) {
        query.where("firstName").equals(filter.firstName);
      }
      users = await User.find(query);
      if (users.length === 0) {
        logger.warn("No Users Found based on your Filters");
      }
      logger.info(`The users Founds: ${users}`);
      return users;
    },
  },
};
