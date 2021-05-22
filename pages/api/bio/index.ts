import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/client';

// TODO: Finish this
// POST request to create user bio
const handle: NextApiHandler = async (req, res) => {
  const { content } = req.body;

  console.log(content, 'CONTENT IS GETTING PASSED WHEN CREATING');

  const session = await getSession({ req });

  if (!session || !content) {
    return;
  }

  const newBio = await prisma.bio.create({
    data: {
      content: content,
      user: {
        connect: {
          //@ts-expect-error Will fix this soon
          id: Number(session?.user?.id),
        },
      },
    },
  });

  res.json(newBio);
};

export default handle;
