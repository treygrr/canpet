import { objectType } from 'nexus';

// model Device {
//     id           Int      @id @default(autoincrement())
//     createdAt    DateTime @default(now())
//     updatedAt    DateTime @updatedAt
//     name         String?  @db.VarChar(255)
//     User         User     @relation(fields: [userId], references: [id])
//     userId       Int
//     userAgent    String?  @db.VarChar(1000)
//     publicKey    String?  @db.VarChar(5000)
//     privateKey   String?  @db.VarChar(5000)
//     ipAddress    String?  @db.VarChar(255)
//     refreshToken String?  @unique
//   }

export const UserDevice = objectType({
    name: 'UserDevice',
    definition(t) {
        t.nonNull.field('id', { type: 'Int' });
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.nonNull.field('updatedAt', { type: 'DateTime' });
        t.string('name');
        t.int('userId');
        t.string('userAgent');
        t.string('publicKey');
        t.string('privateKey');
        t.string('ipAddress');
        t.field('refreshToken', { type: 'String' });
    },
});