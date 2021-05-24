# BOOKSHELF: Next.js, Prisma, and Chakra-UI

Ideally this is going to be a small Goodreads-like personal bookshelf/social media app.
Currently using NextAuth with Github for user registration.

## TODO List:

### Bugs 💀

- [x] ~~User email not captured properly on user registration~~
- [ ] Loading & debounce not implmented properly on some buttons

### Features ⚒️

- [ ] Post edit functionality `/posts/:id`
- [ ] Add timestamps to posts
- [x] ~~User profile page `/users/:id`~~
- [x] ~~Create bookshelves `/create/bookshelves~~ (might move depending on my plans with the overall structure)
- [x] ~~Show specific bookshelf `/bookshelves/:id`~~
- [x] ~~List user bookshelves `/users/:id/bookshelves/list`~~ (might update to remove list)
- [x] ~~Edit user bookshelves functionality `/bookshelves/:id`~~
- [x] ~~Show book page `/books/:id`~~
- [ ] Create book page
- [ ] Edit book functionality
- [ ] List books page `/books`
- [ ] Create review (I don't think this needs a page, but I might add one) `books/:id` & `/api/reviews`
- [ ] Add timestamps to reviews
- [ ] Show review page `/reviews/:id`
- [ ] Edit review functionality

### UI Improvements ✨

- [x] ~~User profile card on Timeline right side if logged in~~
- [x] ~~Login card on Timeline right side if not logged in~~
- [x] ~~Dark mode implementation~~
- [x] ~~Display user profile image on navbar avatar~~
- [x] ~~Create dropdown for navbar avatar with link to user page and user reviews list~~
- [ ] Make things less uggo in general lol 😭
- [x] ~~Is purple the right choice? 🤔~~ Answer: No
- [ ] Update color scheme to match Goodreads
- [x] ~~Create book component that looks pretty~~ (Note: it is not pretty.)
- [x] ~~Update book list styles~~
- [ ] Once reviews are made, make sure there is a difference between review & post in terms of apeparance

### Dev Experience (My Experience) Improvements 💻

- [ ] Replace fetch with axios. I miss axios. 😔 (why am I too lazy to add one tiny package... we shall never know)

### Stretch Goals 😴

- [ ] User validation with Google or Facebook maybe
- [ ] Allow users to rate books
- [ ] Add genres & Genres lists pages
- [ ] Add search functionality
- [ ] Integrate with open library api
- [ ] Pagination added to: (1) Timeline, (2) Show bookshelf page (assuming users have a lot of books), (3) Genres pages (if created)
- [ ] Deploy to Vercel

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
