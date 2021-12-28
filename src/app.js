const path = require('path'); 
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//To specify the paths for the express configurations
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname ,'../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//To specify the handlebars engine and views location..!
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setting up static directory to serve
app.use(express.static(publicDirectoryPath)); 

app.get('', (req,res)=>
{
  res.render('index', {
    title : 'WEATHER',
    name : 'JAI NIRESH J'
  });
})

app.get('/about',(req,res)=>
{
  res.render('about', {
    title : 'about JAI NIRESH J',
    name : 'JAI NIRESH J'
  });
})

app.get('/help', (req, res)=>
{
  res.render('help', {
    title : 'SUPPORT !',
    name : 'JAI NIRESH J',
    helptext : 'Some random lorem epsum help text'
  })
});

app.get('/weather', (req, res)=>
{
  if(req.query.address)
  {
    geocode(req.query.address,(error,{latitude,longtitude,location} ={})=>
    {
      if(error)
      return res.send({error});
      forecast(latitude, longtitude, (error,forecastData)=>
      {
        if(error)
        return res.send({error});
        res.send({
          location : location,
          forecastData
        })
      })
    });
  }
  else
  res.send({error : 'Please provide an address !'});
});

app.get('/products', (req, res)=>
{
  if(!req.query.search)
  {
    return res.send({
      error : 'You must provide an error message !'
    })
  }
  res.send(
    { 
      products : []  
    }
  );
});

app.get('/help/*',(req, res)=>
{
  res.render('error',{
    title: '404',
    desc : 'Help article not found !',
    name : 'JAI NIRESH J'
  })
});

app.get('*',(req, res)=>
{
  res.render('error',{
    title : '404',
    name : 'JAI NIRESH J',
    desc : 'Page 404 error !'
  });
});
app.listen(port, () =>
{
  console.log(`Server up on ${port}!`);
});