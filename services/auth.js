// auth.js
const { google } = require('googleapis');

async function obtenerCliente() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credential.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    return await auth.getClient();
}

module.exports = { obtenerCliente };
