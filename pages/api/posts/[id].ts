import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const postId = req.query.id;

  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    res.json(post);
  } else {
    throw new Error("Sorry you can't delete posts with this HTTP method...");
  }
};

export default handle;
