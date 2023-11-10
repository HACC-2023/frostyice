import json
import requests

from datetime import datetime, timedelta
from random import choice
from faker import Faker

fake = Faker()

locations = json.loads('''[{"longitude":-157.8466303529656,"latitude":21.283826470316896},{"longitude":-157.84578963082603,"latitude":21.28523084606738},{"longitude":-157.84606295509542,"latitude":21.284602998365898},{"longitude":-157.8480064494299,"latitude":21.283826470316896},{"longitude":-157.8467542993824,"latitude":21.283364908402888},{"longitude":-157.8455683156117,"latitude":21.28398104669965},{"longitude":-157.86156245355912,"latitude":21.291852967730122},{"longitude":-157.86510462549606,"latitude":21.293434792724014},{"longitude":-157.86832978963707,"latitude":21.29633718679179},{"longitude":-157.79239890410463,"latitude":21.256935712129945},{"longitude":-157.79348953626592,"latitude":21.256368321717574},{"longitude":-157.79403301731531,"latitude":21.256085580351908},{"longitude":-157.79344815994796,"latitude":21.256085580351908},{"longitude":-157.79162183903372,"latitude":21.256652974005547},{"longitude":-157.70560765823447,"latitude":21.34778406367208},{"longitude":-157.70629872548642,"latitude":21.349351985031802},{"longitude":-157.70681839255357,"latitude":21.349351985031802},{"longitude":-157.70786883499116,"latitude":21.350148507631914},{"longitude":-157.70683239013607,"latitude":21.351359374395926},{"longitude":-157.706302201475,"latitude":21.350348969560827},{"longitude":-157.7052628214535,"latitude":21.348368155198074},{"longitude":-157.7047533547222,"latitude":21.347397221413004},{"longitude":-157.70425449865343,"latitude":21.346059101081167},{"longitude":-157.69079580420683,"latitude":21.271264242107833},{"longitude":-157.6544922650666,"latitude":21.299676669837567},{"longitude":-158.1454482996759,"latitude":21.37983369052317},{"longitude":-156.44010123831157,"latitude":20.674436270354803},{"longitude":-156.43658250031538,"latitude":20.665903308180674},{"longitude":-156.4294983715532,"latitude":20.603919260942803},{"longitude":-156.40188319178893,"latitude":20.58830090793336},{"longitude":-156.410681308077,"latitude":20.601208725970736},{"longitude":-156.38994651224144,"latitude":20.590117913898425},{"longitude":-156.3913049215684,"latitude":20.58379681844673},{"longitude":-156.13320568272405,"latitude":20.63603996605876},{"longitude":-156.1220468239934,"latitude":20.644904595419163},{"longitude":-156.12475169721236,"latitude":20.63603996605876},{"longitude":-156.14991152853335,"latitude":20.63429241242197},{"longitude":-156.1405447547137,"latitude":20.633421758023076},{"longitude":-155.99659120259903,"latitude":20.76860900849573},{"longitude":-155.68360699081387,"latitude":18.96572126380083},{"longitude":-155.72151380822316,"latitude":19.000583180759108},{"longitude":-155.70296648785938,"latitude":18.98779298131157},{"longitude":-155.63967327812205,"latitude":19.043072236880477},{"longitude":-155.6160772951436,"latitude":19.000583180759108},{"longitude":-155.63837623248764,"latitude":18.962599997246485},{"longitude":-155.6562347488835,"latitude":18.944036606566854},{"longitude":-155.6760493196514,"latitude":18.947111103421904},{"longitude":-155.67999830424705,"latitude":18.931815258557265},{"longitude":-155.66367578074684,"latitude":18.934859157013165},{"longitude":-154.82729305462883,"latitude":19.486460022528206},{"longitude":-154.83504490286333,"latitude":19.51465413012089},{"longitude":-154.8132610262997,"latitude":19.489020546741557},{"longitude":-154.82672523861055,"latitude":19.473539642090543},{"longitude":-154.8601679726994,"latitude":19.44979464641689},{"longitude":-159.44778913220756,"latitude":21.873054212502865},{"longitude":-159.44534785503896,"latitude":21.8716596362364},{"longitude":-159.44227882038663,"latitude":21.87445855566793},{"longitude":-159.43730434749295,"latitude":21.877773919866925},{"longitude":-159.45216585769435,"latitude":21.874928858232735},{"longitude":-159.44624730912443,"latitude":21.87729695599998},{"longitude":-159.4076422902369,"latitude":21.898345037460587},{"longitude":-159.40043564500746,"latitude":21.905855451256983},{"longitude":-159.39133536216752,"latitude":21.915338756158135},{"longitude":-159.39474836039687,"latitude":21.90860227574629},{"longitude":-159.39689034014665,"latitude":22.219668268419397},{"longitude":-159.4039686398453,"latitude":22.21777913718998},{"longitude":-159.7810802569494,"latitude":22.061712956322836},{"longitude":-159.78078671207314,"latitude":22.05453169225683},{"longitude":-159.76295645508745,"latitude":21.986448959243987}]''')
location_descriptions = [
    'At sea, BEYOND three miles from nearest land',
    'At sea, WITHIN three miles of nearest land',
    'In the shore break',
    'On the beach BELOW the high wash of the waves',
    'On the beach ABOVE the high wash of the waves',
    'None of the above, a description follows below',
]
env_descriptions = [
    'Caught on the reef or is partially buried in sand',
    'Loose in the shore break or on the shoreline and could go back out to sea',
    'Trapped in a tide pool and cannot escape',
    'Loose on the shore but caught in the vegetation line',
    'Tied to a fixed object so it cannot be swept away',
    'Pushed inland above the high wash of the waves so it cannot be swept away',
    'Other',
]
eventTypes = [
    'Mass of netting/fishing gear',
    'Abandoned/derelict boat',
    'Container/drum/cylinder',
    'Large concentration of plastics',
    'Potential Japan tsunami marine debris',
    'Large concentration of miscellaneous trash',
]
statuses = [
    'Reported',
    'Removal and Storage',
    'Sorting',
    'Disposal',
    'Complete',
]
storageNodes = [
    'CMDR Hub',
    'Maui Node',
    'Big Island Node',
    'Kauai Node',
]
# a list of random first names (copilot likes names that start with J)
firstNames = [
    'John',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Jenny',
    'Jared',
    'Jasmine',
    'Jesse',
    'Jocelyn',
    'Jorge',
]
# a list of random last names
lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
    'Anderson',
    'Thomas',
    'Jackson',
    'White',
    'Harris',
]

