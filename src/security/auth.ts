import jwt from 'jsonwebtoken'
import { UserDto } from '../dto/UserDto.js'
import { NextFunction, Request, Response } from 'express'
import { InvalidInputError } from '../error_handling/error_types/InvalidInputError.js'

const secret = process.env.SECRET || 'eCommerceAPI'

// Token creation

export function createAccessToken(user: UserDto) {
  // The data will be recieved from the registration form
  // When the user logs in, a token will be created with the user's information
  const data = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  }

  // Generates a JSON web token using the jwt
  return jwt.sign(data, secret, {
    expiresIn: 60 // seconds
  })
}

// Token verification

export function verify(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization

  if (typeof token === 'undefined' || token === undefined || token === null) {
    throw new InvalidInputError("Bearer token is empty");
  }

  console.log(`\n\nToken of user is >> ${token}\n\n\n`)
  // Bearer
  token = token.slice(7, token.length)

  // Validate the token using the "verify" method decrypting the token using the secret code
  return jwt.verify(token, secret, (err, data) => {
    // If JWT is not valid but exists
    if (err) {
      throw new InvalidInputError("Token is not valid");
    }

    // Allows the application to proceed with the next middleware function/ callback function in our route
    next()
  })
}

// Token decryption
export function decode(token: string): UserDto {
  if (typeof token === 'undefined' || token === undefined || token === null) {
    throw new InvalidInputError("Bearer token is empty");
  }

  token = token.slice(7, token.length)

  jwt.verify(token, secret,  (err, data) => {
    // If JWT is not valid but exists
    if (err) {
      throw new InvalidInputError("Token is not valid");
    }
  })

  return jwt.decode(token, { complete: true }).payload as UserDto
}
