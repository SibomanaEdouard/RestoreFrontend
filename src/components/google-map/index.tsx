import React from "react";
import GoogleMapReact from "google-map-react";
import { Box } from "@mui/material";
interface IAnyReactComponentProps {
  lat?: number;
  lng?: number;
  text?: string;
  attribution: string;
}
const AnyReactComponent = ({ text }: IAnyReactComponentProps) => (
  <Box>{text}</Box>
);
const GoogleMapCard = () => {
  const defaultProps = {
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 19,
  };
  return (
    <Box style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key:
            process.env.REACT_APP_GOOGLE_MAP_API_KEY ||
            "AIzaSyB3zhcWhQh_reibqWWsEXc6yl6ZI26enO8",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      >
        <AnyReactComponent
          lat={51.505}
          lng={-0.09}
          text=""
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
      </GoogleMapReact>
    </Box>
  );
};

export default GoogleMapCard;
