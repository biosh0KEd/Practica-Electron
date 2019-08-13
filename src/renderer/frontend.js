window.addEventListener('load', () => {
  addImagesEvents()
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

  document.getElementById('image-displayed').src = node.querySelector('img').src
}
