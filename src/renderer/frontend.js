const { setIpc, openDirectory } = require('./ipcRendererEvents')
const {
  addImagesEvents,
  selectEvent,
  searchImageEvent
} = require('./images-ui')

window.addEventListener('load', () => {
  setIpc()
  addImagesEvents()
  searchImageEvent()
  selectEvent()
  buttonEvent('open-directory', openDirectory)
})

function buttonEvent (id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}
