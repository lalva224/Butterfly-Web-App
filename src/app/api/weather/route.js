
export async function GET(req){
    let lat = 25.762246
    let lon = -80.374389
    let api_key = process.env.OPEN_WEATHER_API_KEY
    let url = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lon}&appid=${api_key}`
    const response = await fetch(url)
    const data = await response.json()

    return new Response(JSON.stringify(data),{
        headers: {'Content-Type':'application/json'}
    })
    
}