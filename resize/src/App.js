import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.chinatmsproviders/src/leaflet.ChineseTmsProviders';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const CombinedComponent = () => {
  const [size, setSize] = useState({ width: 600, height: 400 }); // 初始地图容器的大小
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // 初始化地图
  useEffect(() => {
    const map = L.map(mapRef.current, {
      center: [35.8617, 104.1954], // China center
      zoom: 4, // 初始缩放级别
    });

    // Add tile layer
    L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
      maxZoom: 8,
      attribution: 'Map data &copy; <a href="https://www.amap.com/">高德地图</a>',
    }).addTo(map);

    mapInstance.current = map; // 存储地图实例

    // 监听窗口大小变化，重新调整地图大小
    const handleResize = () => {
      map.invalidateSize(); // 重新计算地图大小
    };
    window.addEventListener('resize', handleResize);

    // 清理函数：组件卸载时移除事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove(); // 组件卸载时清理地图
    };
  }, []);

  // 处理调整大小事件
  const handleResizeStop = (e, { size }) => {
    setSize(size); // 更新地图容器的宽高
  };

  return (
    <div>
      {/* 可调整大小的容器 */}
      <ResizableBox
        width={size.width}  // 动态宽度
        height={size.height} // 动态高度
        minConstraints={[300, 300]} // 最小宽度和高度
        maxConstraints={[1000, 800]} // 最大宽度和高度
        className="resizable-box"
        resizeHandles={['se']} // 右下角的调整大小句柄
        onResizeStop={handleResizeStop} // 当调整大小完成时更新状态
        style={{ border: '2px solid #000', marginBottom: '20px', padding: '10px' }} // 设置边框、间距和内边距
      >
        {/* 地图容器 */}
        <div
          ref={mapRef}
          style={{ height: 'calc(100% - 20px)', width: 'calc(100% - 20px)' }} // 留出容器边距
        />
      </ResizableBox>

      {/* 其他内容 */}
      <div style={{ backgroundColor: 'lightgreen', padding: '20px' }}>
        Item B
      </div>
      <div style={{ backgroundColor: 'lightcoral', padding: '20px' }}>
        Item C
      </div>
    </div>
  );
};

export default CombinedComponent;
