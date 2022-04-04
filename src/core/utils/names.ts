import MaleNames from "../../res/male-names.json";

export const getRandomMaleName = () => {
  const randomIndex = Math.floor(Math.random() * MaleNames.data.length);
  return MaleNames.data[randomIndex];
};
