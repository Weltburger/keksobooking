'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#similar-pin-template').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#similar-pin-template').content.querySelector('.map__card');

var pinsMap = document.querySelector('.map__pins');
var templatePin = document.querySelector('#similar-pin-template').content.querySelector('.setup-similar-item');

var blockBefore = document.querySelector('.map__filters-container');

var ads = [];
var avatarNum = ['01', '02', '03', '04', '05', '06', '07', '08'];
var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", 
        "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", 
        "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var type = ['palace', 'flat', 'house','bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

Array.prototype.sample = function(){
    return this[Math.floor(Math.random() * this.length)];
}

var shuff = (arr) => {
    arr = arr.sort(function(){
        return Math.random() - 0.5;
      });
      return arr;
}

var selfRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createArr = ([...source], maxLength) => Array.from(
    { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
    () => source.splice(Math.random() * source.length | 0, 1)[0]
  );

for (var i = 0; i < 8; i++) {
    shuff(avatarNum);
    var newPhotos = shuff(photos);
    var x = selfRandom(100, 800);
    var y = selfRandom(130, 630);

    ads.push(
        {
            'author': {
                'avatar': `img/avatars/user${avatarNum.pop()}.png` 
            },
            'offer': {
                'title': title.sample(),
                'address': `${x}, ${y}`,
                'price': selfRandom(1000, 1000000),
                'type': type.sample(),
                'rooms': selfRandom(1, 5),
                'guests': selfRandom(2, 10),
                'checkin': checkin.sample(),
                'checkout': checkout.sample(),
                'features': createArr(features, features.length),
                'description': '',
                'photos': newPhotos
            },
            'location': {
                'x': x,
                'y': y
            }
        }
    );
}
console.log(ads);

var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    
    pinElement.setAttribute('style', `left: ${pin.location.x}px; top: ${pin.location.y}px;`);
    pinElement.querySelector('.avtr').setAttribute('src', `${pin.author.avatar}`);
    pinElement.querySelector('.avtr').setAttribute('alt', `${pin.offer.title}`);

    return pinElement;
  }

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
}
pinsMap.appendChild(fragment);

var fragment = document.createDocumentFragment();
var newElement = cardTemplate.cloneNode(true);

newElement.querySelector('.popup__title').textContent = ads[0].offer.title;
newElement.querySelector('.popup__text--address').textContent = ads[0].offer.address;
newElement.querySelector('.popup__text--price').textContent = `${ads[0].offer.price}₽/ночь`;
if (ads[0].offer.type == 'flat') {
    newElement.querySelector('.popup__type').textContent = 'Квартира';
} else if (ads[0].offer.type == 'bungalo') {
    newElement.querySelector('.popup__type').textContent = 'Бунгало';
} else if (ads[0].offer.type == 'house') {
    newElement.querySelector('.popup__type').textContent = 'Дом';
} else {
    newElement.querySelector('.popup__type').textContent = 'Дворец';
}

newElement.querySelector('.popup__text--capacity').textContent = `${ads[0].offer.rooms} комнаты для ${ads[0].offer.guests} гостей`;
newElement.querySelector('.popup__text--time').textContent = `Заезд после ${ads[0].offer.checkin}, выезд до ${ads[0].offer.checkout}`;

var featuresList = newElement.querySelector('.popup__features');
for (var i = 0; i < ads[0].offer.features.length; i++) {
    featuresList.innerHTML = featuresList.innerHTML + `<li class="feature feature--${ads[0].offer.features[i]}"></li>`;
}

newElement.querySelector('.popup__description').textContent = ads[0].offer.description;

var photosList = newElement.querySelector('.popup__photos');
for (var i = 0; i < ads[0].offer.photos.length; i++) {
    photosList.innerHTML = photosList.innerHTML + `<li><img src="${ads[0].offer.photos[i]}"></li>`;
}

newElement.querySelector('.popup__avatar').textContent = ads[0].author.avatar;

blockBefore.before(newElement);
