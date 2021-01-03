import React from 'react';
import './CSS/Table.css';

// destructuring the props so we can use the value cases within 
const Table = ({ countries }) => {
    return (
        <div  className='table'>
            {/* {} means using the var within countries  */}
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
            
        </div>
    )
}

export default Table
