//Todos los eventos que ejecutal el proceso de renderizado
const  ipcRenderer = require('electron').ipcRenderer

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

//Duplicado, pendiente de cambiar
//---------------------------------------------------------------------------------------------------------------
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

    // Seleccionamos la imagen que esta siendo mostrada y cambia su fuente por la imagen seleccionada
    document.getElementById('image-displayed').src = node.querySelector('img').src
  } else {
    document.getElementById('image-displayed').src = ''
  }
}

function selectFirstImage() {
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}
//---------------------------------------------------------------------------------------------------------------



//configura todos los eventos a escuchar del lado del proceso de renderizado
function setIpc() { 
  ipcRenderer.on('load-images', (event, images) => {
    //Limpiamos la lista de imagenes
    clearImages()
    //E insertamos la lista nueva de imagenes
    loadImages(images)
    addImagesEvents()
    selectFirstImage()
  })

}

function openDirectory() {
  ipcRenderer.send('open-directory')
}


module.exports = {
  setIpc,
  openDirectory
}