import { Router } from 'express'
import { registerUser, loginUser, setAdmin } from '../controllers/user.js'
import { checkout, getMyOrders, getAllOrders } from '../controllers/order.js'
import { verify, decode } from '../security/auth.js'
import { ECommerceApiError } from '../error_handling/error_types/ECommerceApiError.js'
import { requestWrapper } from '../util/util.js'

const router = Router()

// Register user
router.post('/register', requestWrapper((req, res) => {
  registerUser(req.body).then(resultFromController => {
    res.send(resultFromController)
  })
}))

// Login suer
router.post('/login', requestWrapper((req, res) => {
  loginUser(req.body).then(resultFromController => {
    res.send(resultFromController)
  })
})
)

// Set user to admin or not
router.put('/:userId/setAsAdmin', verify, requestWrapper((req, res) => {
  const userData = decode(req.headers.authorization)

  setAdmin(req.params.userId, userData.isAdmin).then(resultFromController => {
    res.send(resultFromController)
  })
}))

// Create order for user
router.post('/checkout', verify, (req, res) => {
  const userData = decode(req.headers.authorization)
  checkout(req.body, userData).then(resultFromController => {
    res.send(resultFromController)
  })
})

// Get all orders associated with authenticated user
router.get('/myOrders', verify, (req, res) => {
  const userData = decode(req.headers.authorization)
  getMyOrders(userData).then(resultFromController => {
    res.send(resultFromController)
  })
})

// Get all orders
router.get('/orders', verify, (req, res) => {
  const userData = decode(req.headers.authorization)
  getAllOrders(userData).then(resultFromController => {
    res.send(resultFromController)
  })
})

export default router
