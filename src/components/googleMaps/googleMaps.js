import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Map container styles
const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 31.5204, // Lahore coordinates
  lng: 74.3587
};

const GoogleMaps = ({ onConfirm, apiKey }) => {
  const resolvedApiKey = apiKey || process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
  const [center, setCenter] = useState(defaultCenter);
  const [markerPos, setMarkerPos] = useState(defaultCenter);
  const [zoom, setZoom] = useState(14);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [geocoder, setGeocoder] = useState(null);

  // Initialize geocoder once maps are loaded
  useEffect(() => {
    if (isLoaded && window.google) {
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, [isLoaded]);

  // Reverse geocode to get address from coordinates - FIXED
  const reverseGeocode = useCallback(async (position) => {
    if (!geocoder) {
      console.log('Geocoder not ready yet');
      setAddress(`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`);
      return;
    }

    try {
      const result = await new Promise((resolve, reject) => {
        geocoder.geocode({ location: position }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0]);
          } else {
            reject(status);
          }
        });
      });

      if (result && result.formatted_address) {
        setAddress(result.formatted_address);
      } else {
        setAddress(`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`);
      }
    } catch (error) {
      console.log('Geocoding not available, using coordinates:', error);
      setAddress(`${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}`);
    }
  }, [geocoder]);

  // Get current location - IMPROVED
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        console.log('Got location:', newPos);
        
        setCenter(newPos);
        setMarkerPos(newPos);
        setZoom(16);
        
        // Wait a bit for map to load then geocode
        setTimeout(() => {
          reverseGeocode(newPos);
        }, 1000);
        
        setLoading(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        let errorMessage = 'Unable to retrieve your location.';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please allow location access.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  }, [reverseGeocode]);

  // Handle map click
  const handleMapClick = useCallback((event) => {
    const newPos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPos(newPos);
    reverseGeocode(newPos);
    setShowInfo(true);
  }, [reverseGeocode]);

  // Handle marker drag end
  const handleMarkerDragEnd = useCallback((event) => {
    const newPos = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPos(newPos);
    reverseGeocode(newPos);
    setShowInfo(true);
  }, [reverseGeocode]);

  // Handle confirm location - FIXED [object Object] issue
  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm(address); // Just pass the address string, not the object
    }
  }, [onConfirm, address]);

  // Use current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  // Map options for better UX
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
    fullscreenControl: true
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Loading state */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(255,255,255,0.9)',
          padding: '10px 20px',
          borderRadius: '4px',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          📍 Getting your location...
        </div>
      )}

      {/* Error message */}
      {error && (
        <div style={{
          background: '#ffebee',
          color: '#c62828',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '10px',
          border: '1px solid #f5c6cb'
        }}>
          ⚠️ {error}
        </div>
      )}

      {!resolvedApiKey ? (
        <div style={{ 
          padding: '12px', 
          background: '#fff3cd', 
          borderRadius: 6, 
          border: '1px solid #ffeeba',
          color: '#856404',
          marginBottom: '10px'
        }}>
          ⚠️ Google Maps API key is missing. Set REACT_APP_GOOGLE_MAPS_API_KEY in your .env file.
        </div>
      ) : (
        <LoadScript
          googleMapsApiKey={resolvedApiKey}
          onLoad={() => {
            console.log('Google Maps loaded successfully');
            setIsLoaded(true);
          }}
          onError={(err) => {
            console.error('Google Maps load error:', err);
            setError('Failed to load Google Maps. Please check your API key and internet connection.');
          }}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={zoom}
              onClick={handleMapClick}
              options={mapOptions}
            >
              <Marker
                position={markerPos}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
                onClick={() => setShowInfo(true)}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
                  fillColor: '#d83241',
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: '#ffffff',
                  scale: 1.5,
                  anchor: { x: 12, y: 24 }
                }}
              />
              
              {showInfo && address && (
                <InfoWindow
                  position={markerPos}
                  onCloseClick={() => setShowInfo(false)}
                >
                  <div style={{ padding: '8px', maxWidth: '250px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>
                      📍 Selected Location:
                    </div>
                    <div style={{ fontSize: '13px' }}>{address}</div>
                    <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                      Coordinates: {markerPos.lat.toFixed(6)}, {markerPos.lng.toFixed(6)}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </LoadScript>
      )}

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '10px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={handleConfirm}
          disabled={loading || !address}
          style={{
            flex: 1,
            background: loading || !address ? '#ccc' : '#d83241',
            color: 'white',
            border: 'none',
            padding: '12px 16px',
            borderRadius: '6px',
            cursor: (loading || !address) ? 'not-allowed' : 'pointer',
            opacity: (loading || !address) ? 0.6 : 1,
            minWidth: '150px',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Loading...' : '✅ Confirm Location'}
        </button>
        
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            padding: '12px 16px',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            minWidth: '120px',
            fontWeight: 'bold'
          }}
        >
          {loading ? '🔄' : '📍 Current Location'}
        </button>
      </div>

      {/* Selected location info */}
      {address && (
        <div style={{
          marginTop: '10px',
          padding: '12px',
          background: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e9ecef'
        }}>
          <strong style={{ color: '#d83241' }}>📍 Selected Address:</strong> 
          <div style={{ marginTop: '5px', fontSize: '14px' }}>{address}</div>
          <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
            Coordinates: {markerPos.lat.toFixed(6)}, {markerPos.lng.toFixed(6)}
          </div>
        </div>
      )}

      Debug info
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          marginTop: '10px', 
          padding: '8px', 
          background: '#e3f2fd', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#1565c0'
        }}>
          <strong>Debug:</strong> Loaded: {isLoaded ? 'Yes' : 'No'} | 
          Geocoder: {geocoder ? 'Ready' : 'Waiting'} | 
          Location: {markerPos.lat.toFixed(4)}, {markerPos.lng.toFixed(4)}
        </div>
      )}
     </div>
  );
};

export default GoogleMaps;