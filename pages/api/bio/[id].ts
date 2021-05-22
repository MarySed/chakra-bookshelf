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

    res.json(updatedBio);
    return;
  }

  if (req.method === 'DELETE') {
    console.log('DELETE CALLED');
    console.log('hmmmm');
    const deleteBio = await prisma.bio.delete({
      where: {
        userId: Number(id),
      },
    });

    res.json(deleteBio);
    return;
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handle;
