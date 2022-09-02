import axios from "axios";

export const fetchAll = async () => {
  const sent = await axios.get(
    "https://pcfy.redberryinternship.ge/api/laptops?token=2d20b5112d1d7d3d395f0a3671c78b62"
  );

  return sent.data;
};

export const fetchSignle = async (id: string) => {
  const sent = await axios.get(
    `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=2d20b5112d1d7d3d395f0a3671c78b62`
  );

  return sent.data;
};
