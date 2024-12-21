const { Account } = require('../database');

async function getbalance(req, res) {
    //get the username from the request
    const username = req.username;
    //check if the username is valid
    if(!username) {
        res.json({message : 'Invalid username'});
        return;
    }
    console.log(username);
    //get the user from the database
    const user = await Account.User.findOne({username : username});
    console.log(user);
    console.log(user.username);
    //check if the user exists
    res.json({balance : user.balance, username : user.username});
}
    
module.exports = getbalance;