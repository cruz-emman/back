import express from 'express'
import { getUsers,getSingleUser } from '../controller/user.js'
const router = express.Router()

router.get('/', getUsers)
router.get('/find/:id', getSingleUser)

export default router