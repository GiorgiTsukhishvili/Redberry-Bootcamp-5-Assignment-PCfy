export const fetchDefault = async (query: string) => {
  const response = await fetch(
    `https://pcfy.redberryinternship.ge/api/${query}`
  );

  const data = await response.json();

  return data;
};
