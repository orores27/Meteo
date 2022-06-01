//Clé d'authentification pour se connecter à l'API
const APIKEY = "7303129fa7860152545e0931db16cad4";

//On crée la variable dans laquelle on va stocker nos résultats météo
let apiResults;

//On vérifie que le navigateur est compatible puis on récupère la position actuelle
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        
        //Récupération des valeur de latitude et longitude de notre position actuelle
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        //On appelle l'API météo avec nos coordonnées actuelle
        callAPI(lat, long);

    //Si on a refusé la géolocalisation, on renvoie un message d'erreur
    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut pas fonctionner");
    })
}

//Fonction qui permet de récupérer les données météo avec les données récupérées ci-dessus puis d'afficher les différentes valeurs sur le site
function callAPI(lat, long) {

    //1) On envoie une requète à l'API en donnant en paramètres notre lat, long ainsi que notre APIKEY
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${APIKEY}`)

    //2) On obtient une réponse que l'on convertit au format .json (tableau de données)
    .then((response) => {
        return response.json();
    })

    //3) On enregistre le tableau de résultats obtenu dans notre variable apiResults afin de pouvoir l'afficher sur notre site
    .then((data) => {
        apiResults = data;
        console.log(apiResults);

        const temperatureActuelle = document.querySelector('.temperature');
        temperatureActuelle.textContent = apiResults.current.temp;

        const humiditeActuelle = document.querySelector('.humidite');
        humiditeActuelle.textContent = apiResults.current.humidity;

        const pressionActuelle = document.querySelector('.pression');
        pressionActuelle.textContent = apiResults.current.pressure;

        const vitesseActuelle = document.querySelector('.vitesse');
        vitesseActuelle.textContent = apiResults.current.wind_speed;

        const descriptionMeteo = document.querySelector('.descriptionTemps');
        descriptionMeteo.textContent = apiResults.current.weather[0].description;

        // 1) on selectionne l'emplacement pour l'heure 2) on déclare une variable date avec *1000 sert à convertir en milliseconde 3)donner le contenu à afficher
        const heureActuelle = document.querySelector('.heure');
        var date = new Date(apiResults.current.dt * 1000);
        heureActuelle.textContent = date.toLocaleTimeString();

        const cartes = document.querySelectorAll('.card');
        for(i=0; i<cartes.length; i++){
            
            const temperature = cartes[i].querySelector('li:nth-child(1)');
            temperature.textContent = apiResults.daily[i].temp.day + ' °C';

            const humidite = cartes[i].querySelector('li:nth-child(2)')
            humidite.textContent = apiResults.daily[i].humidity + ' %';

            const heure = cartes[i].querySelector('li:nth-child(3)')
            var date = new Date(apiResults.daily[i].dt * 1000);
            heure.textContent = date.toLocaleTimeString();

            const pression = cartes[i].querySelector('li:nth-child(4)')
            pression.textContent = apiResults.daily[i].pressure + ' aPh';

            const vitesse = cartes[i].querySelector('li:nth-child(5)')
            vitesse.textContent = apiResults.daily[i].wind_speed + ' Km/h';

            const descriptionMeteo = cartes[i].querySelector('p');
            descriptionMeteo.textContent = apiResults.daily[i].weather[0].description;


            const imageMeteo = cartes[i].querySelector('img');
            imageMeteo.src = `./assets/img/day/${apiResults.daily[i].weather[0].icon}.svg`;

            let dayDate = new Date(apiResults.daily[i].dt * 1000).toLocaleString('fr-FR', { weekday: 'long' });


            const titreCarte = cartes[i].querySelector('.card-title');
            titreCarte.textContent = dayDate;

        }

        //On utilise maintenant les valeurs du tableau apiResults pour afficher les données souhaitées
        //Par exemple :
        //Température actuelle :
//         currentTemp = document.querySelector('.temp');
//         currentTemp.textContent = apiResults.current.temp;

//         //Température actuelle (arrondie) :
//         currentRoundedTemp = document.querySelector('.roundedTemp');
//         currentRoundedTemp.textContent = Math.round(apiResults.current.temp);

//         //Température dans 3h (arrondie) :
//         roundedTempInThreeHours = document.querySelector('.threeHoursTemp');
//         roundedTempInThreeHours.textContent = Math.round(apiResults.hourly[3].temp);

//         //Température des 5 prochaines heures :
//         fiveHoursTemp = document.querySelectorAll('.fiveHoursTemp');
//         for(let i = 0; i < fiveHoursTemp.length; i++) {
//             fiveHoursTemp[i].textContent = apiResults.hourly[i + 1].temp;
//         }

//         //La météo dans 2 jours :
//         weatherInTwoDays = document.querySelector('.weatherInTwoDays');
//         weatherInTwoDays.textContent = apiResults.daily[2].weather[0].description;

//         weatherInTwoDaysImg = document.querySelector('.weatherInTwoDays-img');

//         //On récupère l'heure actuelle (timestamp * 1000 car JS gère les dates en millisecondes)
//         let time = new Date(apiResults.current.dt * 1000).getHours();
//         if (time >= 6 && time < 21) {
//             weatherInTwoDaysImg.src = `./assets/img/day/${apiResults.daily[2].weather[0].icon}.svg`;
//         } else {
//             weatherInTwoDaysImg.src = `./assets/img/night/${apiResults.daily[2].weather[0].icon}.svg`;
//         }





    });
}
