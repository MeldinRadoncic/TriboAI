import { PrismaClient } from '@prisma/client'




const prisma_db = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma_db


export default prisma_db