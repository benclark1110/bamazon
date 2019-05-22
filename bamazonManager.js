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
start();
});

function start() {
inquirer
    .prompt({
    name: "managerOptions",
    type: "list",
    message: "Select a managerial option from below:",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(function(answer) {
    switch(answer.managerOptions) {
        case "View Products for Sale":
            viewProductsForSale();
            break;
        case "View Low Inventory":
            viewLowInventory();
            break;
        case "Add to Inventory":
            addToInventory();
            break;
        case "Add New Product":
            addNewProduct();
            break;
        }
    });
}


function viewProductsForSale() {
    console.log("All products for sale...");
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        };
    });
};

function viewLowInventory() {
    console.log("Low inventory below...");
    connection.query("SELECT * FROM bamazon.products where stock_quantity < 5", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
    });
};

function addToInventory() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "whatItem",
            message: "What itemID would you like to add inventory to?"
        },
        {
          type: "input",
          name: "howMuch",
          message: "How much inventory would you like to add?"
      }
    ])
  .then(function(answers) {
    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, 
        [
            {
              stock_quantity: ((stock_quantity + answers.howMuch))
            },
            {
              item_id: answers.whatItem
            }
          ], function(err, res) {
        console.log("done");
    }); 
  });
};

function addNewProduct() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "whatItem",
            message: "What is the name of the product"
        },
        {
          type: "input",
          name: "department",
          message: "What is the department?"
        },
        {
            type: "input",
            name: "price",
            message: "What is the price?"
        },
        {
          type: "input",
          name: "howMuch",
          message: "How much inventory would you like to add?"
        }
    ])
    .then(function(answers) {
        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answers.whatItem + "', '" + answers.department + "', " + answers.price + ", " + answers.howMuch + ")";
        connection.query(query, function(err, res) {
        }); 
    });
};