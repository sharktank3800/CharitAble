const User = require("../models/User");
const {sign, verify} = require("jsonwebtoken")



async function createToken(user_id){
    try {
        // generate a token using the provided user_id and JWT_SECRET
        // Sign the user_id payload with the JWT_SECRET asyc
        const token = await sign({user_id}, process.env.JWT_SECRET);
        console.log('token',token)
        // return generated token
        return token;
    } catch (error) {
        // if error occurs uring token generation
        // log the error message to connsole

        console.log(error.message);
    }
}


async function authenticate({req, res}){
    // rretrieve the token from the req cookies
    const token = req.cookies.token;
   
    // if there is no token available return the res Obj
    if(!token) return {res: res}
    
    //attempt to verify the token using "jsonwebtoken" and the JWT_SECRET
    try {
        // verify the tokens validity with a maxAge of 1hr
        const data = await verify(token, process.env.JWT_SECRET, {
            maxAge: "1hr"
        })
        console.log('data',data)

        // if verification is successful, retrieve user info based on the user_id from the token
        const user = await User.findById(data.user._id);

        // return the user data and the res Obj
        return {user: user, res: res};

    } catch (error) {
        // if token verification fails due to an invalid token res with a 401 status
        // message inidicating that the token is invalid
        // console.log('hi')
        return {res: res}
    }
}


module.exports = {
    createToken,
    authenticate
}