import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Button } from '@material-ui/core'
import './CSS/Header.css';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const Header = () => {

    // state is a var in react 
    const [countries, setCountries] = useState([]);

    const [country, dispatch] = useStateValue();

    const [countryInfo, setCountryInfo] = useState({});

    // useEffect runs a code based on a codition 
    // so we are fetching coutry details 
    // we use aync func when collecting api data  
    useEffect(() => {
        const getCountryData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country) => ({
                    name: country.country,
                    value: country.countryInfo.iso2
                }));

                setCountries(countries);
            })
        };
        getCountryData();
    },[]);
    // empty [] means the code runs when componenet loads 


    const onCountryChange = async (event) => {
        const countryCode = event.target.value;

        const url = countryCode === 'worldwide'
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${country}`

        await fetch(url)
        .then(response => response.json())
        .then(data => { 
            dispatch({
                type: actionTypes.SET_COUNTRY,
                country: countryCode,
            });

            // all data from api response 
            setCountryInfo(data);
            console.log('country info : ', countryInfo)
        });
    };

    console.log('country info : ', countryInfo)

    return (
        <div className='header'>
            <h1>COVID-19 TRACKER</h1>
                {/* we want to loop through all the countries  */}
                <FormControl className='header__dropdown'>
                    <Select variant='outlined' 
                    onChange={onCountryChange}
                    value={country}>
                    <MenuItem value='worldwide'>Worldwide</MenuItem>
                        {/* react allows us to write js inside */}

                        {
                            countries.map((country) =>  (
                                <MenuItem value={country.value} >{country.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            
        </div>
    )
}

export default Header
