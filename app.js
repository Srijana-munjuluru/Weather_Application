let today = document.getElementById("today");
let week = document.getElementById("week");

let todayPage = document.getElementById("todayPage");
let weekPage = document.getElementById("weekPage");

today.classList.add("active");
week.classList.remove("active");

today.addEventListener("click", function (event) {
    event.preventDefault();

    todayPage.style.display = "block";
    weekPage.style.display = "none";

    today.classList.add("active");
    week.classList.remove("active");
});

week.addEventListener("click", function (event) {
    event.preventDefault();

    todayPage.style.display = "none";
    weekPage.style.display = "block";

    week.classList.add("active");
    today.classList.remove("active");
});

let centigrade = document.getElementById('centigrade')
let farenheit = document.getElementById('farenheit')
let CT = 0
let weatherData = null
let btn = document.getElementById('btn')

if (localStorage.getItem("unit") === null) {
    localStorage.setItem("unit", "C");
}

let icons = {
    "partly-cloudy-day": "https://i.ibb.co/PZQXH8V/27.png",
    "partly-cloudy-night": "https://i.ibb.co/Kzkk59k/15.png",
    "rain": "https://i.ibb.co/kBd2NTS/39.png",
    "clear-day": "https://i.ibb.co/rb4rrJL/26.png",
    "clear-night": "https://i.ibb.co/1nxNGHL/10.png"
};

let background = {
    "partly-cloudy-day": "https://i.ibb.co/qNv7NxZ/pc.webp",
    "partly-cloudy-night": "https://i.ibb.co/RDfPqXz/pcn.jpg",
    "rain": "https://i.ibb.co/h2p6Yhd/rain.webp",
    "clear-day": "https://i.ibb.co/WGry01m/cd.jpg",
    "clear-night": "https://i.ibb.co/kqtZ1Gx/cn.jpg"
};

let defaultIcon = "https://i.ibb.co/rb4rrJL/26.png";

let defaultBackground = "https://i.ibb.co/qNv7NxZ/pc.webp";

function temperature(celsius) {
    let unit = localStorage.getItem("unit");
    if (unit === "F") {
        let fahrenheit = (Number(celsius) * 9 / 5) + 32;
        return fahrenheit.toFixed(1) + "°F";
    }
    else {
        return Number(celsius).toFixed(1) + "°C";
    }
}

function updateUnitButtons() {
    let unit = localStorage.getItem("unit");
    if (unit === "C") {
        centigrade.classList.add("selected");
        farenheit.classList.remove("selected");
    }
    else {
        farenheit.classList.add("selected");
        centigrade.classList.remove("selected");
    }
}

function setIcon(image, iconName) {
    if (!image) {
        return;
    }
    image.src = icons[iconName] || defaultIcon;
    image.alt = iconName || "weather";
}

