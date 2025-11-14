import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ }) => (
  <div style={{transform: 'translate(-50%,-100%)'}}>
    <svg height="32" viewBox="0 0 24 24" style={{fill: '#d83241'}}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    </svg>
  </div>
)

const GoogleMaps = ({ onConfirm }) => {
  const [center, setCenter] = useState({ lat: 24.774265, lng: 46.6753 });
  const [zoom] = useState(14);
  const [markerPos, setMarkerPos] = useState({ lat: 24.7136, lng: 46.6753 });
  const [mapInstance, setMapInstance] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const markerRef = React.useRef(null);

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(c);
        setMarkerPos(c);
      }, ()=>{});
    }
  },[])

  const onGoogleApiLoaded = ({ map, maps }) => {
    setMapInstance(map);
    setMapsApi(maps);

    // create/draggable marker
    if(!markerRef.current){
      const mk = new maps.Marker({
        position: markerPos,
        map,
        draggable: true,
      });
      markerRef.current = mk;
      mk.addListener('dragend', function(e){
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPos({ lat, lng });
      });
    }
  }

  // keep marker position in sync if markerRef exists
  useEffect(()=>{
    if(markerRef.current){
      markerRef.current.setPosition(markerPos);
      if(mapInstance){
        mapInstance.panTo(markerPos);
      }
    }
  },[markerPos, mapInstance])

  const handleMapClick = ({x, y, lat, lng})=>{
    setMarkerPos({ lat, lng });
  }

  const handleUseCurrent = ()=>{
    setMarkerPos(center);
    if(mapInstance) mapInstance.panTo(center);
  }

  const handleConfirm = async ()=>{
    let address = '';
    if(mapsApi){
      try{
        const geocoder = new mapsApi.Geocoder();
        const res = await new Promise((resolve, reject)=>{
          geocoder.geocode({ location: markerPos }, (results, status)=>{
            if(status === 'OK') resolve(results);
            else resolve(null);
          })
        });
        if(res && res[0] && res[0].formatted_address) address = res[0].formatted_address;
      }catch(e){
        // ignore
      }
    }
    if(!address){
      address = `${markerPos.lat.toFixed(6)}, ${markerPos.lng.toFixed(6)}`;
    }
    if(onConfirm) onConfirm(address);
  }

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div style={{ height: '78%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          center={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={handleMapClick}
          onGoogleApiLoaded={onGoogleApiLoaded}
        />
      </div>
      <div style={{position:'absolute', left:8, bottom:8, right:8, display:'flex', gap:8}}>
        <button onClick={handleConfirm} style={{flex:1, background:'#d83241', color:'white', border:'none', padding:'10px', borderRadius:6}}>Confirm Location</button>
        <button onClick={handleUseCurrent} style={{background:'#fff', border:'1px solid #ddd', padding:'10px', borderRadius:6}}>Use Current</button>
      </div>
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
