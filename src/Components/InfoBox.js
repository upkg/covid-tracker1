import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './CSS/InfoBox.css';

const InfoBox = ({ title, cases, total }) => {
    return (
        <div className='infoBox'>
            <Card>
                <CardContent className='card'>
                    {/* title  */}
                    <Typography className='infoBox__title' color='textSecondary'>
                        {title} Today
                    </Typography>

                    {/* number of cases  */}
                    <h2 className='infoBox__cases'>
                        {cases} Today
                    </h2>

                    {/* 1.2m total  */}
                    <Typography className='infoBox__total' color='textSecondary'>
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
