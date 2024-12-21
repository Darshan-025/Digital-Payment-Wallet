const {user} = require ('../database');
const {userzod} = require ('../type');
const {account} = require ('../database');  
const bycrypt = require ('bcryptjs');


const JWT_SECRET_KEY = require('../config');
const jwt = require ('jsonwebtoken');


const jwtpassword = JWT_SECRET_KEY;
// Generate JWT token
function Generatejwt (person) {

 return  jwt.sign ({ username : person.username}, jwtpassword); 
      
   }
async function signUp (req,res) {

const person = req.body; 
// Validate the input
const safeperson = userzod.safeParse(person);
if (!safeperson.success) {
    res.json ({msg : 'Invalid Input'});
    return; 

}
// Check if the user already exists
    await user.create ({

        firstname : person.firstname,
        lastname : person.lastname,
        username : person.username,
        password : await bycrypt.hash (person.password, 10), 
    }) 

   const jwt =  Generatejwt (person); 

    const username = person.username; 
// Create an account for the user
    account.create ({
        username : username,
        balance : 1 + Math.floor(Math.random() * 1000)
    })

    res.json ({msg : 'User Created Successfully' , jwt : jwt});
}

module.exports = signUp;