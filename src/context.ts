import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

export interface Context {
  prisma: PrismaClient,
  request: Request,
  response: Response,
}

const prisma = new PrismaClient()

export const createContext = async ({ req, res }: { req: Request, res: Response }) => ({
  prisma: prisma,
  request: req,
  response: res,
})