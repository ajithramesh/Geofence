import React from 'react';
import Map from './Map';
 
const MapView = () => (
  <div>
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `800px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
);
 
export default MapView;