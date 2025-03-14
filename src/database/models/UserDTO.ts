export class UserDTO {
    email: string
    password: string
    isAdmin: boolean
    firstName: string
    lastName: string
    contactNo: string
    iat: number
    id: number
}

// try to make sense out of this for why deocde is only giving 4 members
export class UserDTOForDecode {
    id: string
    email: string
    isAdmin: boolean
    iat: number
}