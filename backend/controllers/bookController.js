import { v2 as cloudinary } from 'cloudinary';

import bookModel from '../models/bookModel.js';

const addBook = async (req, res) => {
    try {

        const { title, description, price, language, category, author, bestseller } = req.body;

       const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )


        const bookData = {
            title,
            description,
            price:Number(price),
            language,
            category,
            author,
            bestseller:bestseller === 'true'? true : false,
            image: imagesUrl
        }

        console.log(bookData);

        const book = new bookModel(bookData);
        await book.save();

        res.json({success:true,message:"Book added successfully"})



    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}


const listbooks = async (req, res) => {
    try{
        const books = await bookModel.find({});
        res.json({success:true,books})

    }catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

const removeBook = async (req,res)=>{
    try{
        await bookModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Book removed successfully"})

    }catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

const singleBook = async (req,res)=>{
    try{
        const {bookId} = req.body;
        const book = await bookModel.findById(bookId);
        res.json({success:true,book})

    }catch(error){
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export {addBook,listbooks,removeBook,singleBook};