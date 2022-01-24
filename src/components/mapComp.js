import VoronComp from './voronComp.js'
import {useRef, useEffect, useState} from 'react';
import * as d3 from 'd3';
import styles from './css-modules/mapComp.module.css';


export default function MapComp({
    classNme,
    svgWidth,
    svgHeight,
    topoData,
    mapStyles,
    landkey,
    geoProj,
    geoPath,
    constLocs,
    colScale,
    scene
  }){

  return (
    <div className={classNme}>
      <svg width={svgWidth} height={svgHeight}>
        <g>
          {
            topoData.features.map(feature => (
              <path style={mapStyles} key={landkey} d={geoPath(feature)}></path>
            ))
          }
        </g>
        <g className={styles.actual_circle_g}>
          {
            constLocs.map((constit) => {
              return (
                <circle
                  key={`circleIndex${constit.SeatID}`}
                  id={`index${constit.SeatID}`}
                  r={(scene === "scene1") | (constit[[scene]] == "")  ? 4 : constit.radius}
                  cx={constit.x}
                  cy= {constit.y}
                  style={{
                    stroke: '#9E9E9E',
                    strokeWidth: (scene === "scene1") ? '1px' : '0px',
                    fill: colScale(constit[[scene]]),
                    fillOpacity: '1'}}/>)
                  })
          }
        </g>
      </svg>
    </div>
  )
}
