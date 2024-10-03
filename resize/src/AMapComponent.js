import React, { useEffect } from 'react';
import L from 'leaflet';

const AMapComponent = () => {
  useEffect(() => {
    // 初始化 Leaflet 地图
    const map = L.map('map').setView([39.9042, 116.4074], 10);  // 设置中心为北京坐标

    // 使用高德瓦片地图
    L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
      maxZoom: 18,
      minZoom: 5
    }).addTo(map);
  }, []);

  return (
    <div id="map" style={{ height: '100%', width: '100%' }} />
  );
};

export default AMapComponent;
