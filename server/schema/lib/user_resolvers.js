const User = require("../../models/User");


const {createToken} = require("../../auth")


const user_resolvers = {
    Query: {
      authenticate(_, __, context) {
        return context.user
      }
    },
  
    Mutation: {
      async register(_, args, context) {
        try {
          const user = await User.create(args);
  
          const token = await createToken(user._id);
  
          // Authenticate/Log In User
          context.res.cookie('token', token, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true
          });
  
          return user;
        } catch (err) {
          let message;
  
          if (err.code === 11000) {
            message = 'That email address is already in use.'
          } else {
            message = err.message
          }
  
          throw new Error(message);
        }
      },
  
      async login(_, args, context) {
        const { email, password } = args;
  
        const user = await User.findOne({ email }).populate();
  
        if (!user) throw new Error('User with that email address not found.');
  
        const pass_id_valid = await user.validatePass(password);
  
        if (!pass_id_valid) throw new Error('Password is invalid.');
  
        const token = await createToken(user._id);
  
        context.res.cookie('token', token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.PORT ? true : false
        });
  
        return user;
      },
  
      logout(_, __, context) {
        context.res.clearCookie('token')
  
        return 'User logged out successfully!'
      }
    }
  }
  
  module.exports = user_resolvers;