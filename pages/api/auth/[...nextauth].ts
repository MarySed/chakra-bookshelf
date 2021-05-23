import { NextApiHandler } from 'next';
import NextAuth, { Account, Session, User } from 'next-auth';
import Adapters from 'next-auth/adapters';
import Providers from 'next-auth/providers';
import prisma from 'lib/prisma';
import { UserEmailType } from 'types/types';

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
    signIn: async (user: User, account: Account) => {
      // Thank you to https://github.com/imadatyatalah for helping me figure out how to properly capture user emails

      // Uh, for some reason account and user are returning as undefined now, which did not used to happen as of a few hours ago...

      if (user?.email) {
        return true;
      }

      const res = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `token ${account.accessToken}`,
        },
      });

      const userEmails: UserEmailType[] = await res.json();

      if (!userEmails || !userEmails.length) {
        return true;
      }

      const primaryEmail = userEmails.find((email) => email.primary);

      const preventDuplicate = await prisma.user.findUnique({
        where: {
          email: primaryEmail?.email,
        },
      });

      if (preventDuplicate) {
        return true;
      }

      user.email = primaryEmail?.email ?? '';
      return true;
    },

    session: async (session: Session, user: User) => {
      return Promise.resolve({
        ...session,
        user,
      });
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
