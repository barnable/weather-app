const $input= document.querySelector('input');
const $btn= document.querySelector('button');
const $cityName= document.querySelector('.city-name');
const $warning= document.querySelector('.warning');
const $photo= document.querySelector('.photo');
const $weather = document.querySelector('.weather');
const $temperature = document.querySelector('.temp');
const $humidity = document.querySelector('.humidity');

let $city;
let $url;
const $apiLink = `https://api.openweathermap.org/data/2.5/weather?q=`;
const $apiKey = '&appid=5b920be5ff59eec6f0052ddcf4957894';
const $units = '&units=metric';

const getWeather = () => {
    if($cityName.innerText===''){
        $city = 'Częstochowa';}
        else{
            $city = $input.value;
        }
    // $city = $input.value;
    $url = $apiLink + $city + $apiKey + $units;
    axios.get($url)
    .then(res => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        const status = Object.assign({}, ...res.data.weather)
        $cityName.textContent=res.data.name;
        $weather.textContent=status.main;
        $temperature.textContent=Math.floor(temp) +"°C";
        $humidity.textContent=hum+'%'
        $warning.textContent = '';
        $input.value='';

        if(status.id>=200 && status.id<=232){
            $photo.setAttribute('src', 'WeatherApp grafiki/thunderstorm.png')
        } else if(status.id>=300 && status.id<=321){
            $photo.setAttribute('src', 'WeatherApp grafiki/drizzle.png')
        } else if(status.id>=500 && status.id<=531){
            $photo.setAttribute('src', 'WeatherApp grafiki/rain.png')
        } else if(status.id>=600 && status.id<=622){
            $photo.setAttribute('src', 'WeatherApp grafiki/ice.png')
        }else if(status.id>=701 && status.id<=781){
            $photo.setAttribute('src', 'WeatherApp grafiki/fog.png')
        }else if(status.id===800){
            $photo.setAttribute('src', 'WeatherApp grafiki/sun.png')
        } else if(status.id>=801 && status.id<=804){ 
            $photo.setAttribute('src', 'WeatherApp grafiki/cloud.png')
        } else{
            $photo.setAttribute('src', 'WeatherApp grafiki/unknown.png')
        }
})
.catch(() => {$warning.textContent = 'Wpisz poprawna nazwę miasta!'})
};

const enterCheck = () => {
    if(event.code === 'Enter' || event.code === 'NumpadEnter'){
        getWeather();
    }
}

getWeather();
$btn.addEventListener('click', getWeather);
$input.addEventListener('keyup', enterCheck)
