import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

// POST request to create a new Post (lol)
const handle: NextApiHandler = async (req, res) => {
  const { title, content } = req.body;

  // Confirm if user is logged in:
  const session = await getSession({ req });

  if (!session) {
    return;
  }

  const newPost = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: {
        connect: {
          email: session?.user?.email ?? '',
        },
      },
    },
  });

  return res.json(newPost);
};

export default handle;
