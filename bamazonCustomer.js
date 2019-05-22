var mysql = require("mysql");
var cTable = require('console.table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showAllItems();
});

function showAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);

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
            message: "How many would you like to buy??"
        }
  ])
  .then(function(answers) {
    
    if (answers.howMany == 0) {
      console.log("Maybe next time...");
      endSimulation();
    } 

    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, { item_id: requestedID }, function(err, res) {

      var howManyItems = parseInt(answers.howMany);
      var stockQuantity = parseInt(res[0].stock_quantity);

      if (res.length == 0){
        console.log("Item does not exist, please try again");
        endSimulation();
      };

      if (howManyItems > stockQuantity) {
        console.log("Insufficient quantity!");
        endSimulation();
      } else {
        console.log("Total order cost: $" + (howManyItems * res[0].price));
        testing(howManyItems, stockQuantity, requestedID);      
      }
    });  
  });
  
  });
}; 

function testing(howManyItems, stockQuantity, requestedID) {
  var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, 
      [
        {
          stock_quantity: (stockQuantity - howManyItems)
        },
        {
          item_id: requestedID
        }
      ], function(err, res) {
        endSimulation();
      });
}

function endSimulation() {
  connection.end();
  return;
};
