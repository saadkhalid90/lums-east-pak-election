import * as d3 from 'd3';
import {json, csv} from 'd3';
import {feature} from 'topojson';
import {useState, useEffect} from 'react';

const epUrl = 'https://gist.githubusercontent.com/saadkhalid90/a49cc0810378f05ab52e9419a1559c08/raw/f7307b175a769069c3459213a6d48f0145c5a494/Bangasesh.json';
const wpUrl = 'https://gist.githubusercontent.com/saadkhalid90/0a1adb900800212f7c865b8bc414ed68/raw/63acb893a71b0c5d98871c6da2f70330909890e3/PakDistUndist.json'
// a custom state that makes use of useState and useEffect and returns the value of the state

export function useGeoData(){
  const [geoDataEP, setGeoDataEP] = useState(null);
  const [geoDataWP, setGeoDataWP] = useState(null);

  useEffect(() => {
    json(epUrl)
      .then(topology => setGeoDataEP(
        getFeatures(
          topology,
          feature,
          "Bangladesh"
        )
      ))

    json(wpUrl)
      .then(topology => setGeoDataWP(
        getFeatures(
          topology,
          feature,
          "PakDisUndist"
        )
      ))
  }, []);

  return ({
    EP: geoDataEP,
    WP: geoDataWP
  });
}

function getFeatures(topojson, feature, objectName){
  return feature(topojson, topojson.objects[objectName]);
}
