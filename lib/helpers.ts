'use server'

import bcrypt from 'bcryptjs'
import prisma from './prisma'
export const hashedPassword = async (value: string) => {
    const salt = bcrypt.genSaltSync(10)
    const newPassword = bcrypt.hashSync(value, salt)
    return newPassword
}

export const comparePassword = async (currentPassword: string, hashPassword: string) => {
    const isPasswordCorrect = bcrypt.compareSync(currentPassword, hashPassword)
    return isPasswordCorrect
}

export const isEmailExisting = async (email: string) => {
    const gottenEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return !!!gottenEmail
}
export const isEmailNotExisting = async (email: string) => {
    const gottenEmail = await prisma.user.findUnique({
        where:{
            email
        }
    })
    return !!gottenEmail
}

