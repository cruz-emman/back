import express from 'express'
import {addProduct,getProduct} from './../controller/product.js'
import {verifyAdmin, verifyToken} from './../controller/verifyToken.js'
const router = express.Router()

router.post('/:userId', verifyAdmin, addProduct)
router.get('/', getProduct)

export default router