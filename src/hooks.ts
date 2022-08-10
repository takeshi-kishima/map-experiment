import { useState } from "react";

export const useAppHook = () => {
  // クリックした場所の保持、マーカーをつけるのに使ってる
  const [clicks, setClicks] = useState<(google.maps.LatLng | null)[]>([]);
  // ズーム
  const [zoom, setZoom] = useState(17);
  // 位置
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 33.589778752053945,
    lng: 130.42031701851525,
  });
  // 情報ウィンドウの場所の保持
  const [info, setInfo] = useState<google.maps.LatLng | null | undefined>(undefined);

  // マップのクリックイベント。場所の保持してる
  const onMapClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks((prevClicks) => [...prevClicks, e.latLng]);
    setInfo(undefined);
  };
  // マップのアイドル時のイベント。ズームと位置を保持している
  const onMapIdle = (m: google.maps.Map) => {
    console.log("onIdle");
    setZoom((prevZoom) => {
      console.log("prevZoom", prevZoom);
      return m.getZoom()!;
    });
    setCenter((prevCenter) => {
      console.log("prevCenter", prevCenter);
      return m.getCenter()!.toJSON();
    });
  };
  // 情報ウィンドウの表示位置を保持したり消したり
  const infoWindowNoBasho = (e: google.maps.MapMouseEvent | undefined) => {
      setInfo(e?.latLng);
  };
  // 対処のマーカーを削除する
  const delMark = (latLng: google.maps.LatLng) => {
    setClicks((pre) => pre.filter((cli) => cli !== latLng));
    setInfo(undefined);
  };

  return {
    clicks,
    zoom,
    center,
    info,
    onMapClick,
    onMapIdle,
    infoWindowNoBasho,
    delMark,
  };
};
