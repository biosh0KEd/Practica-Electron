//Todos los eventos que ejecutal el proceso de renderizado
const  ipcRenderer = require('electron').ipcRenderer
const {
  addImagesEvents,
  selectFirstImage,
  clearImages,
  loadImages
} = require('./images-ui')
const path = require('path')
const { saveImage } = require('./filters')

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

  ipcRenderer.on('save-image', (event, file) => {
    saveImage(file, (err) => {
      if (err) showDialog('error', 'Platzipics', err.message)

      showDialog('info', 'Platzipics', 'La imagen fue guardada')
    })
  })
}

//Enviamos un evento al proceso principal
//Al presionar el boton para abrir la carpeta para cargar imagenes
function openDirectory() {
  ipcRenderer.send('open-directory')
}
//Al presionar el boton de guardar imagen
function saveFile() {
  const image = document.getElementById('image-displayed').dataset.original
  const ext = path.extname(image)
  ipcRenderer.send('open-save-dialog', ext)
}

//Enviamos el evento para mostrar un dialogo al proceso principal
function showDialog (type, title, msg) {
  ipcRenderer.send('show-dialog', {type: type, title: title, message: msg})
}

//Exportamos el modulo con las funciones para usarlo en otro archivo
module.exports = {
  setIpc,
  openDirectory,
  saveFile
}