class Forecast{
    constructor(){
        this.key = 'SC4ByEhsJfcgWYOixsVO2rypV0L2AABD';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateLocation(city){
       const city_dets = await this.getCity(city); 
       console.log(city_dets);
       const weather_dets = await this.getWeather(city_dets.Key);
       console.log(weather_dets);
       return {city_dets,weather_dets}
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI+query);
        if(response.status!==200)
        {throw new Error("Resource not found");}
        const data = await response.json();
        return data[0]; 
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI+query);
        if(response.status!==200)
        {throw new Error("Resource not found");}
        const data = await response.json();
    
        return data[0];
    }
}

let obj = new Forecast();


const key = 'SC4ByEhsJfcgWYOixsVO2rypV0L2AABD';

// getting weather details
const getWeather = async (id)=>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base+query);
    if(response.status!==200)
    {throw new Error("Resource not found");}
    const data = await response.json();

    return data[0];
}

//getting city details
const getCity = async (city) =>{
    
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);
    if(response.status!==200)
    {throw new Error("Resource not found");}
    const data = await response.json();
    return data[0];
}

// getCity("Dehradun")
// .then((data)=>{
//     console.log(data);
//     return getWeather(data.Key);
// }).then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{console.log(err.message)});

