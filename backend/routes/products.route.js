import express from "express";
import { getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProduct); // to get all the products from the database

router.post("/", createProduct); // to create a product
// Whenever you wish to create a product use the post method so that you can send some data along with the request
// We make the function async to use the await keyword (refer to prdouct controller if any comment seems unrelated)

router.put("/:id", updateProduct); // to update a product, put method is to update all the fields and patch method is to update some fields

router.delete("/:id", deleteProduct);  // to delete a product


export default router;
