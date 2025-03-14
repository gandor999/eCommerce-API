import jwt from 'jsonwebtoken'
import { UserDTO } from '../dto/UserDto.js'
import { NextFunction, Request, Response } from 'express'
import { InternalServerError } from '../error_handling/error_types/InternalServerError.js'
import { UserExistsError } from '../error_handling/error_types/UserExistsError.js'

const secret = process.env.SECRET || 'eCommerceAPI'

// Token creation

export function createAccessToken(user: UserDTO) {
  // The data will be recieved from the registration form
  // When the user logs in, a token will be created with the user's information
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  }

  // Generates a JSON web token using the jwt
  return jwt.sign(data, secret, {})
}

// Token verification

export function verify(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization

  if (typeof token === 'undefined' || token === undefined || token === null) {
    throw new UserExistsError("User does not exist");
  }

  console.log(`\n\nToken of user is >> ${token}\n\n\n`)
  // Bearer
  token = token.slice(7, token.length)

  // Validate the token using the "verify" method decrypting the token using the secret code
  return jwt.verify(token, secret, (err, data) => {
    // If JWT is not valid but exists
    if (err) {
      throw new InternalServerError("Token creation error");
    }

    // Allows the application to proceed with the next middleware function/ callback function in our route
    next()
  })
}

// Token decryption
export function decode(token): void | UserDTO {
  if (typeof token !== 'undefined') {
    token = token.slice(7, token.length)

    return jwt.verify(token, secret, (err, data) => {
      if (err) {
        return null
      } else {
        return jwt.decode(token, { complete: true }).payload
      }
    })
  } else {
    return null
  }
}
