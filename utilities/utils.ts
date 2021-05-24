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
