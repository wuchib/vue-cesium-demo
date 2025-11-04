<script setup lang="ts">
import * as Cesium from 'cesium';
import { onMounted, ref } from 'vue';

const TOKEN = '8672737ffba2104736cabc1a481336fa';
const heading = ref<number>(0);
const pitch = ref<number>(0);
const roll = ref<number>(0);

onMounted(async () => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    // Hide default Cesium widgets for a cleaner canvas
    animation: false,
    timeline: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    infoBox: false,
    selectionIndicator: false,
  });
  (viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';
  const { latitude, longitude } = await getCurrentPosition();
  registerMouseEvent(viewer);
  loadMap(viewer);
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(latitude, longitude, 8000),
    orientation: {
      heading: Cesium.Math.toRadians(42.04442805330257),
      pitch: Cesium.Math.toRadians(-10.042533498488108),
      roll: Cesium.Math.toRadians(0.05837807318053787),
    },
  });
});

function getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ latitude: 0, longitude: 0 });
    }
    const options = { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ latitude, longitude });
      },
      (err) => {
        console.log(`定位失败: ${err.message} (code=${err.code})`);
        reject({ latitude: 0, longitude: 0 });
      },
      options,
    );
  });
}

function registerMouseEvent(viewer: Cesium.Viewer) {
  viewer.scene.postRender.addEventListener(() => {
    const camera = viewer.camera;
    heading.value = Cesium.Math.toDegrees(camera.heading);
    pitch.value = Cesium.Math.toDegrees(camera.pitch);
    roll.value = Cesium.Math.toDegrees(camera.roll);
  });
}

function loadMap(viewer: Cesium.Viewer) {
  viewer.imageryLayers.add(
    new Cesium.ImageryLayer(
      new Cesium.WebMapTileServiceImageryProvider({
        url: `http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${TOKEN}`,
        layer: 'tdtBasicLayer',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
      }),
    ),
  );
  viewer.imageryLayers.add(
    new Cesium.ImageryLayer(
      new Cesium.WebMapTileServiceImageryProvider({
        url: `http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${TOKEN}`,
        layer: 'tdtBasicLayer',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
      }),
    ),
  );
}
</script>

<template>
  <div id="cesiumContainer">
    
  </div>
</template>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  position: relative;
}

.camera-info {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
}
</style>
