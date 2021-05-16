import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

// POST request to create a new Post (lol)
// Still not totally sure why Nextjs needs this to be an index.ts file, while DELETE or GET operations happen in [id].ts. I think it must be because the id is nonexistent before you actually create the post.
const handle: NextApiHandler = async (req, res) => {
  const { title, content } = req.body;

  // Confirm if user is logged in:
  const session = await getSession({ req });

  console.log(session?.user?.email, 'email for user');

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

  res.json(newPost);
};

export default handle;
