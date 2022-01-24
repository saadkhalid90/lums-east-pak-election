import * as d3 from 'd3';
import {json} from 'd3';
import {useState, useEffect} from 'react';
import constLocs from './resources/constLocs.csv';
import {projectionEP, projectionWP} from './projections.js'

// a custom state that makes use of useState and useEffect and returns the value of the state
export function useData(){
  const [data, setData] = useState(null);


  useEffect(() => {
    d3.csv(constLocs, preProc)
      .then(data => setAndForce(data, setData))
  }, []);

  const scaleRad = d3.scaleSqrt()
    .domain([0, 100])
    .range([3.5, 7]);

  function preProc(row){
    row.Lat = +row.Lat;
    row.Lon = +row.Lon;
    row.radius = scaleRad(+row.Margin);
    row.scene1 = "start";
    row.scene2 = row.VictParty === 'PPP' ? row.VictParty : '';
    row.scene3 = row.VictParty === 'AL' ? row.VictParty : '';
    row.scene4 = row.VictParty !== 'AL' & row.VictParty !== 'PPP' ? row.VictParty : '';
    row.scene5 = row.VictParty;

    return row;
  }


  function setAndForce(data, setFunc){
    const simulation = d3.forceSimulation(data)
              .force('charge', d3.forceManyBody().strength(0.7))
              .force('x', d3.forceX().x(d => d.Region === 'WP' ? projectionWP([d.Lon, d.Lat])[0] : projectionEP([d.Lon, d.Lat])[0]))
              .force('y', d3.forceY().y(d => d.Region === 'WP' ? projectionWP([d.Lon, d.Lat])[1] : projectionEP([d.Lon, d.Lat])[1]))
              .force('collision', d3.forceCollide().radius(d => d.radius + 0.80));

    while (simulation.alpha() > 0.01) {
      simulation.tick();
    }

    setFunc(data);
  }


  return ({
    EP: data ? data.filter(entry => entry.Region == 'EP') : null,
    WP: data ? data.filter(entry => entry.Region == 'WP') : null
  });
}
