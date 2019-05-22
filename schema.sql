DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("computer", "electronics", 260, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("bike", "toys", 40, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iphone", "electronics", 215, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("guitar", "music", 93, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("piano", "music", 115, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("spiderman", "toys", 12, 43);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("tv", "electronics", 180, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("speaker", "electronics", 62, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("basketball", "toys", 6, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("book", "reading", 11, 3);

SELECT * FROM bamazon.products;
