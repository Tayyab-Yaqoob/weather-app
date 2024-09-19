document.querySelector(".btn").addEventListener("click", 
    () => {
        const ApiKey = "3aa27455675a2b5af2c1d8bc6583ff1c";
        const City = document.querySelector("#City").value; 
        if (!City) {
            alert("Please enter a city name");
            return;
        }

        const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${ApiKey}`;
        const Forcast = `https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${ApiKey}`;

        fetch(WeatherUrl)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data. Try again',error);
                alert("Please try again");
            });

            fetch(Forcast)
                .then(response => response.json())
                .then(data => {
                    displayHourlyForcast(data.list);
                })
                .catch(error => {
                    console.error('Error fetching weather data. Try again',error);
                    alert("Please try again");
                });

                document.querySelector("#City").value = ''; 
});

function displayWeatherData(data) {
    const temDevInfo = document.querySelector(".temp-info");
    const weatherInfo = document.querySelector(".weather-info");
    const weatherIcon = document.querySelector("#weather-icon");
    const hourlyForcast = document.querySelector(".hourly-forcast");

    if (data.cod === "404") {
        weatherInfo.innerHTML = `<p>${data.message}</p>`
    } else {
        const city = data.name;
        const temp = Math.round(data.main.temp - 273.15);
        const weather = data.weather[0].description;
        const weatherIconId = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${weatherIconId}.png`;
 
        const tempHtml = `<p>${temp}°C</p>`;
        const weatherHtml = `
        <p>${weather}</p>
        <p>${city}</p>`;

        temDevInfo.innerHTML = tempHtml;
        weatherInfo.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = weather;

        showImg();
    }
}

function displayHourlyForcast(hourlyData) { 
    const hourlyForcast = document.querySelector(".hourly-forcast");
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(element => {
        const dateTime = new Date(element.dt * 1000);
        const hour = dateTime.getHours();
        const temp = Math.round(element.main.temp - 273.15);
        const iconCode = element.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        const hourlyItem = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="${element.weather[0].description}">
            <span>${temp}°C</span>  
        </div>`;

        hourlyForcast.innerHTML += hourlyItem;
    });
}

function showImg() {
    const weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.style.display = "block";
}