const url = require('url')
const path = require('path')
const applyFilter = require('./filters')


//Hacemos una funcion para agregar los eventos de seleccion y mostrado
//Para las nuevas imagenes
function addImagesEvents() {
  // Selecciona todos los li con la clase list-group-item
  const thumbs = document.querySelectorAll('li.list-group-item')

  // Por cada li añadimos un escuchador de eventos para saber cual es presionado
  for (let i = 0, length1 = thumbs.length; i <length1; i++) {

    // Al ser presionado llamamos a la funcion changeImage y le pasamos el li presionado
    thumbs[i].addEventListener('click', () => { changeImage(thumbs[i])})
  }
}

function changeImage(node) {
  if (node) {
     // Seleccionamos el li que tiene la clase selected 
    const selected = document.querySelector('li.selected')
    if (selected) {
      // Removemos el li seleccionado
      selected.classList.remove('selected')
    }

    // Agregamos la clase selected al li que recivimos por parametro que sera el que esta presionado acualmente
    node.classList.add('selected');

    const image = document.getElementById('image-displayed')
    // Seleccionamos la imagen que esta siendo mostrada y cambia su fuente por la imagen seleccionada
    image.src = node.querySelector('img').src
    //Creamos la variable original en data set para no perder la referencia a la imagen cuando apliquemos un filtro
    image.dataset.original = image.src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

function selectFirstImage() {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}


function selectEvent() {
  const select = document.getElementById('filters')

  select.addEventListener('change', function(){
    applyFilter(this.value, document.getElementById('image-displayed'))
  })    
}

function searchImageEvent() {
  
  //Hacemos un selector de la caja de busqueda
  const searchBox = document.getElementById('search-box')

  //Escuchamos el evento de una tecla para saber cuando se escribio en la caja de busqueda
  searchBox.addEventListener('keyup', function() {
    //Tomamos el texto de la caja de busqueda y lo pasamos a minusculas
    const regex = new RegExp(this.value.toLowerCase(), 'gi')

    //Seleccionamos todas los objetos de la lista de imagenes
    const thumbs = document.querySelectorAll('li.list-group-item img')

    //Evaluamos si el valor de la caja de busqueda es mayor a 0 
    if (this.value.length > 0) {
      //Iteramos sobre los archivos de la lista
      for (let i = 0, length2 = thumbs.length; i < length2; i++) {
        //Convertimos su fuente en una URL
        const fileURL = url.parse(thumbs[i].src)
        //Conseguimos el nombre del archivo
        const fileName = path.basename(fileURL.pathname)

        //Evaluamos si lo de la caja de busqueda coincide con el nombre del archivo
        if (fileName.match(regex)) {
          //Mostramos el archivo en la lista
          thumbs[i].parentNode.classList.remove('hidden')
          //Hacemos que el primer archivo en aparecer sea el seleccionado por defecto
          selectFirstImage()
        } else {
          //Ocultamos el archivo en la lista
          thumbs[i].parentNode.classList.add('hidden')
        }
      }
    } else {
      //No hay nada en la caja de busqueda por lo que dejamos de ocultar todos los archivos
      for (let i = 0, length2 = thumbs.length; i < length2; i++) {
        thumbs[i].parentNode.classList.remove('hidden')
      }
      selectFirstImage()
    }
  })
}

//funcion para quitar las imagenes actuales y poner las que traemos de los directorios
function clearImages() {
  //Seleccionamos las imagenes viejas
  const oldImages = document.querySelectorAll('li.list-group-item')
  for (let i = 0, length1 = oldImages.length; i < length1; i++) {
    //Y eliminamos todos los nodos de la lista
    oldImages[i].parentNode.removeChild(oldImages[i])
  }
}

//Esta funcion por medio de una plantilla agregara las imagenes al listado actual
function loadImages(images) {
  // Traemos la lista de imagenes donde agregaremos las demas
  const imagesList = document.querySelector('ul.list-group')
  for (let i = 0, length1 = images.length; i < length1; i++) {    
    //Plantilla
    const node = ` <li class="list-group-item">
                    <img class="media-object pull-left" src="${images[i].src}" height="32">
                    <div class="media-body">
                      <strong>${images[i].filename}</strong>
                      <p>${images[i].size}</p>
                    </div>
                  </li>`
    //Insertamos la imagen, con este metodo del API del DOM
    //Se manda la pocision donde se insertara y lo que se insertara
    imagesList.insertAdjacentHTML('beforeend', node)
  }     
}

module.exports = {
  addImagesEvents: addImagesEvents,
  changeImage: changeImage,
  selectFirstImage: selectFirstImage,
  selectEvent: selectEvent,
  searchImageEvent: searchImageEvent,
  clearImages: clearImages,
  loadImages: loadImages
}