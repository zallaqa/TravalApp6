const axios =  require("axios")



const GetWeather = async (lat,lng, RemingDays,key) =>{
    // console.log(lat,lng,RemingDays,key);
    if(!RemingDays){
        const errMassage = {
            message: "Enter Valid Date",
            error: true
        }
      
        return errMassage
    }

    // console.log("working");
    if(RemingDays < 0){
        const errMassage = {
            message: "Date should not be in the past try again",
            error: true
        }
      
        return errMassage
    }
    
    
    if(RemingDays > 0 && RemingDays <= 7){
      const {data} = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${key}`)
      const { weather , temp } =  data.data[0]
      const { description } = weather
      const weather_data = {description,temp}
      
      return weather_data;
      
      
    }
    else if(RemingDays > 7){
        const {data} = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${RemingDays}&key=${key}`)
        const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
        const description = weather
        weather_data = {description,temp ,app_max_temp,app_min_temp}

        return weather_data;

    }


}


module.exports = {GetWeather}