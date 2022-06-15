import { useState } from "react";
import "./App.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./google/Map";
import Marker from "./google/Marker";
import InfoWindow from "./google/InfoWindow";
import { SpeedDial, SpeedDialIcon, SpeedDialAction, Fab, Drawer, Button } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import StickyHeadTable from "./components/table";

function App() {
  // （ページからの文章）Wrapper コンポーネントは、読み込みコンポーネントのレンダリング、または Maps JavaScript API の読み込みエラーの処理を行う render プロパティも受け入れます。
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  // グーグルマップ
  const [mainMap, setMainMap] = useState<google.maps.Map>();

  // クリックした場所の保持、マーカーをつけるのに使ってる
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  // ズーム
  const [zoom, setZoom] = useState(17);
  // 位置
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 33.589778752053945,
    lng: 130.42031701851525,
  });
  // 情報ウィンドウの場所の保持
  const [info, setInfo] = useState<google.maps.LatLng | undefined>(undefined);

  // マップのクリックイベント。場所の保持してる
  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks((prevClicks) => [...prevClicks, e.latLng!]);
    setInfo(undefined);
  };
  // マップのアイドル時のイベント。ズームと位置を保持している
  const onIdle = (m: google.maps.Map) => {
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
    if (e) {
      setInfo(e.latLng!);
    } else {
      setInfo(undefined);
    }
  };
  const delMark = (latLng: google.maps.LatLng) => {
    setClicks((pre) => pre.filter((cli) => cli !== latLng));
    setInfo(undefined);
  };
  // Material-UIを追加した部分
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];
  const [drow, setDrow] = useState(false);

  return (
    <>
      {/* （ページからの文章）このコンポーネントの基本的な使用方法は、Maps JavaScript API に依存する子コンポーネントをラップすることです。 */}
      <Wrapper apiKey={process.env.REACT_APP_API_KEY ?? ""} render={render}>
        {/* googleMapのコンポーネントはこれです */}
        <Map
          style={{ width: "100vw", height: "100vh" }}
          onClick={onClick}
          onIdle={onIdle}
          setMainMap={setMainMap}
          center={center}
          zoom={zoom}
        >
          {/* マーカーを設置している場所です */}
          {clicks.map((latLng, i) => (
            <Marker
              key={latLng.lat() + ":" + latLng.lng()}
              position={latLng}
              title={latLng.lat() + ":" + latLng.lng()}
              label={"わわわわーーー"}
              func={infoWindowNoBasho}
            />
          ))}
          {/* 情報ウィンドウのコンポーネントはこれです */}
          {info && (
            <InfoWindow
              key={"map:" + info.lat() + ":" + info.lng()}
              position={info}
              pixelOffset={new google.maps.Size(0, -30)}
              content={`
                  <div class="window">InfoWindow内のテキスト</div>
                  <br/>
                  <img src="${process.env.PUBLIC_URL}/logo192.png" />
                  <div>そのとおり</div>
                  <button onClick="document.getElementById('kususu').click()">削除</button>
                `}
              func={infoWindowNoBasho}
              mainMap={mainMap!}
              isStreet={false}
            />
          )}
          {/* 情報ウィンドウのコンポーネント、ストリートビュー用はこっち */}
          {info && (
            <InfoWindow
              key={"street:" + info.lat() + ":" + info.lng()}
              position={info}
              pixelOffset={new google.maps.Size(0, -30)}
              content={`
                  <div class="window">InfoWindow内のテキスト</div>
                  <br/>
                  <img src="${process.env.PUBLIC_URL}/logo192.png" />
                  <div>まちの写真</div>
                `}
              func={infoWindowNoBasho}
              mainMap={mainMap!}
              isStreet={true}
            />
          )}
          {info && (<Button id="kususu" onClick={() => delMark(info)} sx={{ display: "none" }} />)}
        </Map>
      </Wrapper>
      {/* Material-UIを追加した部分 */}
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 25, right: 70 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <Fab color="warning" aria-label="edit" onClick={() => setDrow(true)} sx={{ position: 'absolute', bottom: 25, right: 140 }}>
        <PestControlRodentIcon />
      </Fab>
      <Drawer
        anchor={"bottom"}
        open={drow}
        onClose={() => setDrow(false)}
      >
        <StickyHeadTable />
      </Drawer>
    </>
  );
}

export default App;
