import axios from "axios"

export const getWeather = async(lat: string|number, lng: string | number, ) => {
    try {
        const {data} = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m&current_weather=true`)
        return data
        
    } catch (error) {
        console.error(error)
    }
}

export {}