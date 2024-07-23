import bcrypt from 'bcryptjs'

export const hashedPassword = (value: string) => {
    const salt = bcrypt.genSaltSync(10)
    const newPassword = bcrypt.hashSync(value, salt)
    return newPassword
}