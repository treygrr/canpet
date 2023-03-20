import { PrismaClient } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'

export interface Context {
  prisma: PrismaClient,
  req: IncomingMessage,
  res: ServerResponse
}

const prisma = new PrismaClient()

export const createContext = async ({ req, res }: { req: IncomingMessage, res: ServerResponse }) => ({
  prisma: prisma,
  req: req,
  res: res
})