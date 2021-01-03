import React from 'react';
import InfoBox from './InfoBox';
import './CSS/Results.css';
import Map from './Map';
import Header from './Header';
import { Card, CardContent, Typography } from '@material-ui/core';

const Results = () => {
    return (
        <div className='results'>
            <div className='results__left'>
            <Header />
                <div className='results__info'>
                    <InfoBox
                        title='Coronavirus Cases'
                        total={400}
                        cases={4567}
                    />

                    <InfoBox
                        title='Recovered'
                        total={400}
                        cases={4567}
                    />

                    <InfoBox
                        title='Deaths'
                        total={400}
                        cases={4567}
                    />
                </div>

                <div className='map'>
                    <Map />
                </div>
            </div>

            <Card className='results__right'>
                
                <CardContent>
                    {/* table  */}
                    <h3>live cases by country</h3>

                    {/* graph  */}

                    <h3>live cases by country</h3>
                </CardContent>

                
            </Card>
            

            
            
        </div>
    )
}

export default Results
