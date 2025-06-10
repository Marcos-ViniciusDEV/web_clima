document.querySelector(".busca").addEventListener("submit", async (event) => {
    const input = document.querySelector("input");
    event.preventDefault();



    if (input.value !== "") {
        clearinfo();
        showWarning('Carregando...');

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(input.value)}&limit=5&appid=4d3214c8b77fd5659905ceae7a5414bb`;


        let results = await fetch(url);
        let json = await results.json();

        if (json.length > 0) {

            let info = {
                name: json[0].name,
                lat: json[0].lat,
                lon: json[0].lon,
                local: json[0].local_names

            };

            const urle = `https://api.openweathermap.org/data/2.5/weather?lat=${info.lat}&lon=${info.lon}&appid=4d3214c8b77fd5659905ceae7a5414bb&units=metric&lang=pt_br`;



            let resultsB = await fetch(urle);
            let jsonB = await resultsB.json();

            console.log(jsonB)
            showInfo({
                name: jsonB.name,
                country: jsonB.sys.country,
                temp: jsonB.main.temp,
                tempIcon: jsonB.weather[0].icon,
                windSpeed: jsonB.wind.speed,
                windAngle: jsonB.wind.deg
            });

        } else {
            clearinfo();
            showWarning('error')
        }


    } else {
        clearinfo();
        alert("Por favor, digite um valor");

    }
});



function showInfo(jsonB) {
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${jsonB.name}, ${jsonB.country}`
    document.querySelector('.tempInfo').innerHTML = `${jsonB.temp} <sup class ="algo">C</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${jsonB.windSpeed} <sup class ="algo">Km</sup>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${jsonB.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${jsonB.windAngle - 90}deg)`;
}

function clearinfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    const warning = document.querySelector(".aviso");
    warning.innerHTML = msg;
}