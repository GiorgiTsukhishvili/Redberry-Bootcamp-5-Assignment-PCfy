export const fetchAll = async () => {
  const sent = await fetch(
    "https://pcfy.redberryinternship.ge/api/laptops?token=2d20b5112d1d7d3d395f0a3671c78b62"
  );

  const data = await sent.json();

  return data;
};

export const fetchSignle = async (id: string) => {
  const sent = await fetch(
    `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=2d20b5112d1d7d3d395f0a3671c78b62`
  );

  const data = await sent.json();

  return data;
};
