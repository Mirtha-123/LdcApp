// sheets.js
const { google } = require('googleapis');
const { obtenerCliente } = require('./auth');

async function obtenerDatos(spreadsheetId, range) {
    const client = await obtenerCliente();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const getRow = await googleSheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId,
        range,
    });

    return getRow.data.values;
}

async function agregarDatos(spreadsheetId, range, values) {
    const client = await obtenerCliente();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    await googleSheets.spreadsheets.values.append({
        auth: client,
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        resource: {
            values,
        },
    });
}

module.exports = { obtenerDatos, agregarDatos };
