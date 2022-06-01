//Clé d'authentification pour se connecter à l'API
const APIKEY = "659eb6423c655c0f0e67fae273c7bd6a";

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

        //On utilise maintenant les valeurs du tableau apiResults pour afficher les données souhaitées
        //Par exemple :
        //Température actuelle :
        currentTemp = document.querySelector('.temp');
        currentTemp.textContent = apiResults.current.temp;

        //Température actuelle (arrondie) :
        currentRoundedTemp = document.querySelector('.roundedTemp');
        currentRoundedTemp.textContent = Math.round(apiResults.current.temp);

        //Température dans 3h (arrondie) :
        roundedTempInThreeHours = document.querySelector('.threeHoursTemp');
        roundedTempInThreeHours.textContent = Math.round(apiResults.hourly[3].temp);

        //Température des 5 prochaines heures :
        fiveHoursTemp = document.querySelectorAll('.fiveHoursTemp');
        for(let i = 0; i < fiveHoursTemp.length; i++) {
            fiveHoursTemp[i].textContent = apiResults.hourly[i + 1].temp;
        }

        //La météo dans 2 jours :
        weatherInTwoDays = document.querySelector('.weatherInTwoDays');
        weatherInTwoDays.textContent = apiResults.daily[2].weather[0].description;

        weatherInTwoDaysImg = document.querySelector('.weatherInTwoDays-img');

        //On récupère l'heure actuelle (timestamp * 1000 car JS gère les dates en millisecondes)
        let time = new Date(apiResults.current.dt * 1000).getHours();
        if (time >= 6 && time < 21) {
            weatherInTwoDaysImg.src = `./assets/img/day/${apiResults.daily[2].weather[0].icon}.svg`;
        } else {
            weatherInTwoDaysImg.src = `./assets/img/night/${apiResults.daily[2].weather[0].icon}.svg`;
        }





    });
}