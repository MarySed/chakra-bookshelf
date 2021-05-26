import { getSession } from 'next-auth/client';
import prisma from 'lib/prisma';
import { NextApiHandler } from 'next';

// POST request to create a new Bookshelf
// TODO: Will add user ability to add books to shelf oncreation soon
const handle: NextApiHandler = async (req, res) => {
  const { name, bookIds } = req.body;

  // Confirm if user is logged in:
  const session = await getSession({ req });

  if (!session) {
    return;
  }

  const defaultConnections = [{ id: 1 }, { id: 2 }];

  console.log(bookIds, 'bookIds');

  // const formattedBooks = [];

  const newBookshelf = await prisma.bookshelf.create({
    data: {
      user: {
        connect: {
          email: session.user?.email ?? '',
        },
      },
      name: name,
      // TODO: Update with books selected on the create page instead of default. Consider using connectOrCreate.
      books: {
        connect: defaultConnections,
      },
    },
  });

  return res.json(newBookshelf);
};

export default handle;
