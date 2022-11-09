const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
  
      me: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },
    },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const profile = await User.create({ username, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const profile = await Profile.findOne({ email });
  
        if (!profile) {
          throw new AuthenticationError('No profile with this email found!');
        }
  
        const correctPw = await profile.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(profile);
        return { token, profile };
      },
  
    //   addSkill: async (parent, { profileId, skill }) => {
    //     return Profile.findOneAndUpdate(
    //       { _id: profileId },
    //       {
    //         $addToSet: { skills: skill },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   },
      removeProfile: async (parent, { profileId }) => {
        return Profile.findOneAndDelete({ _id: profileId });
      },
      removeSkill: async (parent, { profileId, skill }) => {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          { $pull: { skills: skill } },
          { new: true }
        );
      },
    },
  };
  
  module.exports = resolvers;
  