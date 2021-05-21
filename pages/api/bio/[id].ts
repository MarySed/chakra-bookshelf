import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const updatedBio = await prisma.bio.update({
      where: {
        id: Number(id),
      },
      data: {
        content: req.body.bio,
      },
    });

    res.json(updatedBio);
    return;
  }

  if (req.method === 'DELETE') {
    const deleteBio = await prisma.bio.delete({
      where: {
        id: Number(id),
      },
    });

    res.json(deleteBio);

    return;
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handle;
