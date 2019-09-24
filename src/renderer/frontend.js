const url = require('url')
const path = require('path')
const applyFilter = require('./filters')

window.addEventListener('load', () => {
  addImagesEvents()
  searchImageEvent()
  selectEvent()
})


function addImagesEvents() {
  // Selecciona todos los li con la clase list-group-item
  const thumbs = document.querySelectorAll('li.list-group-item')

  // Por cada li añadimos un escuchador de eventos para saber cual es presionado
  for (let i = 0, length1 = thumbs.length; i <length1; i++) {

    // Al ser presionado llamamos a la funcion changeImage y le pasamos el li presionado
    thumbs[i].addEventListener('click', () => { changeImage(thumbs[i])})
  }
}

function selectEvent() {
  const select = document.getElementById('filters')

  select.addEventListener('change', function(){
    applyFilter(this.value, document.getElementById('image-displayed'))
  })    
}

function changeImage(node) {
  if (node) {
     // Seleccionamos el li que tiene la clase selected y removemos esta clase
  document.querySelector('li.selected').classList.remove('selected')

  // Agregamos la clase selected al li que recivimos por parametro que sera el que esta presionado acualmente
  node.classList.add('selected');

  // Seleccionamos la imagen que esta siendo mostrada y cambia su fuente por la imagen seleccionada
  document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
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

function selectFirstImage() {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}