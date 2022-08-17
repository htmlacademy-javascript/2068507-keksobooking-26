const getRandomPositiveNumber = (min, max, fraction) => { //рандомное число с количеством 0 после запятой
  const isRangeCorrect = min <= max && min >= 0;
  if(isRangeCorrect){
    const rand = Math.random() * (max - min) + min;
    return rand.toFixed(fraction);
  // } else {
  //   console.log('передан неверный диапазон');
  }
};

const getRandomValue = (value) => { //рандомный элемент из объекта
  const random = Math.floor(Math.random() * value.length);
  return value[random];
};

export {getRandomPositiveNumber, getRandomValue};
