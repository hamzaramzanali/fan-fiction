const { User, Adventure } = require('../models');
// for authentication functions in resolvers object
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id });
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // get All Adventures From User
        getAdventuresFromUser: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Adventure.find(params).sort({ createdAt: -1 });
        },
        // get All Adventures
        getAdventures: async () => {
            // Sort From most recent to latest
            return Adventure.find().sort({ createdAt: -1 });
        },
    },

    Mutation: {
        login: async (parent, { username, password }) => {
            // Look up the user by the provided username. Since the `username` field is unique, we know that only one person will exist with that username
            const user = await User.findOne({ username });

            // If there is no user with that username, return an Authentication error stating so
            if (!user) {
                throw new AuthenticationError('No user found with this username');
            }

            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, return an Authentication error stating so
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            // If email and password are correct, sign user into the application with a JWT
            const token = signToken(user);

            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };

        },
        addUser: async (parent, { username, email, password }) => {
            // First we create the user
            const user = await User.create({ username, email, password });

            // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created???
            const token = signToken(user);

            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
        },
        // addAdventure resolver, grabbing user input in a destructured object format in args, context will have user data from the front end
        addAdventure: async (parent, { adventureTitle, adventureBody }, context) => {
            // grabbing user info from context
            console.log(`CONTEXT USER: ${context.user.username}`);
            if (context.user) {
                // creating a new adventure
                const adventure = await Adventure.create({
                    // these fields comming from typeDefs
                    adventureTitle,
                    adventureBody,
                    // this field comming from context front end
                    adventureAuthor: context.user.username,
                });
                // updating the user model to include a new adventure
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { adventures: adventure._id } },
                    { new: true, runValidators: true }
                );

                return adventure;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Update adventure
        updateAdventure: async (parent, { adventureTitle, adventureBody, adventureId }, context) => {
            // grabbing user info from context
            if (context.user) {
                // creating a new adventure
                const adventure = await Adventure.findOneAndUpdate(
                    {_id: adventureId},
                    {// these fields comming from typeDefs
                    $set: {adventure: { adventureTitle,
                    adventureBody,
                    // this field comming from context front end
                    adventureAuthor: context.user.username}},
                });
                // updating the user model to include a new adventure
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { adventures: adventure._id } },
                    { new: true, runValidators: true }
                );

                return adventure;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // Remove adventure
        removeAdventure: async (parent, { adventureId }, context) => {
            if (context.user) {
                const adventure = await Adventure.findOneAndDelete({
                    _id: adventureId,
                    adventureAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { adventures: adventure._id } },
                    { new: true, runValidators: true }
                );

                return adventure;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}

// returning object
module.exports = resolvers;
