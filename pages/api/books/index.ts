import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';

// GET and POST reqs for Books
const handle: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { cursorParams, limit } = req.query;

    const results = req.query?.cursorParams
      ? await prisma.book.findMany({
          take: Number(limit),
          cursor: {
            id: Number(cursorParams),
          },
          skip: 1, // Skip cursor
          include: {
            author: true,
          },
          orderBy: {
            id: 'asc',
          },
        })
      : // This never gets hit right now, but just in case
        await prisma.book.findMany({
          take: Number(limit),
          orderBy: {
            id: 'asc',
          },
        });

    return res.json(results);
  }

  const { title, author, year, pages, language, imageLink, link, country, firstName, lastName, description } = req.body;

  const session = await getSession({ req });

  if (!session) {
    return;
  }

  const newBook = await prisma.book.create({
    data: {
      title: title,
      year: Number(year),
      pages: Number(pages),
      language: language,
      image: imageLink,
      link: link,
      country: country,
      description: description,
      author: {
        connectOrCreate: {
          where: {
            fullName: author,
          },
          create: {
            fullName: author,
            firstName: firstName ?? '',
            lastName: lastName ?? '',
          },
        },
      },
    },
  });

  return res.json(newBook);
};

export default handle;
