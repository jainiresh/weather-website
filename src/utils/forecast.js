const request = require('request');

const forecast =(lat, long, callback) =>
{
  const url = 'http://api.weatherstack.com/current?access_key=ff8891fa06536d94ea4d34989006b9d3&query=' + lat + ',' + long + '&units=m';
  request({url : url, json : true}, (error, response)=>
  {
    // console.log(response);
    if(error)
    {
      callback('Unable to connect you to the map!', undefined);
    }
    else if(response.body.error)
    callback('Unable to fetch data from that location !');
    else
    callback(undefined, {
      country : response.body.location.country,
      temperature : response.body.current.temperature,
      weather_descriptions : response.body.current.weather_descriptions
    })
  })
} 

module.exports = forecast;