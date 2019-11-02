const fs = require('fs')

function applyFilter(filter, currentImage) {
  let imgObj = new Image() //eslint-disable-line
  imgObj.src = currentImage.src

  filterous.importImage(imgObj, {}) //eslint-disable-line
    .applyInstaFilter(filter)
    .renderHtml(currentImage)
}

//Funcion para filtrar la direccion de la imagen con filtro
//Y solo obtener lo que esta despues de Base64,
function saveImage (fileName) {
  let fileSrc = document.getElementById('image-displayed').src
  //Filtramos la informacion de la cabecera con una expresion regular
  fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+;base64,)/, '')
  fs.writeFile(fileName, fileSrc, 'base64', (err) => {
    if (err) console.log(err)
  })
}

module.exports = {
  applyFilter,
  saveImage
}