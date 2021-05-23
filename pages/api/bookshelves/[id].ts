import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const { content } = req.body;
  // console.log(content, 'content');

  if (req.method === 'PUT') {
    const updatedBookshelf = await prisma.bookshelf.update({
      where: {
        id: Number(id),
      },
      data: {
        books: {
          //@ts-expect-error TODO: So I think push was added in Prisma 2.20, which I have... Going to check why Books is not recognizing push
          push: [content],
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
