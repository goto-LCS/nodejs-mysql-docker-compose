const db = require("../db");

//Create a table for products in the database if it doesn't exist at application start
!async function createTable() {
    const tableQuery = `CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(8,2) NOT NULL,
        description VARCHAR(255))`;
   
    await db.query(tableQuery);    
}();

exports.findAll = async function () {
    const results = await db.query("SELECT * FROM products");
    return results[0];
}

exports.findOne = async function (id) {
    const result = await db.query("SELECT * FROM products WHERE id=?", id);
    return result[0];
}

exports.create = async function (name, price, description) {
    await db.query("INSERT INTO products(name, price, description) VALUES (?, ?, ?)", [name, price, description]);
}

exports.update = async function (id, name, price, description) {
    await db.query("UPDATE products SET name=?, price=?, description=? WHERE id=?",
        [name, price, description, id]);
}