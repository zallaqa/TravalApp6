import axios from "axios";

const form = document.querySelector("form");
const placeInput = document.querySelector("#place");
const dateInput = document.querySelector("#date")
const place_Error = document.querySelector("#place_Error")
const date_Error = document.querySelector("#date_Error")





const formHandler = async (e) => {
    e.preventDefault();

    if (!validateInput()) { // Add parentheses to properly call validateInput function
        return;
    }

    console.log("Its Working");

    const location = await getPlace();

    if (location.error) {
        place_Error.innerHTML = `${location.message}`
        place_Error.style.display = "block"
    }

    place_Error.style.display = "none"

    const { name, lat, lng } = location;
    const date = dateInput.value;
    const RemingDays = getRemingDays(date);

    const Weather = await getWeather(lng, lat, RemingDays);
    if (Weather.error) {
        date_Error.innerHTML = `${Weather.message}`;
        date_Error.style.display = "block";

        return;
    }
    date_Error.style.display = "none";
    console.log(Weather);

    const images = await getImg(name);

    console.log(images);

    update_ui(RemingDays, name, images, Weather);
};




const getPlace = async () => {
    console.log("the place func is working");
    const formData = new FormData(form); // Create FormData object to properly send form data

    try {
        const place = placeInput.value; // Get the value of the place input directly
        const { data } = await axios.post("http://localhost:8080/getPlace", { place }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching place:", error);
        return { error: true, message: "Failed to fetch place" }; // Return error object
    }
};


   const getRemingDays = (date) =>{
    const now = new Date()
    const tDate = new Date(date)
    const dTime = tDate.getTime() - now.getTime()
    const RemingDays = Math.ceil(dTime / (1000 * 3600 * 24))

    // console.log(RemingDays);
    return RemingDays;
   }

   const getWeather = async (lng,lat, RemingDays) =>{
    console.log("the place fun is working")
    const { data } = await axios.post("http://localhost:8080/getWeather", {

    lat,
    lng,
    RemingDays

    },

     );

     return  data;
 }


 const getImg = async (name) =>{
   const { data } = await axios.post("http://localhost:8080/getImg",{
    name
    }, 
    )

    return data;
 }


 function update_ui(RemingDays, place, placeImg, weather) {
    document.querySelector("#RemingDays").innerHTML = `Your Travel starts in ${RemingDays} days`;
    document.querySelector(".place").innerHTML = `location: ${place}`;
    document.querySelector(".weather").innerHTML =
        RemingDays > 7
            ? `Weather is: ${weather.description}`
            : `Weather is expected to be: ${weather.description}`;
    document.querySelector(".temp").innerHTML =
        RemingDays > 7
            ? `Forecast: ${weather.temp}&deg;C`
            : `Temperature: ${weather.temp} &deg;C`;
    document.querySelector(".max-temp").innerHTML =
        RemingDays > 7 ? `Max-Temp: ${weather.app_max_temp}&deg;C` : "";
    document.querySelector(".min-temp").innerHTML =
        RemingDays > 7 ? `Min-Temp: ${weather.app_min_temp}&deg;C` : "";
    document.querySelector(".placeImg").innerHTML = `
        <img 
            src="${placeImg}" 
            alt="image that of the place"
        >
    `;
    document.querySelector(".flight_output").style.display = "block";
}

const validateInput = () => {
    place_Error.style.display = "none";
    date_Error.style.display = "none"

    if (!placeInput.value) {
        place_Error.innerHTML = `You must enter the location's name.`;
        place_Error.style.display = "block";
        return;
    } else {
        place_Error.innerHTML = ""; // Clear the error message if input is valid
        place_Error.style.display = "none"; // Hide the error message
    }

   if (!dateInput.value) {
        date_Error.innerHTML = `You must enter valid date`;
        date_Error.style.display = "block";
        return;
    }

    if (RemingDays < 0) {
        date_Error.innerHTML = `failed cannot`;
        date_Error.style.display = "block";
        return;
    }

    return true
};





export { formHandler }