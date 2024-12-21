const { Account } = require("../database");

//transaction function
async function transaction (req , res ) {

    const to = req.params.username;
    const username = req.username;

   const  {amount  } = req.body ; 

//check if the username is valid
if (!username) {
    res.json ({msg : 'Invalid Username'}); 
    return; 
}

const accounts = await account.findOne ({username : username}); 
  if(!accounts) {
      res.json ({msg : 'Invalid Username'});
      return; 
  }
//check if the recipient is valid
  const sending = await account.findOne ({username : to} ) 

   if (!sending) {
       res.json ({msg : 'Invalid Recipient'});
       return; 
   }

//check if the amount is valid
    if (accounts.balance < amount) {
         res.json ({msg : 'Insufficient Funds'});
         return; 
    }
//update the balance
    await account.updateOne ({username : username} , {$inc : {balance : -amount}});
    await account.updateOne ({username : to} , {$inc : {balance : amount}});

    res.json ({msg : 'Transaction Successful'});
}



module.exports = transaction;