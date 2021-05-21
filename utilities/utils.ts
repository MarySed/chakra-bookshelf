export const isRouteActive = (targetPathname: string, currentRouteName: string) => {
  return targetPathname === currentRouteName;
};

export const createBio = async ({ content }: { content: string }) => {
  try {
    const body = { content };

    await fetch('/api/bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};
