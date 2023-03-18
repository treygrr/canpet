import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const createAddressTypes: Prisma.AddressTypeCreateInput[] = [
    {
        name: 'Shipping',
    },
    {
        name: 'Billing',
    },
    {
        name: 'Home',
    },
    {
        name: 'Business',
    },
];

const createSpecies: Prisma.SpeciesCreateInput[] = [
    {
        name: 'Dog',
    },
    {
        name: 'Cat',
    },
    {
        name: 'Bird',
    },
    {
        name: 'Rabbit',
    },
];

const createBreed: Prisma.BreedCreateInput[] = [
    {
        name: 'Labrador',
        species: {
            connect: {
                id: 1,
            },
        },
    },
    {
        name: 'Poodle',
        species: {
            connect: {
                id: 1,
            },
        },
    },
    {
        name: 'Pug',
        species: {
          connect: {
            id: 1,
          },
        },
    },
    {
        name: 'Persian',
        species: {
          connect: {
            id: 2,
          },
        },
    },
    {
        name: 'Siamese',
        species: {
          connect: {
            id: 2,
          },
        },
    },
    {
        name: 'Budgie',
        species: {
          connect: {
            id: 3,
          },
        },
    },
    {
        name: 'Canary',
        species: {
          connect: {
            id: 3,
          },
        },
    },
    {
        name: 'Angora',
        species: {
          connect: {
            id: 4,
          },
        },
    },
    {
        name: 'Dwarf',
        species: {
          connect: {
            id: 4,
          },
        },
    },
];

const createLocation: Prisma.LocationCreateInput[] = [
    {
        name: 'San Francisco SPCA',
        authorId: 1,
        address: {
          connectOrCreate: {
            where: {
              id: 1,
            },
            create: {
              addressLine1: '123 Main St',
              addressLine2: 'Apt 1',
              city: 'San Francisco',
              state: 'CA',
              zip: '94111',
              country: 'USA',
              addressType: {
                connectOrCreate: {
                  where: {
                    id: 1,
                  },
                  create: {
                    name: 'Shipping',
                  },
                },
              }
            }
          }
        },
    },
];

const createAnimal: Prisma.AnimalCreateInput[] = [
    {
        name: 'Rex',
        age: 2,
        height: 20,
        published: true,
        weight: 10,
        species: {
            connect: {
                id: 1,
            }
        },
        location: {
          connect:{
            id: 1,
          }
        },
        animalBreed: {
          create: [
            {
              breed: {
                connect: {
                  id: 1,
                },
              },
            }
          ]
        }
    },
    // generate 10 more animals
    ...Array.from({ length: 10 }).map((_, i) => ({
        name: `Animal ${i + 1}`,
        age: 2,
        height: 20,
        published: true,
        weight: 10,
        species: {
            connect: {
                id: 1,
            }
        },
        location: {
          connect:{
            id: 1,
          }
        },
        animalBreed: {
          create: [
            {
              breed: {
                connect: {
                  id: 1,
                },
              },
            }
          ]
        }
    })),
];

const userData: Prisma.UserCreateInput[] = [
    {
        username: 'Alice',
        email: 'some@email.com',
        password: 'password',
        firstName: 'Alice',
        lastName: 'Smith',
        posts: {
            create: [
                {
                    title: 'Join us for Prisma Day 2020 in Berlin',
                    content: 'https://www.prisma.io/day/',
                    published: true,
                },
            ],
        },
        address: {
            create: [
                {
                    addressLine1: '123 Main St',
                    addressLine2: 'Apt 1',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'USA',
                    zip: '94111',
                    addressType: {
                        connect: {
                            id: 1,
                        },
                    },
                },
            ]
        },
    }
];

async function main() {
  console.log(`Start seeding ...`)
  for (const s of createSpecies) {
      const species = await prisma.species.create({
          data: s,
      })
      console.log(`Created species with id: ${species.id}`)
  }
  for (const b of createBreed) {
      const breed = await prisma.breed.create({
          data: b,
      })
      console.log(`Created breed with id: ${breed.id}`)
  }
  for (const l of createLocation) {
      const location = await prisma.location.create({
          data: l,
      })
      console.log(`Created location with id: ${location.id}`)
  }
  for (const a of createAnimal) {
      const animal = await prisma.animal.create({
          data: a,
      })
      console.log(`Created animal with id: ${animal.id}`)
  }
  for (const at of createAddressTypes) {
      const addressType = await prisma.addressType.create({
          data: at,
      })
      console.log(`Created address type with id: ${addressType.id}`)
  }
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })