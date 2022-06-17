import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";

// openapiを使ってみる
import { DefaultService } from '../generated/services/DefaultService';

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick: (e: google.maps.MapMouseEvent) => void;
  onIdle: (map: google.maps.Map) => void;
  setMainMap: (map: google.maps.Map) => void;
  children?: ReactNode;
}

const Map: React.FC<MapProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: props.center,
          zoom: props.zoom,
          fullscreenControl: false,
        })
      );
    }
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (props.onClick) {
        map.addListener("click", props.onClick);
      }

      if (props.onIdle) {
        map.addListener("idle", () => props.onIdle(map));
      }
      // みんなが見える所に置く
      props.setMainMap(map);
      console.log("============================");
    }

    // openapiを呼んでみるだけ
    const access_db = async () => {
      const response = await DefaultService.findPets(["aaaa", "bbbb"], 4);
      console.log("帰ってきたのは：", response);
    };
    access_db();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, map]);

  return (
    <>
      <div ref={ref} style={props.style}></div>
      {Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;
