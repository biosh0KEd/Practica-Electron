'use strict'

//Instaciando los objetos app y BrowserWindow
const { app, BrowserWindow } = require('electron')

//console.dir(app)

//Imprimiendo un mensaje en consola antes de salir
app.on('before-quit', () => {
    //Funcion a realizar
    console.log('Saliendo...')
})

//Ejecutando ordenes cuando la aplicación esta lista
app.on('ready', () => {
    //Creando una nueva ventana
    let win = new BrowserWindow({
        //Propiedades de la ventana
        width: 800,
        height: 600,
        title: 'Hola mundo',
        center: true,
        maximizable: false,
        show: false
    })

    //Esperamos a que el contenido este listo para mostrarse y lo mostramos
    win.once('ready-to-show', () => {
        win.show()
    })

    //Detectamos si la ventana se mueve
    win.on('move', () => {
        //Obtenemos la direccion exacta de la pantalla
        const position = win.getPosition()
        console.log(`la posicion de la ventana es ${position}`)
    })

    //Detectando el cierre de la ventana para cerrar la aplicación
    win.on('closed', () => {
        win = null
        app.quit()
    })

    //Cargando en nuestra ventana un sitio externo
    win.loadURL("https://devdocs.io/")
})

