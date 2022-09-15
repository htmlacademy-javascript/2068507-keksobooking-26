const FILE_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_SIZE = '70px';

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const defaultAvatarPreview = previewAvatar.src;

fileChooserAvatar.addEventListener('change', ()=>{
  const file = fileChooserAvatar.files[0];
  const matches = FILE_TYPE.some((it) => {
    const fileName = file.name.toLowerCase();
    return fileName.endsWith(it);
  });
  if(matches){
    previewAvatar.src = URL.createObjectURL(file);
  }
});

const photoChooser = document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const imgElement = document.createElement('img');
  imgElement.style.width = DEFAULT_SIZE;
  imgElement.style.height = DEFAULT_SIZE;
  const file = photoChooser.files[0];
  const matches = FILE_TYPE.some((it) => {
    const fileName = file.name.toLowerCase();
    return fileName.endsWith(it);
  });
  if (matches) {
    imgElement.src = URL.createObjectURL(file);
  }
  previewPhoto.appendChild(imgElement);
});
const resetLoadImg = () => {
  previewPhoto.innerHTML = '';
  previewAvatar.src = defaultAvatarPreview;
};

export {resetLoadImg};

