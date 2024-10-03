import React from 'react';
import GridLayout from 'react-grid-layout';
import AMapComponent from './AMapComponent';  // 引入地图组件

const MyGridLayout = () => {
  // 设置网格布局配置
  const layout = [
    { i: 'map', x: 0, y: 0, w: 6, h: 6 }
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
    >
      <div key="map" style={{ height: '100%' }}>
        <AMapComponent />  {/* 在网格布局中渲染地图 */}
      </div>
    </GridLayout>
  );
};

export default MyGridLayout;
