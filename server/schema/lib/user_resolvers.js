const {User, Donations, Category} = require("../../models");
const {createToken} = require("../../auth")


const user_resolvers = {
    Query: {
      authenticate(_, __, context) {
        return context.user
      },

      async category(_, args){
        const {name} = args; //destructure category name passed as arg
        const donations = await Donations.find({category: name});
        return donations;
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
        console.log(args)
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
        console.log(user)
        return user;
      },

      async createDonation(_, args){
        try {
          console.log('args',args)
          // create new donation with converted categoryIds
          const donation = await Donations.create(args);
          
            // categoryIds.filter((categoryId) => categoryId !== null),
            // user: context.user._id //assigning authenticated user ID
          // converting category name to correspond with ObjectsId
          
          const user = await User.findById(args.id)
          // console.log(user)
          user.donations.push(donation._id)
          user.save()
          // const categoryIds = await Promise.all(
            // category.map(async(categoryName) => {
              
            //   return category ? category._id : null;
            // })
          // )
          return donation;
        } catch (err) {
          throw new Error(err.message)
        }
      },
  
      logout(_, __, context) {
        context.res.clearCookie('token')
  
        return 'User logged out successfully!'
      }
    }
  }
  
  module.exports = user_resolvers;