function setWeatherBackground(iconName) {
    let bg = background[iconName] || defaultBackground;
    document.body.style.backgroundImage = `url("${bg}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {

                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);

                fdata(`${latitude},${longitude}`);
            },

            function (error) {
                console.log("Location permission denied or unavailable");
                fdata("Bengaluru");
            }
        );
    } else {
        console.log("Geolocation is not supported");
        fdata("Bengaluru");
    }
}

async function fdata(city) {
    let gdata = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`)
    let pdata = await gdata.json()
    console.log(pdata)

    weatherData = pdata;

    let current = pdata.currentConditions

    let image = document.getElementById('image')
    setIcon(
        image,
        current.icon
    );
    setWeatherBackground(
        current.icon
    );

    let tmp = document.getElementById('tmp')
    CT = pdata.currentConditions.temp;
    tmp.innerHTML = temperature(CT)

    let DT = document.getElementById('DT');
    let now = new Date();
    let day = now.toLocaleDateString("en-US", {
        weekday: "long"
    });
    let time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
    DT.innerHTML = day + ", " + time;

    let cond = document.getElementById('cond')
    cond.innerHTML = pdata.currentConditions.conditions

    let prec = document.getElementById('prec');
    prec.innerHTML = "Precipitation: " + pdata.currentConditions.precipprob + "%";

    let show = document.getElementById('show')
    show.innerHTML = pdata.resolvedAddress

    let days = pdata.days;
    let week = document.querySelectorAll(".week");
    week.forEach((card, index) => {
        let day = days[index];
        let date = new Date(day.datetime + "T12:00:00");
        let dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });
        card.querySelector("h4").innerHTML = dayName;
        card.querySelector(".ttmp").innerHTML = temperature(day.temp);
        setIcon(
            card.querySelector("img"),
            day.icon
        );
    });

    let hours = pdata.days[0].hours;
    let hourCards = document.querySelectorAll(".hour");
    hourCards.forEach((card, index) => {
        let hour = hours[index];
        if (!hour) return;
        let time = hour.datetime.substring(0, 5);
        card.querySelector("h4").innerHTML = formatTime(time);
        card.querySelector("p").innerHTML =
            temperature(hour.temp);
        setIcon(
            card.querySelector("img"),
            hour.icon
        );
    });

    function formatTime(time) {
        let [hour, minute] = time.split(":");
        hour = Number(hour);
        let period = hour >= 12 ? "PM" : "AM";
        let displayHour = hour % 12;
        if (displayHour === 0) {
            displayHour = 12;
        }
        return `${String(displayHour).padStart(2, "0")}:${minute} ${period}`;
    }

    function uvlevel(uv) {
        if (uv <= 2) {
            return "Low";
        }
        else if (uv <= 5) {
            return "Moderate";
        }
        else if (uv <= 7) {
            return "High";
        }
        else if (uv <= 10) {
            return "Very High";
        }
        else {
            return "Extreme";
        }
    }

    function humidityLevel(humidity) {
        if (humidity >= 70) {
            return "High";
        }
        else if (humidity >= 40) {
            return "Moderate";
        }
        else {
            return "Low";
        }
    }

    function visibilityLevel(visibility) {

        if (visibility >= 10) {
            return "Very Clear Air";
        }
        else if (visibility >= 5) {
            return "Clear Air";
        }
        else if (visibility >= 2) {
            return "Moderate";
        }
        else {
            return "Poor";
        }
    }

    function airQualityLevel(aqi) {

        if (aqi <= 50) {
            return "Good";
        }
        else if (aqi <= 100) {
            return "Moderate";
        }
        else if (aqi <= 150) {
            return "Unhealthy for Sensitive Groups";
        }
        else if (aqi <= 200) {
            return "Unhealthy";
        }
        else if (aqi <= 300) {
            return "Very Unhealthy";
        }
        else {
            return "Hazardous";
        }
    }

    let uv = pdata.currentConditions.uvindex;
    document.getElementById("uv").innerHTML = uv;
    document.getElementById("uve").innerHTML = uvlevel(uv);

    let ws = document.getElementById('ws')
    let sr = document.getElementById('sr')

    let humidity = pdata.currentConditions.humidity;
    document.getElementById("h").innerHTML = humidity.toFixed(2) + "%";
    document.getElementById("he").innerHTML = humidityLevel(humidity);

    let visibility = pdata.currentConditions.visibility;
    document.getElementById("v").innerHTML = visibility;
    document.getElementById("ve").innerHTML = visibilityLevel(visibility);

    let aq = current.aqius;
    if (aq !== undefined) {
        document.getElementById("aq").innerHTML = aq;
        document.getElementById("aqe").innerHTML = airQualityLevel(aq);
    }
    else {
        document.getElementById("aq").innerHTML = "26.5";
        document.getElementById("aqe").innerHTML = "Good";
    }

    let sre = document.getElementById('sre')

    ws.innerHTML = pdata.currentConditions.windspeed
    sr.innerHTML = formatTime(pdata.currentConditions.sunrise)

    sre.innerHTML = formatTime(pdata.currentConditions.sunset)
}

btn.addEventListener('click', () => {
    let search = document.getElementById('search').value
     if (search === "") {
        return;
    }
    fdata(search)
})

centigrade.addEventListener("click", () => {
    localStorage.setItem("unit", "C");
    updateUnitButtons();
    if (weatherData) {
        fdata(weatherData.resolvedAddress);
    }
});

farenheit.addEventListener("click", () => {
    localStorage.setItem("unit", "F");
    updateUnitButtons();
    if (weatherData) {
        fdata(weatherData.resolvedAddress);
    }
});

updateUnitButtons();
getCurrentLocation();

