import { MAX_BOOK_FETCH } from 'constants/constants';

export const isRouteActive = (targetPathname: string, currentRouteName: string) => {
  return targetPathname === currentRouteName;
};

export const createBio = async ({ content }: { content: string }) => {
  const body = { content };
  try {
    await fetch('/api/bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

export const editBio = async ({ content, id }: { content: string; id: number }) => {
  const body = { content };
  try {
    await fetch(`/api/bio/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

export const addBookToShelf = async ({ bookId, shelfId }: { bookId?: string | string[]; shelfId?: string }) => {
  if (!bookId || !shelfId) {
    return;
  }

  const body = { bookId, shelfId };

  try {
    await fetch(`/api/bookshelves/${shelfId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

type OpenLibResponse = { docs: []; numFound: number; num_found: number; start: number };

export const constructCoverString = ({ id }: { id: number | string }) => {
  if (!id) {
    return undefined;
  }

  const result = `http://covers.openlibrary.org/b/id/${id}.jpg`;

  return result;
};

export const searchOpenLib = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<OpenLibResponse | undefined> => {
  // Simple solution to build query for openlibrary. Not actually necessary lol.
  const formattedQuery = query.split(' ').join('+');

  try {
    const res = await fetch(`http://openlibrary.org/search.json?q=${formattedQuery}&limit=10&page=${page}`);

    if (res.ok) {
      const data = await res.json();

      // The array of docs returned by openlib is what we want
      return data.docs;
    }
  } catch (error) {
    console.error(error);
  }

  return;
};

// Maybe update this into a custom hook at some point
// Make more flexible to support no cursor provided as well
export const fetchCursoredBooks = async ({
  cursorParams,
  limit = MAX_BOOK_FETCH,
}: {
  cursorParams?: number;
  limit?: number;
}) => {
  const results = await fetch(`/api/books?cursorParams=${cursorParams}&limit=${limit}`);

  if (results.ok) {
    const data = await results.json();

    const finalResult = data[data.length - 1];
    const newCursor = finalResult?.id;

    return {
      newCursor: newCursor,
      books: data,
      error: undefined,
    };
  }

  return {
    newCursor: cursorParams,
    books: undefined,
    error: true,
  };
};
