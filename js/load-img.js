const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_SIZE = '70px';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const defaultAvatarPreview = previewAvatar.src;

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

const photoChooser = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  // previewPhoto.innerHTML = '';
  const imgElement = document.createElement('img');

  imgElement.style.width = DEFAULT_SIZE;
  imgElement.style.height = DEFAULT_SIZE;

  const file = photoChooser.files[0];
  const matches = FILE_TYPE.some((it) => {//проверка на подходящие форматы
    const fileName = file.name.toLowerCase();//приводит к строчным буквам
    return fileName.endsWith(it);
  });//проверка окончаний
  if (matches) {
    imgElement.src = URL.createObjectURL(file);
  }
  previewPhoto.appendChild(imgElement);
});
const resetUploadImg = () => {
  previewAvatar.src = defaultAvatarPreview;
  previewPhoto.innerHTML = '';
};

export {resetUploadImg};

