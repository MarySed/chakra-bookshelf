import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'PUT') {
    if (!req.body.bookId) {
      return;
    }
    // If you are adding book to shelf from book page.
    const { bookId, shelfId } = req.body;

    const updatedBookshelf = await prisma.bookshelf.update({
      where: {
        id: Number(shelfId),
      },
      data: {
        books: {
          connect: {
            id: Number(bookId),
          },
        },
      },
    });

    return res.json(updatedBookshelf);
  }

  if (req.method === 'DELETE') {
    const deleteBookshelf = await prisma.bookshelf.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json(deleteBookshelf);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handle;
