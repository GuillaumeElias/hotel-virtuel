const random = (max) => {
  return Math.floor(Math.random() * max);
};

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { random, randomBetween };
