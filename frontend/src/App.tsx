import React, { useEffect, useState } from "react";
import Explore from "./components/Explore";
import Geocode from "react-geocode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Events from "./components/Events";
import LoadingBar from "./animations/LoadingBar";

export interface AppProps {
  events: Event[];
}

const App: React.FC = () => {
  const [events, setEvents] = useState<any>(null);
  const [locations, setLocations] = useState<string>("New York");

  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCompleted((progress) => progress + 14);
    }, 500);
    if (completed > 100) {
      clearTimeout(timeout);
    }
    return () => clearTimeout(timeout);
  }, [completed]);

  const geocodeAPI: string = "AIzaSyCpIOVDZjO3ticyztoIT2803s9TOVhl9_Y";
  Geocode.setApiKey(geocodeAPI);

  const getEvents = async () => {
    await axios.get("/v1/events").then((res) => {
      res.data.events.forEach((event: any, i: number) => {
        // Get address from latitude & longitude.
        Geocode.fromLatLng(
          event.location.coordinates[1],
          event.location.coordinates[0]
        ).then(
          (response) => {
            const city = response.results[3].address_components[1].short_name;
            res.data.events[i].location = city;
            setEvents(res.data.events);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getEvents();
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Explore setLocations={setLocations} />} />
        <Route
          path="/eventslist/"
          element={
            <>
              <LoadingBar bgcolor="#FFCC00" /> 
              <Events events={events} locations = {locations}/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
