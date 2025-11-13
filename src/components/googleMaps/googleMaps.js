import React from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const GoogleMaps = ()=>{
    const defaultProps = {
        center: {
          lat: 24.774265,
          lng: 46.6753
        },
        zoom: 11
      };
return(
    <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: "" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      <AnyReactComponent
        lat={24.7136}
        lng={46.6753}
        text=""
      />
    </GoogleMapReact>
  </div>
)
}
export default GoogleMaps;

// import React from "react";
// import { GoogleMap, Marker } from "@react-google-maps/api";

// const GoogleMaps = ({ center, markers }) => {
//   const mapContainerStyle = {
//     width: "100%",
//     height: "100vh",
//   };

//   return (
//     <div style={mapContainerStyle}>
//       <GoogleMap center={center} zoom={12}>
//         {markers.map((marker, index) => (
//           <Marker key={index} position={marker} />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// };

// export default GoogleMaps;
