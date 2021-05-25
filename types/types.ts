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

const bookWithAuthor = Prisma.validator<Prisma.BookArgs>()({
  include: {
    author: true,
  },
});

export type BookWithAuthor = Prisma.BookGetPayload<typeof bookWithAuthor>;

const postWithAuthor = Prisma.validator<Prisma.PostArgs>()({
  include: {
    author: true,
  },
});

export type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>;
