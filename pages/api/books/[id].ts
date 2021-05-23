import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

// DELETE request for posts
const handle: NextApiHandler = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  const post = await prisma.book.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(post);
};

export default handle;
