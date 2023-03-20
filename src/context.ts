import { PrismaClient } from '@prisma/client'
import { IncomingMessage, OutgoingMessage } from 'http'

export interface Context {
  prisma: PrismaClient,
  req: IncomingMessage,
  res: OutgoingMessage
}

const prisma = new PrismaClient()

export const createContext = async ({ req, res }: { req: IncomingMessage, res: OutgoingMessage }) => ({
  prisma: prisma,
  req: req,
  res: res
})