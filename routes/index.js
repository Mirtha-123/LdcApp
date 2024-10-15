// routes.js
const express = require('express');
const router = express.Router();
const { obtenerDatos, agregarDatos } = require('../services/qr_service');
const { borrarRegistros } = require('../services/sheets');
const { scanear, leerDia } = require('../services/flutter');
require('dotenv').config();

const QRCode = require('qrcode');
const { subirImagen } = require('../services/firebase')
const spreadsheetId = "1_Bv8a4G1_F6fbYgv5R1ahsbw9yFArfNyU0vrixmRUvM";






async function generarQR(param) {
    const myVariable = param + '-' + process.env.PROYECTO;
    const qrImageUrl = await QRCode.toDataURL(myVariable, {
        width: 1000, // Cambia el tamaño aquí (en píxeles)
        margin: 1   // Margen opcional
    });
    const publicUrl = await subirImagen(qrImageUrl);
    return publicUrl;
}


router.get("/", async (req, res) => {
    try {
        const fila = await obtenerDatos(spreadsheetId, "GeneradorQR!C6:C");

        console.log(fila);
        for (const [index, element] of fila.entries()) {
            const qrCode = await generarQR(element[0]);
            await agregarDatos(spreadsheetId, `GeneradorQR!F${6 + index}:G`, [[`=IMAGE("${qrCode}")`, qrCode]]);
        }

        res.send(fila);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

router.get("/borrar", async (req, res) => {
    try {
        const range = "Asistencia!A2:D"
        const respuesta = await borrarRegistros(spreadsheetId, range);
        res.send(respuesta)
    } catch (error) {
        console.error('Error /borrar:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

router.post("/scan", async (req, res) => {
    try {
        console.log('peticion de scaneo')
        const respuesta = await scanear(spreadsheetId,req);
        console.log('---------RESP:',respuesta)
        res.send(respuesta)
    } catch (error) {
        console.error('Error /borrar:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});


router.get("/day", async (req, res) => {
    try {
        console.log('peticion del dia')
        const respuesta = await leerDia(spreadsheetId);
        console.log('---------RESP:',respuesta)
        res.send(respuesta)
    } catch (error) {
        console.error('Error /day:', error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;
