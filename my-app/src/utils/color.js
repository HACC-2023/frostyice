// Desc: This file contains the function to generate random color
export const getRandomColor = () => {
  const letters = "23456789AB";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
};
