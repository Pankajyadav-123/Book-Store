import express from"express";
import {addBook,listbooks,removeBook,singleBook } from "../controllers/bookController.js";
import upload from "../middleware/multer.js";
import adminAuth  from "../middleware/adminAuth.js";


const bookRouter = express.Router();

bookRouter.post("/add",adminAuth, upload.fields([{ name: "image1" }, { name: "image2" }, { name: "image3" }, { name: "image4" }]), addBook);
bookRouter.get("/list", listbooks);
bookRouter.post("/single",singleBook);
bookRouter.post("/remove",adminAuth,removeBook);


export default bookRouter;