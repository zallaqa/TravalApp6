const axios =  require("axios")





const GetImges = async (name, key) =>{
    console.log("working");
    const {data} = await axios.get(`https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo`)

    // console.log(data.hits[0]);
    const image =await data.hits[0]? await data.hits[0].webformatURL: "https://source.unsplash.com/random/640x480?city,morning,night?sig=1"
    
    // console.log(image);
    return image;

}


module.exports = { GetImges }