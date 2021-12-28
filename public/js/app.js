console.log('Client side javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');
const message4 = document.querySelector('#message-4');
const message5 = document.querySelector('#message-5');


weatherForm.addEventListener('submit',(e)=>{
  
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';
  message4.textContent = '';
  message5.textContent = '';

  e.preventDefault();
  const url = '/weather?address=' + search.value;
  fetch(url).then((response)=>
    {
      response.json().then((data)=>
      {
        if(data.error)
        message1.textContent = data.error;
        else{
        message1.textContent = 'Location : ' + data.location;
        message2.textContent ='Temperature : '+ data.forecastData.temperature + ' degeree Celcius,  its about being ' + data.forecastData.weather_descriptions;
        message3.textContent = 'Feels like : ' + data.forecastData.feels_like + ' degeree Celcius!'; 
        message4.textContent ='is It a day,  there ? : ' + data.forecastData.is_day ;
        message5.textContent ='Local time : ' + data.forecastData.local_time;
        }
      });
    });
});

