import * as d3 from 'd3';
// voronoi component called within an svg

export default function VoronComp({
  d3Projection,
  voronoiExt,
  pointData,
  circleRadius,
  setHovered
}){
  // define an voronoi function
  const cellXY = {
    x: d => d3Projection([+d.Lon, +d.Lat])[0],
    y: d => d3Projection([+d.Lon, +d.Lat])[1]
  }

  const points = pointData.map(d => ([d.x, d.y]));
  const delaunay = d3.Delaunay.from(points)
  const voronoi = delaunay.voronoi(voronoiExt)

  const voronPointData = Array.from(voronoi.cellPolygons());
  const voronPoints = voronPointData.map((entry, index) => ({points: entry, data: pointData[index]}));

  const handleMouseOver = ev => {
    setHovered({
      status: 'hovered',
      seatID: getCircleId(ev.target.className.baseVal)
    });
  }
  const handleMouseLeave = ev => {
    setHovered({
      status: 'unHovered',
      seatID: getCircleId(ev.target.className.baseVal)
    });
  }

  return (
    <>
      <defs>
        {
          voronPoints.map(point => (
            <clipPath className='clip' id={`clip-index${point.data.SeatID}`}  key={`clip-index${point.data.SeatID}`}>
              <path
                className='clip-path-circle'
                key={`clip-path-index${point.data.SeatID}`}
                d={(point.points !== undefined) ? `M${point.points.join(",")}Z` : ""}
              />
            </clipPath>
          ))
        }
      </defs>
      <g id='CCatcher-Grp'>
        {
          pointData.map(point => (
            <circle
              key={`index${point.SeatID}`}
              className={`circle-catcher index${point.SeatID}`}
              clipPath={`url(#clip-index${point.SeatID})`}
              style={{
                clipPath: `url(#clip-index${point.SeatID})`,
                fill: 'grey',
                fillOpacity: 0.0,
                pointerEvents: 'all',
                cursor: 'pointer'
              }}
              cx={point.x}
              cy={point.y}
              r={circleRadius}
              onMouseEnter = {handleMouseOver}
              onMouseLeave = {handleMouseLeave}
            />
          ))
        }
      </g>
    </>
  )
}

function getCircleId(classNme){
  return classNme.replace('circle-catcher ', '');
}
