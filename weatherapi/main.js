const app=document.querySelector('.weather-app');
const temp=document.querySelector('.temp');
const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const conditionOutput=document.querySelector('.condition');
const nameOutput=document.querySelector('.name');
const icon=document.querySelector('icon');
const cloudOutput=document.getElementById('cloud');
const humidityOutput=document.getElementById('humidity');
const windOutput=document.getElementById('wind');
const form =document.getElementById('locationinput');
const search=document.querySelector('.search');
//const button=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');
const btn=document.querySelector('.submit');


//default city when page loads
let cityInput="Delhi";
cities.forEach((city)=>{
    city.addEventListener('click',(e)=>{
    //change from default city to the clicked one
    cityInput=e.target.innerHTML;
    /*function that fetches and displays all the 
    data from the weather API */
    fetchWeatherData();
    app.style.opacity="0";
 });
});

//add submit event to the form

form.addEventListener('submit',(e)=>{
//if the input field in search bar is empty,throw an alert
if(search.value.length==0){
    alert('Please type city name');
}else{
    //change from deafault city to the one written in the input field
    cityInput=search.value;

    fetchWeatherData(); 

    //remove all the text from input field

    search.value="";
    app.style.opacity="0";
}
//prevents the deafault behavior of the page
e.preventDefault();
}); 

//function that returns the day of the week 
function dayoftheweek(day,month,year){
    const weekday=["Sunday","Monday","Tuesday",
                   "Wednesday","Thursday","Friday","Saturday"];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];

};

//function that fetches and displays the data from weather API

function fetchWeatherData()
{
    //fetch the data and dynamically add the city name with template literals
    fetch(`http://api.weatherapi.com/v1/current.json?key=754f9f6fcb4c4d84913173257220306&q=${cityInput}&aqi=no`)
    //take the data which is in json format and convert it into regular js object
    .then((response)=>{
        
        return response.json()})
    .then((data)=>{
        //we can consolelog the data to see what is available
        console.log(data);

        //let's start by adding temperature and weather condition to the page
        temp.innerHTML=data.current.temp_c+"&#176;";
        conditionOutput.innerHTML=data.current.condition.text;

 //get the date and time from the city and extract the day ,month,,year,and time into individual variable
const date=data.location.localtime;
const y=parseInt(date.substr(0,4));
const m=parseInt(date.substr(5,2));
const d=parseInt(date.substr(8,2));
const time =date.substr(11);
/*reformat the date into new format
old format*/
dateOutput.innerHTML=`${dayoftheweek(d,m,y)} ${d}, ${m} ${y}`;
timeOutput.innerHTML=time;

//add the name of the city into the page
nameOutput.innerHTML=data.location.name;

//add the weather details to the page
cloudOutput.textContent=data.current.cloud +"%";
humidityOutput.textContent=data.current.humidity +"%";
windOutput.textContent=data.current.wind_kph +"km/h";

//get the corresponding icon url of the for the weather and extract a part of it
/*const iconId=data.current.condition.icon.substr(
    "//cdn.weatherapi.com/weather/64x64/".length);
//reformat the icon url to your own local folder path and add it to the page
icon.src="./icons/"+iconId;*/



//set default time of the day
let timeOfDay="day";

//get the unique id for each weather condition
const code=data.current.condition.code; 

//chane to night if its night time in the city
if(!data.current.is_day){
    timeOfDay="night";
}
if(code==1000){ 

//set the background image to clear if the weather is clear

app.style.backgroundImage=
           `url('./images/${timeOfDay}/clear.jpg')`;
btn.style.background="#e5ba92";
    
}
/* change button background colour depending on day and night*/

if(timeOfDay=="night"){
    btn.style.background="#181e27";}

    //samething cloudy weather
    else if(
        code==1003||
        code==1006||
        code==1009||
        code==1030||
        code==1087||
        code==1135||
        code==1273||
        code==1276||
        code==1279||
        code==1282
        ){
            app.style.backgroundImage=
           `url('./images/${timeOfDay}/cloudy.jpg')`;

            btn.style.background="#fa6d1b";
            if(timeOfDay=="night"){
                btn.style.background="#181e27";

            }
        }
        //if rain
        else if(
            code==1063||
            code==1069||
            code==1072||
            code==1153||
            code==1180||
            code==1183||
            code==1186||
            code==1192||
            code==1195||
            code==1204||
            code==1207||
            code==1240||
            code==1243||
            code==1246||
            code==1249||
            code==1252
        ){
          
            app.style.backgroundImage=
            `url('./images/${timeOfDay}/rainy.jpg')`;
            btn.style.background="#647d75";
            if(timeOfDay=="night")
            {
                btn.style.background="#325c80";
            }
        }
        else{
            app.style.backgroundImage=
           `url('./images/${timeOfDay}/snowy.jpg')`;
            btn.style.background="#4d72aa";
            if(timeOfDay=="night")
            {
                btn.style.background="#1b1b1b";
            }
        }
        //fade in the page once all is done
        app.style.opacity="1";
 })
 //if the user type a city that does not exist  throw an alert
.catch((error)=>{
    alert("City not found , Please try again");
   
    app.style.opacity="1";
 });
}
//call the function on load
fetchWeatherData();
//fade in the page 
app.style.opacity="1";
