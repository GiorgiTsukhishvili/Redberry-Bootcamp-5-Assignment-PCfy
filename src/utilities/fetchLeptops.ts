export const fetchAll = async () => {
  const sent = await fetch(
    "https://pcfy.redberryinternship.ge/api/laptops?token=544e56b4370da5df7a347dfddac7040a"
  );

  const data = await sent.json();

  return data;
};
