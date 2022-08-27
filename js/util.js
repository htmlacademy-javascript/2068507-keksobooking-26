const getRandomPositiveNumber = (min, max, fraction) => { //рандомное число с количеством 0 после запятой
  const isRangeCorrect = min <= max && min >= 0;
  if(isRangeCorrect){
    const rand = Math.random() * (max - min) + min;
    return rand.toFixed(fraction);
  // } else {
  //   console.log('передан неверный диапазон');//доделать
  }
};

const getRandomValue = (value) => { //рандомный элемент из объекта
  const random = Math.floor(Math.random() * value.length);
  return value[random];
};

//функция для деактивации форм
const addDisableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
};
const removeDisableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
};

export {getRandomPositiveNumber, getRandomValue, addDisableForm, removeDisableForm};

