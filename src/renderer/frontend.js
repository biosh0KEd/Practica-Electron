const { setIpc, openDirectory, saveFile } = require('./ipcRendererEvents')
const {
  addImagesEvents,
  selectEvent,
  searchImageEvent
} = require('./images-ui')

//Escuchamos la carga de la ventana
//Y disparamos las siguientes funciones
window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImageEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
  buttonEvent('save-button', saveFile)
})

//Es una funcions que trae cualquier elemento del DOM con su id
//Y dispara una funcion que le pasemos por parametro
function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}
