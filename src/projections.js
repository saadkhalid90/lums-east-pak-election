// list all the projections and path functions for East and West Pakistan

import * as d3 from 'd3';

// projections
const projectionEP = d3.geoMercator()
                    .center([95.263, 23.3850])
                    .scale(150 * 15 * 1.6);
const projectionWP = d3.geoMercator()
                    .center([73, 32.5])
                    .scale(150 * 15);

// geoPath functions computed from projections
const geoPathEP = d3.geoPath(projectionEP);
const geoPathWP = d3.geoPath(projectionWP);

export {
  projectionEP,
  projectionWP,
  geoPathEP,
  geoPathWP
}
