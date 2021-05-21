import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import prisma from 'lib/prisma';
import { UserEmailType, UserType, ProviderAccountType, SessionType } from 'types/types';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,

  callbacks: {
    signIn: async (user: UserType, account: ProviderAccountType) => {
      // Thank you to https://github.com/imadatyatalah for helping me figure out how to properly capture user emails

      if (user.email) {
        return;
      }

      const res = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${account.accessToken}`,
        },
      });

      const userEmails: UserEmailType[] = await res.json();

      if (!userEmails || !userEmails.length) {
        return;
      }

      const primaryEmail = userEmails.find((email) => email.primary);

      const preventDuplicate = await prisma.user.findUnique({
        where: {
          email: primaryEmail?.email,
        },
      });

      if (preventDuplicate) {
        return;
      }

      //@ts-expect-error I could do an early return if primaryemail is undefined to fix this but I'm lazy
      user.email = primaryEmail?.email;
      return;
    },

    session: async (session: SessionType, user: UserType) => {
      return Promise.resolve({
        ...session,
        user,
      });
    },
  },
};

// @ts-expect-error Currently too lazy to look up the correct proptypes for all of this
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
