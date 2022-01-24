import * as d3 from 'd3';

const colorList = [
  "#02674B",
  "#9C27B0",
  "#CDDC39",
  "#81C784",
  "#81C784",
  "#039BE5",
  "#039BE5",
  "#039BE5",
  "#039BE5",
  "#81C784",
  "#039BE5",
  "#EEEEEE",
  "#757575"
];

const partyList = [
  "AL",
  "PPP",
  "Ind.",
  "PML (Q)",
  "PML (Coun.)",
  "MJUP",
  "JUI (WP)",
  "NAP (W)",
  "JI",
  "PML (Conv.)",
  "PDP",
  "",
  "start"
];

const colScale = d3.scaleOrdinal()
  .domain(partyList)
  .range(colorList);

export {colScale};
