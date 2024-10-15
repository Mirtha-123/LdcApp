// auth.js
const { google } = require('googleapis');

async function obtenerCliente() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "./credential.json", // Ajusta la ruta si es necesario
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        return await auth.getClient();
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        throw error;
    }
}

module.exports = { obtenerCliente };
