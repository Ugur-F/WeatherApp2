
document.getElementById('inputCity').addEventListener('keyup', async function (event) {

    const input = document.querySelector('#inputCity').value;
    const apiKey = "5a6cb257f48a18958f242353b629b747";

    if (event.key === "Enter") {
        event.target.value = '';

        try {
            // API OpenWeather
            let reponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}`);
            let data = await reponse.json();

            // get to main
            let main = document.getElementById('main');

            //-- === === === === ===

            //div container
            let container = document.createElement('div');
            container.className = 'container';
            main.appendChild(container);

                //div title
                let divTitle = document.createElement('div');
                divTitle.className = 'divTitle';
                container.appendChild(divTitle);

                //div content
                let divContent = document.createElement('div');
                divContent.className = 'divContent';
                container.appendChild(divContent);

            //-- === === === === ===

            // Title
            let titleCity = document.createElement('h2');
            titleCity.innerHTML = `Météo pour <span class="ville_titre">${input}</span>`;
            divTitle.appendChild(titleCity);

            // Week
            const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

            // Boucle for Content
            const totalDays = 5;
            for (let j = 0; j < totalDays; j++) {
                let i = j * 8;

                // Card days
                let dayDiv = document.createElement('div');
                dayDiv.className = 'div_days';
                divContent.appendChild(dayDiv);

                // date
                let datePara = document.createElement('p');
                datePara.className = 'div_date';
                let date = new Date(data.list[i].dt * 1000); 
                datePara.textContent = weekDays[date.getDay()] + " " + data.list[i].dt_txt.split(' ')[0];   
                dayDiv.appendChild(datePara);

                // icones
                let icon = document.createElement('img');
                icon.className = 'div_logo';
                let iconeCode = data.list[i].weather[0].icon;
                icon.src = `http://openweathermap.org/img/w/${iconeCode}.png`;
                dayDiv.appendChild(icon);

                // temperature
                const conversion = parseInt(data.list[i].main.temp - 273.15);
                let temperature = document.createElement('p');
                temperature.className = 'div_temperature';
                temperature.textContent = `${conversion} °C`;
                dayDiv.appendChild(temperature);

                // humidité
                let humidité = document.createElement('p');
                humidité.className = 'div_humidité';
                humidité.textContent = "humidité : " + data.list[i].main.humidity + "%";
                dayDiv.appendChild(humidité);

                // vitesse du vent
                let vent = document.createElement('p');
                vent.className = 'div_vent';
                vent.textContent = "vent : " + Math.round(data.list[i].wind.speed * 3.6) + "km/h";
                dayDiv.appendChild(vent);
            }

        } catch (error) {
            alert('Il semble y avoir une erreur');
        }
    }
});

//

// Button Clear
document.getElementById("clearBtn").addEventListener("click", function() {
    main.innerHTML = '';
});

//


