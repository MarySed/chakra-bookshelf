import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const { bio, userId } = req.body;

  const updatedBio = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      bio: bio,
    },
  });

  res.json(updatedBio);
};

export default handle;
