const { User } = require('../database');
const { updatezod } = require('../type');

const bcrypt = require ('bcryptjs');

//update password
async function updatepass (req,res) {

    const person = req.body; 
//validate the input
    const safeperson = updatezod.safeParse(person); 
    if (!safeperson.success) {
        res.json ({msg : 'Invalid Input'});
        return; 
    }  
    console.log(person); 
//check if the user exists
    const userExists = await user.findOne ({ username : person.username});
  
    if (!userExists) {
        res.json ({msg : 'Invalid Username or Password'});
        return ; 
    } 
    console.log (person.newpassword); 

//hash the new password
    const hashed = await bcrypt.hash (person.newpassword, 10);

    await user.updateOne (  
        {username : person.username} ,  // this is the query
        {password : hashed} // this is the update
        );

        res.json ({msg : 'Password Updated Successfully'});
}

module.exports = updatepass;