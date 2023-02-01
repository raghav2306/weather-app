const form = document.querySelector('form');

//function for upating UI
const updateUI = (data)=>{
   console.log(data);
   // const city_dets = data.city_dets;
   // const weather_dets = data.weather_dets;
   //DESTRUCTURING
   const {city_dets,weather_dets} = data;
   console.log(city_dets);
   console.log(weather_dets);

   let html = `<h3>${city_dets.EnglishName}</h3>
   <h3>${weather_dets.WeatherText}</h3>
   <span>${weather_dets.Temperature.Metric.Value}</span>
   <span>&deg;C</span>`;

   document.querySelector('.details').innerHTML=html;

   if(weather_dets.IsDayTime){
      document.querySelector('.time').src = `icons/day.svg`;
   }
   else{
    document.querySelector('.time').src = `icons/night.svg`;
   }
   
   let icon_img = `icons/${weather_dets.WeatherIcon}.svg`;
   document.querySelector('.icon img').src= icon_img;

   if(document.querySelector('.card').classList.contains('d-none')){
    document.querySelector('.card').classList.remove('d-none');
   }
   
}

//function for updating locaton
const updateLocation = async (city)=>{
   
    const city_dets = await getCity(city); 
    console.log(city_dets);
    const weather_dets = await getWeather(city_dets.Key);
    console.log(weather_dets);
    return {city_dets,weather_dets}
}

form.addEventListener('submit',(e)=>{
   e.preventDefault();
   const city = form.city.value;
   form.reset();
   obj.updateLocation(city)
   .then(data=>updateUI(data))
   .catch(err=>console.log(err));

   localStorage.setItem('city',city);
})

if(localStorage.getItem('city')){
   obj.updateLocation(localStorage.getItem('city'))
   .then(data=>updateUI(data))
   .catch(err=>console.log(err));
}