for location in locations:
    container_fullness = None
    claim_boat = None
    removal_start_date = None
    removal_end_date = None
    temp_storage = None

    first_name = choice(firstNames)
    last_name = choice(lastNames)
    email = f'{first_name.lower()}.{last_name.lower()}@fakeemail.com'
    phone_number = f'({choice(range(100, 999))}) {choice(range(100, 999))}-{choice(range(1000, 9999))}'

    _type = choice(eventTypes)
    if _type == 'Abandoned/derelict boat':
        claim_boat = choice(['Yes', 'No'])
    if _type == 'Container/drum/cylinder':
        container_fullness = choice(['Full', 'Partially filled', 'Empty'])

    status = choice(statuses)
    if status != 'Reported':
        removal_start_date = fake.date_time_between(start_date='-3y', end_date='now')
        removal_end_date = removal_start_date + timedelta(hours=choice(range(1, 72)))
        temp_storage = choice(storageNodes)

    with requests.post('http://localhost:3000/api/mongo/event/add-dev', {
        'firstName': first_name,
        'lastName': last_name,
        'email': email,
        'phoneNumber': phone_number,
        'status': status,
        'publicType': _type,
        'publicContainerFullness': container_fullness,
        'publicClaimBoat': claim_boat,
        'publicLocationDesc': choice(location_descriptions),
        'publicBiofoulingRating': choice(range(1, 10)),
        'publicDebrisEnvDesc': choice(env_descriptions),
        'mapLat': location['latitude'],
        'mapLong': location['longitude'],
        'removalStartDate': removal_start_date.strftime("%Y-%m-%dT%H:%M:%SZ") if removal_start_date else None,
        'removalEndDate': removal_end_date.strftime("%Y-%m-%dT%H:%M:%SZ") if removal_end_date else None,
        'debrisSize': choice(range(1, 20)),
        'debrisMass': choice(range(10, 50)),
        'tempStorage': temp_storage,
    }) as req:
        print(req.status_code)
