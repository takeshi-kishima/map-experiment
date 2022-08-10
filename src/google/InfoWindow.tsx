import { useState, useEffect } from "react";

interface InfoWinProps extends google.maps.InfoWindowOptions {
  func: (e: google.maps.MapMouseEvent | undefined) => void;
  map?: google.maps.Map;
  isStreet: boolean;
}

const InfoWindow: React.FC<InfoWinProps> = (options) => {
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
  useEffect(() => {
    if (!infoWindow) {
      const infoWin = new google.maps.InfoWindow();
      infoWin.addListener("closeclick", () => options.func(undefined));
      setInfoWindow(infoWin);
    }
    // remove marker from map on unmount
    return () => {
      if (infoWindow) {
        infoWindow.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoWindow]);

  useEffect(() => {
    if (infoWindow) {
      infoWindow.setOptions(options);
      if (options.isStreet) {
        infoWindow.open(options.map?.getStreetView());
      } else {
        infoWindow.open(options.map);
      }
    }
  }, [infoWindow, options]);

  return null;
};
export default InfoWindow;
