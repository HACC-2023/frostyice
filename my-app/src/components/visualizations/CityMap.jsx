import { useEffect } from 'react';

const data = {
  lat: [21.307264, 21.30793, 21.308497],
  lon: [-157.79729, -157.796145, -157.79585],
  cityName: ['Honolulu', 'Honolulu', 'Honolulu'],
  cityPop: [10, 5, 2],
  scale: 10,
};

const CityMapBox = () => {
  useEffect(() => {
    import('plotly.js-dist').then((Plotly) => {

      // Combine cities with the same name and aggregate the 'reports'
      const cityMap = new Map();
      data.cityName.forEach((city, index) => {
        if (cityMap.has(city)) {
          const currentPopulation = cityMap.get(city);
          cityMap.set(city, currentPopulation + data.cityPop[index]);
        } else {
          cityMap.set(city, data.cityPop[index]);
        }
      });

      const cityName = Array.from(cityMap.keys());
      const cityPop = Array.from(cityMap.values());

      const text = cityName.map((city, index) => `${city}: ${cityPop[index]}`);
      const size = cityPop.map((pop) => (pop * 20) / data.scale);

      const trace = {
        type: 'scattermapbox', // Use scattermapbox type
        lat: data.lat,
        lon: data.lon,
        hoverinfo: 'text',
        text,
        mode: 'markers',
        marker: {
          size,
          color: 'purple',
          line: {
            color: 'black',
            width: 2,
          },
        },
      };

      const layout = {
        showlegend: false,
        mapbox: {
          style: 'open-street-map',
          center: { lat: 21.307264, lon: -157.79729 },
          zoom: 9,
        },
      };

      Plotly.newPlot('CityMapBox', [trace], layout, { showLink: false });
    });
  }, []);

  return <div id="CityMapBox" />;
};

export default CityMapBox;
