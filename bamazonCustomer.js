var inquirer = require('inquirer');

inquirer
  .prompt([
    {
        type: "input",
        name: "productID",
        message: "What is the ID of the product you would like to buy??"
    }
  ])
  .then(function(answers) {
    
    var requestedID = answers.productID;

    inquirer
        .prompt([
        {
            type: "input",
            name: "howMany",
            message: "How many " + requestedID +  "'s would you like to buy??"
        }
  ])
  .then(function(answers) {
    
    if (answers.howMany == 0) {
        console.log("Maybe next time...")
    } else if (answers.howMany == 1) {
    console.log("Cool, you bought " + answers.howMany + " " + requestedID);
    } else {
    console.log("Cool, you bought " + answers.howMany + " " + requestedID + "s");
    }
  });
 
  });