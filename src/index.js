'use strict'

// Instaciando los objetos app y BrowserWindow
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const electronDebug = require('electron-debug')
const fs = require('fs')
const isImage = require('is-image')
const path = require('path')
const filesize = require('filesize')

let win 

// console.dir(app)

// Imprimiendo un mensaje en consola antes de salir
app.on('before-quit', () => {
  // Funcion a realizar
  console.log('Saliendo...')
})

// Ejecutando ordenes cuando la aplicación esta lista
app.on('ready', () => {
  // Creando una nueva ventana
  win = new BrowserWindow({
    // Propiedades de la ventana
    width: 800,
    height: 600,
    title: 'Hola mundo',
    center: true,
    maximizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Esperamos a que el contenido este listo para mostrarse y lo mostramos
  win.once('ready-to-show', () => {
    win.show()
  })

  // Detectamos si la ventana se mueve
  win.on('move', () => {
    // Obtenemos la direccion exacta de la pantalla
    const position = win.getPosition()
    console.log(`la posicion de la ventana es ${position}`)
  })

  // Detectando el cierre de la ventana para cerrar la aplicación
  win.on('closed', () => {
    win = null
    app.quit()
  })

  // Cargando en nuestra ventana un sitio externo
  win.loadURL(`file://${__dirname}/renderer/index.html`)
  electronDebug({ showDevTools: true })
})

//Es lo que haremos cuando suceda el evento open directory
ipcMain.on('open-directory', (event) => {
  //Abrimos una ventana de dialogo
  //Recibe el objeto y las propiedades
  dialog.showOpenDialog(win, {
    title: 'Seleccione la nueva ubicacion',
    buttonLabel: 'Abrir ubicacion',
    properties: ['openDirectory']
  },
  (dir) => {
    //Sera un arreglo donde almacenaremos cada una de las imagenes
    const images = []
    //Preguntamos si dir es valido
    if (dir) {
      //Lo leemos con el modulo fs
      //Recibe un arreglo con el directorio 0 y un callback
      //con un error y los archivos
      fs.readdir(dir[0], function (err, files) {
        //si ocurre un error lo lanzamos
        if (err) throw err

        //Recorremos el arreglo de archivos files que sacamos de la ubicacion
        for(var i = 0, length1 = files.length; i < length1; i++) {
          //Metemos al arreglo images los archivos que son imagenes
          if (isImage(files[i])){
            //Obtenermos la ruta de la imagen, con el directorio y el archivo
            let imageFile = path.join(dir[0], files[i])
            //Obtenemos el tamaño de la imagen con el modulo filesize
            //Obtenemos los stats que es informacion del archivo
            let stats = fs.statSync(imageFile)
            let size = filesize(stats.size, {round: 0})
            //Y metemos un objeto con los datos que nos interezan al arreglo
            images.push({filename: files[i], src: `file://${imageFile}`, size: size});
          }
        }
        //Enviamos las imagenes al proceso de renderizado
        //Indicamos el evento al que se lo vamos a mandar
        //Y el argumento que enviaremos
        event.sender.send('load-images', images)
      })
    }
  }
  )
})

//Al suceder el evento en el primer parametro
//Ejecutamos la funcion del segundo con el evento en si como parametro
ipcMain.on('open-save-dialog', (event, ext) => {
  //Mostramos la ventana para guardar la imagen
  dialog.showSaveDialog(win, {
    title: 'Guardar imagen modificada',
    buttonLabel: 'Guardar imagen',
    //Definimos que tipo de archivo el usuario puede guardar
    filters: [{
      name: 'Images',
      extensions: [ext.substr(1)]
    }]
  }, (file => {
    if (file) {
      //Hacemos un evento para cuminicarle al proceso de renderizado que se va a guardar la imagen
      event.sender.send('save-image', file)
    }
  }))
})