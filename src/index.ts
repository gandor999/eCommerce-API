import express from 'express'
import * as dotenv from 'dotenv'
import { Database } from './database/Database.js'
import { ErrorHandler } from './error_handling/ErrorHandler.js'
import { initServer } from './util/util.js'

async function main() {
  ErrorHandler.getInstance().listenToUnhandledErrors()
  const app = express()
  dotenv.config()

  initServer(app)

  // Connect to database
  Database.getInstance().connectToDatabase(process.env.DB, process.env.PORT || 4000, app)
  //   console.log(app._router.stack.map(layer => layer.name))
}

main()
