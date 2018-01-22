let mainImage = document.createElement('div');
let img = document.createElement('img');

let imgTags = [];

let maxWidth, maxHeight;
let origin;

let weiboOrigin = 'https://weibo.com';
function init() {
  origin = window.location.origin;

  maxWidth = document.body.clientWidth - 15;
  maxHeight = window.innerHeight - 15;

  mainImage.className = 'big-image-main';
  mainImage.appendChild(img);
  document.body.appendChild(mainImage);

  img.src = 'http://';
  img.style.maxHeight = maxHeight + 5 + 'px';

  setInterval(findImages, 1000);
}

function findImages() {
  let images = document.getElementsByTagName('img');

  if (images.length > imgTags.length) {
    images = Array.apply(null, images);
    images = images.filter(v => imgTags.indexOf(v) === -1);
    addSomeListeners(images);
    imgTags.push(...images);
  }
}

function addSomeListeners(images) {
  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('mouseover', bigImage);
    images[i].addEventListener('mousemove', mouseMove);
    images[i].addEventListener('mouseout', hideImage);
  }
}

function bigImage(e) {
  let imageSrc = e.target.src;

  if (origin === weiboOrigin) {
    let srcArr = imageSrc.split('/');
    srcArr[3] = 'mw690';
    imageSrc = srcArr.join('/');
  }

  img.src = imageSrc;
  setMainImageLocation(e.clientX, e.clientY);
  mainImage.style.display = 'block';
}

function mouseMove(e) {
  setMainImageLocation(e.clientX, e.clientY);
}

function setMainImageLocation(x, y) {
  let imgWidth = img.width;
  let imgHeight = img.height;

  if (x + imgWidth > maxWidth) {
    if (imgWidth < maxWidth) {
      x = x - imgWidth < 0 ? maxWidth - imgWidth : x - imgWidth;
    } else {
      x = 0;
    }
  }

  if (y + imgHeight > maxHeight) {
    if (imgHeight < maxHeight) {
      y = y - imgHeight < 0 ? maxHeight - imgHeight : y - imgHeight;
    } else {
      y = -5;
    }
  }

  mainImage.style.left = x + 10 + 'px';
  mainImage.style.top = y + 10 + 'px';
}

function hideImage() {
  mainImage.style.display = 'none';
}

window.onload = init;
