const { User } = require('../database');
const users = require('../users');

//search for a user
async function searchuser(req,res) {
    
    const filter = req.body || "";
    let users;
    //search for the user
    if(!filter) {
        users = await user.find({});
    } else {
        users = await user.find({
            $or : [
                {firstname : filter},
                {lastname : filter}
            ]
        });
    }
    //return the user
    res.json({ filtered : users.map (uuser => ({
        firstname : user.firstname,
        lastname : user.lastname,
        username : user.username
    }))});
    }

    module.exports = searchuser;