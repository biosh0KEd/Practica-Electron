const url = require('url')
const path = require('path')

window.addEventListener('load', () => {
  addImagesEvents()
  searchImageEvent()
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

function changeImage(node) {
  // Seleccionamos el li que tiene la clase selected y removemos esta clase
  document.querySelector('li.selected').classList.remove('selected')

  // Agregamos la clase selected al li que recivimos por parametro que sera el que esta presionado acualmente
  node.classList.add('selected');

  // Seleccionamos la imagen que esta siendo mostrada y cambia su fuente por la imagen seleccionada
  document.getElementById('image-displayed').src = node.querySelector('img').src
}

function searchImageEvent() {
  
  const searchBox = document.getElementById('search-box')

  searchBox.addEventListener('keyup', () => {
    const regex = new RegExp(this.value.toLowerCase(), 'gi')

    if (this.value.length > 0) {
      const thumbs = document.querySelectorAll('li.list-group-item img')

      for (let i = 0, length2 = thumbs.length; i < length2; i++) {
        const fileURL = url.parse(thumbs[i].src)
        const fuleName = path.basename(fileURL.pathname)

        if (fileName.match(regex)) {
          thumbs[i].parentNode.classList.remove('hidden')
        } else {
          thumbs[i].parentNode.classList.add('hidden')
        }

      }

      selectFirstImage()

    }
  })
}

function selectFirstImage() {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}