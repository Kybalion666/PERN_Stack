import { Router} from "express";
import productRouter from './productRouter.js'
import basketRouter from './basketRouter.js'
const router = new Router()

router.use('/product',productRouter)
router.use('/basket',basketRouter)

export default router