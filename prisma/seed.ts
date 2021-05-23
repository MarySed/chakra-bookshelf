import { books } from './books_two';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: `alice@prisma.io`,
      name: 'Alice',
      posts: {
        create: {
          title: 'Test title test title',
          content: 'Test content test content',
          published: true,
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'blah@blah.com' },
    update: {},
    create: {
      email: `blah@blah.com`,
      name: 'Blah',
      posts: {
        create: {
          title: 'Test title two',
          content: 'Test content two',
          published: true,
        },
      },
    },
  });

  for (const item of books) {
    await prisma.author.upsert({
      where: {
        fullName: item.author,
      },
      update: {
        fullName: item.author,
        books: {
          create: [
            {
              title: item.title,
              link: item.link,
              image: item.image ?? '',
            },
          ],
        },
      },
      create: {
        fullName: item.author,
        books: {
          create: [
            {
              title: item.title,
              link: item.link,
              image: item.image ?? '',
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
  });
