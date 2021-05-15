import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const postId = req.query.id;

  const publishedPost = await prisma.post.update({
    where: {
      id: Number(postId),
    },
    data: {
      published: true,
    },
  });

  res.json(publishedPost);
};

export default handle;
