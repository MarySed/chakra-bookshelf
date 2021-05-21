import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';

// TODO: Finish this
// POST request to create user bio
const handle: NextApiHandler = async (req, res) => {
  const { content } = req.body;

  const session = await getSession({ req });

  if (!session) {
    return;
  }

  const newBio = await prisma.bio.create({
    data: {
      content: content,
      user: {
        connect: {
          //@ts-expect-error TODO: fix this up I guess
          id: Number(session?.user.id),
        },
      },
    },
  });

  res.json(newBio);
};

export default handle;
