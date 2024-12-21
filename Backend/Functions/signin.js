const { User } = require('../database');
const jwt = require ('jsonwebtoken'); 

const JWT_SECRET_KEY = require('../config');


const jwtpassword = JWT_SECRET_KEY;
const bycrypt = require ('bcryptjs'); 

// Generate JWT token
function Generatejwt (person) {

 return jwt.sign ({ username : person.username}, jwtpassword);  
  
}
// Sign in function
async function signin (req,res) {

    const person = req.body; 

    const userExists = await user.findOne ({ username : person.username}); 

    if (!userExists) {
        res.json ({msg : 'Invalid Username or Password'});
        return ; 
    }

    console.log('Person password:', person.password); // Plain text password
    console.log('Stored hash:', userExists.password); // Hashed password from DB

    const passwordMatch = await bycrypt.compare (person.password, userExists.password);
    // Check if the password matches the hashed password
    if (!passwordMatch) {
        res.json ({msg : 'Invalid Password'});
        return; 
    } 
    
    const jwt = Generatejwt (person);

    res.json ({msg : 'User Logged In Successfully', jwt : jwt});
}

module.exports = signin;