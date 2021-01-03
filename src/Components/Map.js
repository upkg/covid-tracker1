import React from 'react';
import './CSS/Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { showDataOnMap } from '../util';

const Map = ({ countries, casesType, center, zoom }) => {
    return (
        <div className='map'>
            <MapContainer center={center} zoom={zoom}>
                <TileLayer 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* lopthrough data to draw circles around countries  */}
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
