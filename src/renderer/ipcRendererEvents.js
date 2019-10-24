//Todos los eventos que ejecutal el proceso de renderizado
const  ipcRenderer = require('electron').ipcRenderer

//configura todos los eventos a escuchar del lado del proceso de renderizado
function setIpc() { 
  ipcRenderer.on('pong', (event, arg) => {
    console.log(`pong recibido - ${arg}`)
  })

}

function openDirectory() {
  ipcRenderer.send('open-directory')
}


module.exports = {
  setIpc,
  openDirectory
}