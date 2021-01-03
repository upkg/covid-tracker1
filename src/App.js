import './App.css';
import InfoBox from './Components/InfoBox';
import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Button } from '@material-ui/core'
import { Card, CardContent, Typography } from '@material-ui/core';
import Table from './Components/Table';
import { sortData } from './util';
import LineGraph from './Components/LineGraph';
import Map from './Components/Map';
import 'leaflet/dist/leaflet.css';

function App() {

  
      // state is a var in react 
      const [countries, setCountries] = useState([]);

      const [country, setCountry] = useState('worldwide');
  
      const [countryInfo, setCountryInfo] = useState({});

      const [tableData, setTableData] = useState([]);

      const [mapCenter, setMapCenter] = useState({ lat: 5.6437397, lng : -0.162709 });

      const [mapZoom, setMapZoom] = useState(3);

      const [mapCountries, setMapCountries] = useState([]);


        // load worldwide data on load 
      useEffect(() => {
        //   lets data fro worldwide stats on page load 
        fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
            setCountryInfo(data);
        })

    },[])


  
      // useEffect runs a code based on a codition 
      // so we are fetching coutry details 
      // we use async func when collecting api data  
      useEffect(() => {
          const getCountriesData = async () => {
              await fetch('https://disease.sh/v3/covid-19/countries')
              .then((response) => response.json())
              .then((data) => {
                  const countries = data.map((country) => ({
                      name: country.country,
                      value: country.countryInfo.iso2
                  }));
  
                  setCountries(countries);

                  //   sorting data as it cones 
                const sortedCountryData = sortData(data);
                setTableData(sortedCountryData);

                // dat to dtraw circles 
                setMapCountries(data);
              });
          };   
            // calling fucntion 
          getCountriesData();
      },[]);
      // empty [] means the code runs when componenet loads 
  
      

  
    //   when country changes info changes 
      const onCountryChange = async (event) => {
          const countryCode = event.target.value;
          
          const url = countryCode === 'worldwide'
              ? 'https://disease.sh/v3/covid-19/all'
              : `https://disease.sh/v3/covid-19/countries/${countryCode}`
              
          await fetch(url)
          .then(response => response.json())
          .then(data => { 
              
              // all data from api response 
              setCountry(countryCode)
              setCountryInfo(data);
              
            //   console.log('country info : ', countryInfo)
            var lat = data.countryInfo.lat
            var long = data.countryInfo.long

            setMapCenter({ lat: lat, lng : long })

            // data.countryInfo.lat, data.countryInfo.long

            

            setMapZoom(10)     
            
          });
      };

      
      
      
  
  

  return (
    <div className="app">

    <div className="app__left">
          
      {/* header */}
        <div className='header'>
            <h1>COVID-19 TRACKER</h1>
                {/* we want to loop through all the countries  */}
                <FormControl className='header__dropdown'>
                    <Select 
                    variant='outlined' 
                    onChange={onCountryChange}
                    value={country}>
                    <MenuItem className='header__dropdownMenu' value='worldwide'>Worldwide</MenuItem>
                        {/* react allows us to write js inside */}

                        {
                            countries.map((country) =>  (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            
        </div>


        {/* info boxes  */}
        <div className='app__stats'>
            <InfoBox
                title='Coronavirus Cases'
                cases={countryInfo.todayCases}
                total={countryInfo.cases}
                
            />

            <InfoBox
                title='Recovered'
                cases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
                
            />

            <InfoBox
                title='Deaths'
                cases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
                
            />
        </div>

        <Map
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
        />
    </div>


                        {/* right side of page  */}
    <div  className='app__right'>
        <Card>            
            <CardContent>
                {/* table  */}
                <h3>live cases by country</h3>
                <Table countries={tableData} />

                {/* graph  */}
                <LineGraph />
            </CardContent> 
        </Card>

        
    </div>
    
    

      

    </div>
  );
}

export default App;
