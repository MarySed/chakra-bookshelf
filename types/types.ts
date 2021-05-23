import { Prisma } from '@prisma/client';

export type UserEmailType = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
};

const bookshelfWithBooks = Prisma.validator<Prisma.BookshelfArgs>()({
  include: {
    books: {
      include: {
        author: true,
      },
    },
  },
});

export type BookshelfWithBooks = Prisma.BookshelfGetPayload<typeof bookshelfWithBooks>;
