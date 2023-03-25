import { objectType } from 'nexus'

export const Author = objectType({
    name: 'Author',
    definition(t) {
      t.nonNull.int('id')
      t.nonNull.field('createdAt', { type: 'DateTime' })
      t.nonNull.field('updatedAt', { type: 'DateTime' })
      t.string('username')
      t.string('email')
    }
  })