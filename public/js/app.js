console.log('Client side javascript');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>
// {
//   response.json().then((data)=>{
//     console.log(data);
//   });
// });


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
  
  message1.textContent = 'Loading...';
  message2.textContent = '';
  e.preventDefault();
  const url = 'http://localhost:3000/weather?address=' + search.value;
  fetch(url).then((response)=>
    {
      response.json().then((data)=>
      {
        if(data.error)
        message1.textContent = data.error;
        else{
        message1.textContent = 'location : ' + data.location;
        message2.textContent ='Temperature : '+ data.forecastData.temperature+ ' degeree Celcius, its about being ' + data.forecastData.weather_descriptions;
        }
      });
    });
});

