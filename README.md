# BOOKSHELF: Next.js, Prisma, and Chakra-UI

Ideally this is going to be a small Goodreads-like personal bookshelf/social media app.
Currently using NextAuth with Github for user registration.


## TODO List:

### Bugs 💀

- [x] ~~User email not captured properly on user registration~~
- [ ] Loading & debounce not implmented properly on some buttons

### Features ⚒️

- [ ] Post edit functionality `/api/posts/:id`
- [x] ~~User profile page `/api/users/:id`~~
- [x] ~~Create bookshelves `/api/create/bookshelves
- [x] ~~Show specific bookshelf `/api/bookshelves/:id`
- [ ] List user bookshelves `/api/users/:id/bookshelves`
- [ ] List and manage personal bookshelves `/api/manage/bookshelves` (maybe not lol)
- [ ] Book page `/api/books/:id`
- [ ] Book reviews (connected to user & book in question)

### UI Improvements ✨

- [x] ~~User profile card on Timeline right side if logged in~~
- [x] ~~Login card on Timeline right side if not logged in~~
- [x] ~~Dark mode implementation~~
- [x] ~~Display user profile image on navbar avatar~~
- [ ] Create dropdown for navbar avatar with link to user page and user reviews list
- [ ] Make things less uggo in general lol 😭
- [x] ~~Is purple the right choice? 🤔~~ Answer: No
- [ ] Update color scheme to match Goodreads

### Dev Experience (My Experience) Improvements 💻

- [ ] Replace fetch with axios. I miss axios. 😔 (why am I too lazy to add one tiny package... we shall never know)

### Stretch Goals 😴

- [ ] User validation with Google or Facebook
- [ ] Integration with Goodreads API to get book ratings
- [ ] Integration with Goodreads API to get list of books or something I dunno
- [ ] Allow users to rate books
- [ ] Deploy to Vercel

---

## How To

- Git clone this repo.
- Create a .env file with the following `.env` variables:
  - [ ] DATABASE_URL
  - [ ] GITHUB_ID
  - [ ] GITHUB_SECRET
  - [ ] NEXTAUTH_URL

This repo has no migrations due to compatibility issues between Prisma and Heroku Postgres databases. If you develop this with a local postgres db, you can create migrations lol.

To fill in the `GITHUB` env variables, you'll need to create an OAuth application on Github. You can do that quite easily through the developer settings in your Github account.

You can follow an online guide like [this one](https://blog.logrocket.com/how-to-use-nextauth-js-for-client-side-authentication-in-next-js/s) to figure out how to fill in both `GITHUB` and `NEXTAUTH` .env variables.

### Commmands

After connecting your `.env` file to your database, you can set things up as follows:

```bash
> yarn prisma generate
> yarn prisma db push
> yarn prisma db seed --preview-feature
```

If everything works, you should see the data from the `prisma/seed.ts` file reflected in your database.

Prisma has a super convenient UI to work with your database. Check it out with:

```bash
> yarn prisma studio
```

## Thanks 🎀

Thank you to these users for helping out!

[Imadatyatalah](https://github.com/imadatyatalah)
