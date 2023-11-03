// Este código fue subido a producción con el fin de poder diferenciar 
// cuáles misiones están bien geolocalizada o mal geolocalizadas según los agentes… 
// pero hace ya dos días que no nos está actualizando la información, el equipo entiende que debe 
// haber algo que está ocasionando que el sistema se rompa y no pueda subir la información al “malgeo.txt” por ende 
// tenemos que encontrar la solución a este problema.

// Se requiere solucionar el problema para que si se carguen todas las malgeo, 
// el total de misiones que deberían quedar en malgeo.txt es = 39
// Y también se pide poder modificar el código para que en caso de que el error 
// pase en algún futuro, se actualice el txt ignorando el error, y se avise por consola donde está el error

const fs = require('fs');

function saveBadGeoMissions(missionsConMalgeo) {
    // Save the list of missions with malgeo to a txt file
    fs.writeFileSync('missions_con_malgeo.txt', missionsConMalgeo.join('\n'));
}

function readDatabase(myDatabase) {
    let missionsAlreadyPrinted = [];
    let missionsWithBadGeo = [];

    fs.readFile(myDatabase, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
    
        let rows = data.split('\n');
        // skip the header
        rows.shift();
        for (let row of rows){
            let fields = row.split('#');
            let id = fields[0];
            let completedDateTime = fields[1];
            let shopperEmail = fields[2];
            let campaignId = fields[3];
            let commune = fields[4];
            let country = fields[5];
            let headquarterStreet = fields[6];
            let client = fields[7];

            var malgeo = parseInt(fields[8][1]);
    
            if (malgeo == 1 && !missionsAlreadyPrinted.includes(id)) {
                console.log(`Mision que hizo ${shopperEmail} no esta en su lugar, por favor revisar en https://rocketpin.com/admin/missions#/show_mission/${id}`);
                missionsWithBadGeo.push(id);
            } else if (malgeo == 0 && !missionsAlreadyPrinted.includes(id)) {
                console.log(`La mision ${id} esta bien geolocalizada`);
            }
            missionsAlreadyPrinted.push(id);
        }
        saveBadGeoMissions(missionsWithBadGeo);
    });
    
    
}

readDatabase('my_data.csv');
