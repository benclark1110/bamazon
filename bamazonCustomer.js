var mysql = require("mysql");

var cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

var inquirer = require('inquirer');

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAllItems();
});

function showAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);

      // console.table([
      //   {
      //     productName: res[i].product_name,
      //     Department: res[i].department_name,
      //     Price: res[i].price,
      //     Quantity: res[i].stock_quantity
      //   }
      // ]);
    }
    askConsumer();
  });
}

function askConsumer() {
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
      console.log("Maybe next time...");
      endSimulation();
    } 

    var query = "SELECT * FROM products WHERE ?"
    connection.query(query, { product_name: requestedID }, function(err, res) {

      var howManyItems = parseInt(answers.howMany);
      var stockQuantity = parseInt(res[0].stock_quantity);

      if (res.length == 0){
        console.log("Item does not exist, please try again");
        endSimulation();
      };

      if (howManyItems > stockQuantity) {
        console.log("Insufficient quantity!")
        endSimulation();
      } else {
        console.log("Total order cost: $" + (howManyItems * res[0].price));        
      }
    })
    .then(function() {
      connection.query("UPDATE products SET  = ? WHERE  = ?", 
          [
            {
              stock_quantity: stockQuantity - howManyItems
            },
            {
              product_name: requestedID
            }
          ], function(err, res) {
            console.log(stockQuantity);
            console.log(howManyItems);
            console.log(requestedID);
            endSimulation();
          });
    });
  });
  });
};

function endSimulation() {
  connection.end();
  return;
};