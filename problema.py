# Este código fue subido a producción con el fin de poder diferenciar 
# cuáles misiones están bien geolocalizada o mal geolocalizadas según los agentes… 
# pero hace ya dos días que no nos está actualizando la información, el equipo entiende que debe 
# haber algo que está ocasionando que el sistema se rompa y no pueda subir la información al “malgeo.txt” por ende 
# tenemos que encontrar la solución a este problema.

# Se requiere solucionar el problema para que si se carguen todas las malgeo, 
# el total de misiones que deberían quedar en malgeo.txt es = 39
# Y también se pide poder modificar el código para que en caso de que el error 
# pase en algún futuro, se actualice el txt ignorando el error, y se avise por consola donde está el error

import csv

def save_malgeo(missions_con_malgeo):
    # save the list of missions with malgeo in a txt
    with open('missions_con_malgeo.txt', 'w') as f:
        for item in missions_con_malgeo:
            f.write("%s\n" % item)

def read_database(myDatabase):
    missions_already_printed = []
    missions_con_malgeo = []
    with open(myDatabase, 'r') as f:

        reader = csv.reader(f, delimiter='#')
        # skip the header
        next(reader)

        for row in reader:
            for field in row:
                id = row[0]
                completed_date_time = row[1]
                shopper_email = row[2]
                campain_id = row[3]
                commune = row[4]
                country = row[5]
                headquarter_street = row[6]
                client = row[7]
                malgeo = int(row[8])

                if malgeo == 1 and id not in missions_already_printed:
                    print(f'Mision que hizo {shopper_email} no esta en su lugar, por favor revisar en https://rocketpin.com/admin/missions#/show_mission/{id}')
                    missions_con_malgeo.append(id)
                elif malgeo == 0 and id not in missions_already_printed:
                    print(f'La mision {id} esta bien geolocalizada')
                missions_already_printed.append(id)
        
        save_malgeo(missions_con_malgeo)

read_database('my_data.csv')


