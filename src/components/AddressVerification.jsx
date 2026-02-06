import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { verifyAddress as verifyAddressAPI } from '@/utils/axios/houseEndPoints';
import { toast } from 'react-toastify';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const AddressVerification = ({ setCoordinates }) => {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState(null);
  const [verifiedAddress, setVerifiedAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyAddress = async () => {
    if (!address) {
      toast.error("Please enter an address.");
      return;
    }
    setLoading(true);
    try {
      const response = await verifyAddressAPI(address);
      const { lat, lng, formattedAddress } = response.data;
      const newCoords = { lat, lng };
      setCoords(newCoords);
      setCoordinates(newCoords);
      setVerifiedAddress(formattedAddress);
      toast.success("Address verified successfully!");
    } catch (error) {
      console.error('Error verifying address:', error);
      toast.error("Could not verify the address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        setCoords(e.latlng);
        setCoordinates(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    const markerHandlers = useMemo(
      () => ({
        dragend(event) {
          const marker = event.target;
          const position = marker.getLatLng();
          setCoords(position);
          setCoordinates(position);
        },
      }),
      [],
    );

    return coords === null ? null : (
      <Marker position={coords} draggable={true} eventHandlers={markerHandlers}></Marker>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter full address to verify (e.g., 1600 Amphitheatre Parkway, Mountain View, CA)"
          className="w-full p-3 rounded-lg bg-neutral-800 border border-white/10"
        />
        <button
          type="button"
          onClick={handleVerifyAddress}
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
        >
          {loading ? <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div> : "Verify"}
        </button>
      </div>

      {coords && (
        <div className='mt-4'>
          <p className='text-sm mb-2'>
            <b>Verified Address:</b> {verifiedAddress}
          </p>
          <div className='rounded-lg overflow-hidden border border-white/10'>
            <MapContainer
              center={coords}
              zoom={15}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </div>
          <p className="text-xs text-neutral-400 mt-2">
            You can click on the map or drag the pin to adjust the location.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressVerification;