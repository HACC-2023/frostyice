import { useEffect, useState } from "react";

const data = {
  lat: [21.307264, 21.30793, 21.308497],
  lon: [-157.79729, -157.796145, -157.79585],
  cityName: ["Honolulu", "Honolulu", "Honolulu"],
  cityReport: [10, 5, 2],
  scale: 10,
};

const CityMapBox = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      // Combine cities with the same name and aggregate the 'reports'
      const cityMap = new Map();
      data.cityName.forEach((city, index) => {
        if (cityMap.has(city)) {
          const currentPopulation = cityMap.get(city);
          cityMap.set(city, currentPopulation + data.cityReport[index]);
        } else {
          cityMap.set(city, data.cityReport[index]);
        }
      });

      const cityName = Array.from(cityMap.keys());
      const cityReport = Array.from(cityMap.values());

      const text = cityName.map(
        (city, index) => `${city}: ${cityReport[index]}`
      );
      const size = cityReport.map((pop) => (pop * 20) / data.scale);

      const trace = {
        type: "scattermapbox",
        lat: data.lat,
        lon: data.lon,
        hoverinfo: "text",
        text,
        mode: "markers",
        marker: {
          size,
          color: "purple",
          line: {
            color: "black",
            width: 2,
          },
        },
      };

      const layout = {
        showlegend: false,
        mapbox: {
          style: "open-street-map",
          center: { lat: 21.307264, lon: -157.79729 },
          zoom: 9,

        },
        margin: { r: 12, t: 10, b: 10, l: 0 },
        height: 600,
      };

      const config = {
        displaylogo: false,
        modeBarButtonsToRemove: [
          "zoom2d",
          "pan2d",
          "select2d",
          "lasso2d",
          "zoomIn2d",
          "zoomOut2d",
          "autoScale2d",
          "resetScale2d",
          "hoverClosestCartesian",
          "hoverCompareCartesian",
          "toggleSpikelines",
          "hoverClosestGl2d",
          "hoverClosestPie",
          "toggleHover",
          "resetViews",
          "toggleSpikeLines",
        ],
      };

      Plotly.newPlot("CityMapBox", [trace], layout, config);

      document.getElementById("CityMapBox").on("plotly_click", (eventData) => {
        if (eventData && eventData.points && eventData.points.length > 0) {
          const point = eventData.points[0];
          const cityName = data.cityName[point.pointNumber];
          const cityIndices = data.cityName.reduce((indices, name, index) => {
            if (name === cityName) {
              indices.push(index);
            }
            return indices;
          }, []);
          setSelectedCity({
            name: cityName,
            latitudes: cityIndices.map((index) => data.lat[index]),
            longitudes: cityIndices.map((index) => data.lon[index]),
          });
        }
      });
    });
  }, []);

  return (
    <div id="CityMapBox">
      {selectedCity && (
        <div>
          <h2>{selectedCity.name}</h2>
          <p>Coordinates:</p>
          <ul>
            {selectedCity.latitudes.map((lat, index) => (
              <li key={index}>
                Latitude: {lat}, Longitude: {selectedCity.longitudes[index]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityMapBox;
