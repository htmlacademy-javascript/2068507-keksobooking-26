const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form-header__preview');



//обработчик на загрузку фото (в html выставлены ограничения на загрузку форматов)
fileChooserAvatar.addEventListener('change', ()=>{
  const file = fileChooserAvatar.files[0];
  //   preview.width = '65';
  //   preview.height = '65';
  
  const matches = FILE_TYPE.some((it) => {//проверка на подходящие форматы
    const fileName = file.name.toLowerCase();//приводит к строчным буквам
    return fileName.endsWith(it);//проверка окончаний
  });
  if(matches){//если тру
    previewAvatar.src = URL.createObjectURL(file);//вписывает фото
  }
});


photoChooser.addEventListener('change', ()=>{
  const newImage = previewPhoto.createElement('img');
  newImage.classList.add('.ad-form__photo');
  newImage.width = '45';
  newImage.height = '40';
  newImage.alt = 'Фото жилья';
  // newImage.src = srcKey;
  // return newImage;
  console.log(newImage);
  
  const file = photoChooser.files[0];
  const matches = FILE_TYPE.some((it) => {//проверка на подходящие форматы
    const fileName = file.name.toLowerCase();//приводит к строчным буквам
    return fileName.endsWith(it);//проверка окончаний
  });
  if(matches){//если тру
    previewPhoto.src = URL.createObjectURL(file);//вписывает фото
  }
})