require("dotenv").config();
const express = require("express");
const productModel = require("./models/product");

const app = express();
app.use(express.json());

app.get("/product", async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.post("/product", async (req, res) => {
    try {
        const {name, price, description} = req.body;
        await productModel.create(name, price, description);
        res.status(200).json({message: "product created"});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const product = await productModel.findOne(req.params.id);
        if (product != null) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({message: "product does not exist"});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.put("/product/:id", async (req, res) => {
    try {
        const {name, price, description} = req.body;
        await productModel.update(req.params.id, name, price, description);
        res.status(200).json({message: "product updated"});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
});

app.listen(process.env.NODE_DOCKER_PORT, () => {
    console.log(`application running on port ${process.env.NODE_DOCKER_PORT}`)
});