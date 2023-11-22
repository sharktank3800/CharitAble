const User = require("../models/User");
const {sign, verify} = require("jsonwebtoken")



async function createToken(user_id){
    try {
        // generate a token using the provided user_id and JWT_SECRET
        // Sign the user_id payload with the JWT_SECRET asyc
        const token = await sign({user_id}, process.env.JWT_SECRET);
        
        // return generated token
        return token;
    } catch (error) {
        
        // log the error message to connsole
         console.log(error.message);
    }
}


async function authenticate({req, res}){
    // Retrieve the token from the req cookies
    const token = req.cookies.token;
   console.log('this',token)
    // if there is no token available return the res Obj
    if(!token) return {res: res}
    
    //attempt to verify the token using "jsonwebtoken" and the JWT_SECRET
    try {
        // Verify the tokens validity with a maxAge of 1hr
        const data = await verify(token, process.env.JWT_SECRET, {
            maxAge: "1hr"
        })
        console.log('data',data)

        // If verification is successful, retrieve user info based on the user_id from the token
        const user = await User.findById(data.user_id);
        console.log(user)

        // Return the user data and the res Obj
        return {user: user, res: res};

    } catch (error) {
        // If token verification fails due to an invalid token res with a 401 status
        // Message inidicating that the token is invalid
        
        return {res: res}
    }
}


module.exports = {
    createToken,
    authenticate
}