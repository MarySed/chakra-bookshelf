import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  const { content } = req.body;

  if (req.method === 'PUT') {
    const updatedBio = await prisma.bio.update({
      where: {
        userId: Number(id),
      },
      data: {
        content: content,
      },
    });

    return res.json(updatedBio);
  }

  if (req.method === 'DELETE') {
    const deleteBio = await prisma.bio.delete({
      where: {
        userId: Number(id),
      },
    });

    return res.json(deleteBio);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handle;
