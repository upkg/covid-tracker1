import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'


const options = {
    scales: {
        xAxes: [{
            type: 'time',
            time: {
                time: 'MM/DD/YY',
                tooltipFormat: 'll',
            },            
        }],
        yAxes: [{
            gridlines: {
                display: false,
            },

            ticks: {
                // imclude dollar sign in backticks
                callback: function(value, index, values) {
                    return numeral(value).format('+0,0')
                }
            }
        }],
        },   
        

    legend: {
            display: false      
    },

    elements: {
        point: {
            radius: 0,
        },
    },

    // showLines: false, // disable for all datasets

    maintainAspectRatio: false,

    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data) {
                return numeral(tooltipItem.value).format('+0,0')
            },
        },
    },


}









const LineGraph = ({caseType='cases'}) => {

    const [data, setData] = useState({});

    // this function si for tranforming all the data to the right format to build th graph 
    const buildChartData = (data, caseType='cases') => {
        const chartData = [];
        let lastDataPoint;
        // data[caseType].forEach((date) => {
            // to use forEach it must be an array

        for(let date in data.cases) {
            // lastDataPoint gets its value from date above 
            if (lastDataPoint) {
                // we pass the x and y values here tombuild chart 
                const newDataPoint = {
                   x: date,
                   y: data[caseType][date] - lastDataPoint,
                };
                // we push the x and y values into the chart builder 
               chartData.push(newDataPoint)
            }
            lastDataPoint = data[caseType][date];
        };
        return chartData;
   }

    // use data for last 120 data  
    // 'https://disease.sh/v3/covid-19/countries'

    useEffect(() => {

        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then((response) => response.json())
                .then((data) => {
                    // we can pass in casetype here on component load
                    const chartData = buildChartData(data, 'cases');
                    // updates var data to chartData 
                    setData(chartData);
            });
        };
        
        fetchData();
    }, [caseType])



    const dataSet = {
        dataset: [{
            data: data,
            backgroundColor: 'rgba(204, 16, 52, 0.2)',
            borderColor: '#CC1034',
            label : 'Month'
        }]
    }

    

    return (
        <div className='graph'>
            <h1>Graph</h1>

            {data?.length > 0 && (
                <Line          

                options = {options}

                data = {{
                    datasets: [
                        {
                            backgroundColor: 'rgba(204, 16, 52, 0.5)',
                            borderColor: '#CC1034',
                            data: data
                        }
                    ]
                }}      
                
            />
            )}

            
        </div>
    )
}

export default LineGraph
