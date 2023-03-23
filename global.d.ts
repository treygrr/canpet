interface DecodedJwtBearerToken {
  id: number
  deviceId: number
  publicKey: string
  tokenProvider: string
}

declare module '*.ts' {
  const value: any
  export default value
}

declare interface ImportMeta {
  glob: (pattern: string) => Promise<{ [key: string]: string }>
}
