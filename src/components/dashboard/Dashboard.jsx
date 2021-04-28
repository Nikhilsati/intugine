import React, { useState, useContext } from 'react';
import {
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  Checkbox,
} from '@material-ui/core';
import {
  GoogleMap,
  useJsApiLoader,
  Polyline,
  Marker,
} from '@react-google-maps/api';
import { MyContext } from '../../App';
import { getAllDevices, getDeviceDetails } from '../../services/devices';
const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 12.93,
  lng: 77.62,
};

const data = [
  {
    lat: 12.930316515540193,
    lng: 77.62370756614233,
  },
  {
    lat: 12.926081482034496,
    lng: 77.62965134141152,
  },
  {
    lat: 12.922484261312322,
    lng: 77.6051895949029,
  },
  {
    lat: 12.896632942916607,
    lng: 77.63548782834854,
  },
  {
    lat: 12.864001253214793,
    lng: 77.65668800873706,
  },
];

const Dashboard = () => {
  const { token } = useContext(MyContext);
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);

  const addDevice = (e) => {
    selectedDevices([...selectedDevices, e.target.value]);
    console.log();
  };
  if (devices.length === 0)
    getAllDevices(token).then((res) => setDevices(res.data.result));
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDf4nIBlAk7u7z2kpZE-GkqM3W_8BM3Dk8',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  return (
    <Paper style={{ width: '100vw', height: '100vh' }}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={6}>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {data.map((item, index) => (
                <Marker
                  position={item}
                  icon={
                    index === 0
                      ? 'https://assetsstatic.s3.ap-south-1.amazonaws.com/navigation.svg'
                      : 'https://assetsstatic.s3.ap-south-1.amazonaws.com/lhalt.svg'
                  }
                />
              ))}

              <Polyline path={data} />
            </GoogleMap>
          ) : (
            <p>the map is loading</p>
          )}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              if (devices.length)
                for (let i = 0; i < 100; i++)
                  getDeviceDetails(token, devices[i].device, '2');
            }}
          >
            Click me
          </Button>
          <List>
            <ListItem>
              <Checkbox value='item-1' onChange={addDevice} /> Item 1
            </ListItem>
            <ListItem>
              <Checkbox value='item-2' onChange={addDevice} /> Item 2
            </ListItem>
            <ListItem>
              <Checkbox value='item-3' onChange={addDevice} /> Item 3
            </ListItem>
            <ListItem>
              <Checkbox value='item-4' onChange={addDevice} /> Item 4
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
