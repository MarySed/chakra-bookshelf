export const isRouteActive = (targetPathname: string, currentRouteName: string) => {
  return targetPathname === currentRouteName;
};

export const createBio = async ({ content }: { content: string }) => {
  try {
    const body = { content };

    console.log('create bio being called');

    await fetch('/api/bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};

export const editBio = async ({ content, userId }: { content: string; userId: number }) => {
  try {
    const body = { content };

    console.log(body, 'body');

    await fetch(`/api/bio/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};
