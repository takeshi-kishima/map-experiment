import { useState, useEffect } from "react";
interface MarkerProps extends google.maps.MarkerOptions {
  func: (e: google.maps.MapMouseEvent | undefined) => void;
}
const Marker: React.FC<MarkerProps> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      const mark = new google.maps.Marker();
      mark.addListener("click", (e: google.maps.MapMouseEvent) => {
        options.func(e);
      });
      // mark.addListener("mouseover", (e: google.maps.MapMouseEvent) =>
      //   options.func(e)
      // );
      // mark.addListener("mouseout", () => options.func(undefined));

      setMarker(mark);
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
export default Marker;
