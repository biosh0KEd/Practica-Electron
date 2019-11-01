//Todos los eventos que ejecutal el proceso de renderizado
const  ipcRenderer = require('electron').ipcRenderer
const {
  addImagesEvents,
  changeImage,
  selectFirstImage,
  clearImages,
  loadImages
} = require('./images-ui')

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