import express from "express";
import mongoose from 'mongoose'
import cors from 'cors'
import authRoute from './route/auth.js'
import productRoute from './route/product.js'
import userRoute from './route/user.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8800

const app = express()


const dbConnect = async () =>{
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://admin:admin@ecommerce.z348uss.mongodb.net/Ecommerce?retryWrites=true&w=majority")
        console.log("Database is connected to MongoDB")

    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

//middleware

const corstOptions = {
  origin: 'https://mern-tua-ebenta.onrender.com',
  credentials: true,
  optionSuccessStatus: true
}

app.use(cors(corstOptions))
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)
app.use('/api/user', userRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(PORT, () =>{
    dbConnect()
    console.log(`Connected to Backend on PORT: http://localhost:${PORT}`)
})