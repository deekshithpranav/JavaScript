let locationInput = document.querySelector(".location")
let searchBarDiv = document.querySelector(".searchBar")
let mainDiv = document.querySelector(".main");

locationInput.addEventListener('focus', function(){
    searchBarDiv.classList.add('highlight')
});

locationInput.addEventListener('blur', function(){
    searchBarDiv.classList.remove('highlight')
});

// Weather API

const APIKey = "f7a786df6c45ec3507cc8fc6e88004dc";
locationInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        console.log("entered ")
        if(locationInput == '') return;

        //change background with unsplash API
        document.body.style.background = `url("https://source.unsplash.com/1600x900/?${locationInput.value}")`;
        document.body.style.backgroundSize = 'cover';
        console.log(locationInput.value);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
            const image = document.querySelector('.weatherImg')
            const temperature = document.querySelector('.temp')
            const skyCondition = document.querySelector('.sky')
            const humidity = document.querySelector('.humidityInfo')
            const wind = document.querySelector('.windInfo')

            console.log(`https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${APIKey}`)
            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;

                case 'Haze':
                    image.src = 'images/haze.png';
                    break;

                default:
                    image.src = 'images/cloud.png';
                    break;
            }
            
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>&deg;C</span>`
            skyCondition.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${parseInt(json.main.humidity)}%`
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`

        })
    }
  });