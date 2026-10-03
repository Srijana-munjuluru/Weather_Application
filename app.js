
let btn = document.getElementById('btn')
btn.addEventListener('click',()=>{
    let search = document.getElementById('search').value
    let data = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`)
    async function fdata(){
        let gdata = await data
        let pdata = await gdata.json()
        console.log(pdata)

        let image = document.getElementById('image')
        image.innerHTML = pdata.currentConditions.icon

        let tmp = document.getElementById('tmp')
        tmp.innerHTML = pdata.currentConditions.temp

        let prec = document.getElementById('prec')
        prec.innerHTML = pdata.currentConditions.precip
        
        let show = document.getElementById('show')
        show.innerHTML = pdata.resolvedAddress

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
        ve.innerHTML = pdata.currentConditions.ve
    }
    fdata()
})

let today = document.getElementById('today')
today.addEventListener('click', ()=>{
    window.location.href = "today.html"
})

let week = document.getElementById('week')
week.addEventListener('click', ()=>{
    window.location.href = "index.html"
})


