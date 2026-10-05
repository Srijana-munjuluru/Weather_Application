let centigrade = document.getElementById('centigrade')
let farenheit = document.getElementById('farenheit')
let CT = 0
let weatherData = null
let btn = document.getElementById('btn')

// if (localStorage.getItem("unit") === null) {
//     localStorage.setItem("unit", "C");
// }

let icons = {
    "partly-cloudy-day":"https://i.ibb.co/PZQXH8V/27.png",
    "partly-cloudy-night":"https://i.ibb.co/Kzkk59k/15.png",
    "rain":"https://i.ibb.co/kBd2NTS/39.png",
    "clear-day":"https://i.ibb.co/rb4rrJL/26.png",
    "clear-night":"https://i.ibb.co/1nxNGHL/10.png"
};

let background = {
    "partly-cloudy-day":"https://i.ibb.co/qNv7NxZ/pc.webp",
    "partly-cloudy-night":"https://i.ibb.co/RDfPqXz/pcn.jpg",
    "rain":"https://i.ibb.co/h2p6Yhd/rain.webp",
    "clear-day":"https://i.ibb.co/WGry01m/cd.jpg",
    "clear-night":"https://i.ibb.co/kqtZ1Gx/cn.jpg"
};

let defaultIcon ="https://i.ibb.co/rb4rrJL/26.png";

let defaultBackground ="https://i.ibb.co/qNv7NxZ/pc.webp";

function temperature(celsius) {
    let unit = localStorage.getItem("unit");
    if (unit === "F") {
        let fahrenheit =(Number(celsius) * 9 / 5) + 32;
        return fahrenheit.toFixed(1) + "°F";
    }
    else {
        return Number(celsius).toFixed(1) + "°C";
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
    document.body.style.backgroundImage =`url("${bg}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
}

// function displayWeather(data) {
//     weatherData = data

// }


async function fdata(city) {
    let gdata = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`)
    let pdata = await gdata.json()
    console.log(pdata)

    let image = document.getElementById('image')
    image.innerHTML = pdata.currentConditions.icon

    let tmp = document.getElementById('tmp')
    CT = pdata.currentConditions.temp;
    tmp.innerHTML = CT + "°C";

    let cond = document.getElementById('cond')
    cond.innerHTML = pdata.currentConditions.conditions

    let prec = document.getElementById('prec')
    prec.innerHTML = "prec : " + pdata.currentConditions.precip

    let show = document.getElementById('show')
    show.innerHTML = pdata.resolvedAddress

    let ctmp = document.querySelectorAll('.ctmp')
    ctmp.innerHTML = pdata.days[0].hours.temp

    let uv = document.getElementById('uv')
    let ws = document.getElementById('ws')
    let sr = document.getElementById('sr')
    let h = document.getElementById('h')
    let v = document.getElementById('v')
    let aq = document.getElementById('aq')

    let sre = document.getElementById('sre')
    let uve = document.getElementById('uve')
    let wse = document.getElementById('wse')
    let he = document.getElementById('he')
    let ve = document.getElementById('ve')
    let aqe = document.getElementById('aqe')

    uv.innerHTML = pdata.currentConditions.uvindex
    ws.innerHTML = pdata.currentConditions.windspeed
    sr.innerHTML = pdata.currentConditions.sunrise
    h.innerHTML = pdata.currentConditions.humidity
    v.innerHTML = pdata.currentConditions.visibility
    aq.innerHTML = pdata.currentConditions.cloudcover

    sre.innerHTML = pdata.currentConditions.sunset
    // ve.innerHTML = pdata.currentConditions.v

    centigrade.classList.add('selected');
    farenheit.classList.remove('selected');
}

btn.addEventListener('click', () => {
    let search = document.getElementById('search').value
    fdata(search)
})

centigrade.addEventListener('click', () => {
    let tmp = document.getElementById('tmp');
    tmp.innerHTML = CT + "°C";
    centigrade.classList.add('selected');
    farenheit.classList.remove('selected');
});

farenheit.addEventListener('click', () => {
    let tmp = document.getElementById('tmp');
    let fahrenheitTemperature = (CT * 9 / 5) + 32;
    tmp.innerHTML = fahrenheitTemperature.toFixed(1) + "°F";
    farenheit.classList.add('selected');
    centigrade.classList.remove('selected');
});

let savedCity = localStorage.getItem("city");
if (savedCity) {
    fdata(savedCity);
}
// else {
//     updateUnitButtons();
//     getCurrentLocationWeather();
// }
