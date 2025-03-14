import express, { Router } from 'express'
import userRoutes from './routes/user.js'
import productRoutes from './routes/product.js'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { SDatabase } from './database/SDatabase.js'
import { ErrorHandler } from './error_handling/ErrorHandler.js'
import router from './routes/user.js'
import { ECommerceApiError } from './error_handling/error_types/ECommerceApiError.js'

process.on('uncaughtException', error => {
  console.log('Uncaught Exception detected!')
  ErrorHandler.getInstance().handleErrors(error)
})

process.on('unhandledRejection', reason => {
  console.log('Unhandled Promise Rejection detected!')
  ErrorHandler.getInstance().handleErrors(reason)
})

async function main() {
  const app = express()
  dotenv.config()

  app.use(express.json())

  app.use(cors())
  app.use(express.urlencoded({ extended: true }))

  // All users routes
  app.use('/users', userRoutes)

  // All products routes
  app.use('/products', productRoutes)

  ErrorHandler.getInstance().registerMiddlerWareErrorHandler(app)

  // Connect to database
  SDatabase.getInstance().connectToDatabase(process.env.DB, process.env.PORT || 4000, app)
  console.log(app._router.stack.map(layer => layer.name))
}

main()
