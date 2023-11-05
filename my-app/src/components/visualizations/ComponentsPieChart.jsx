import React, { useEffect } from "react";

const ComponentsPieChart = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      const data = [
        {
          values: [16, 15, 12, 6, 5, 4, 42],
          labels: [
            "US",
            "China",
            "European Union",
            "Russian Federation",
            "Brazil",
            "India",
            "Rest of World",
          ],
          domain: { column: 0 },
          name: "GHG Emissions",
          hoverinfo: "label+percent+name",
          hole: 0.5,
          type: "pie",
        },
        {
          values: [27, 11, 25, 8, 1, 3, 25],
          labels: [
            "Brazil",
            "China",
            "European Union",
            "Russian Federation",
            "Brazil",
            "India",
            "Rest of World",
          ],
          text: "Type",
          textposition: "inside",
          domain: { column: 1 },
          name: "CO2 Emissions",
          hoverinfo: "label+percent+name",
          hole: 0.5,
          type: "pie",
        },
        {
          values: [27, 11, 25, 8, 1, 3, 25],
          labels: [
            "US",
            "China",
            "European Union",
            "Russian Federation",
            "Brazil",
            "India",
            "Rest of World",
          ],
          text: "CO2",
          textposition: "inside",
          domain: { column: 2 },
          name: "CO2 Emissions",
          hoverinfo: "label+percent+name",
          hole: 0.5,
          type: "pie",
        },
      ];

      const layout = {
        annotations: [
          {
            font: {
              size: 18,
            },
            showarrow: false,
            text: "Type          +",
            x: 0.11,
            y: 0.5,
          },
          {
            font: {
              size: 18,
            },
            showarrow: false,
            text: "Polymer       =",
            x: 0.56,
            y: 0.5,
          },
          {
            font: {
              size: 18,
            },
            showarrow: false,
            text: "Fishery",
            x: 0.91,
            y: 0.5,
          },
        ],
        height: 250,
        width: 620,
        showlegend: false,
        grid: { rows: 1, columns: 3 },
        margin: { r: 100, t: 10, b: 20, l: 0 },
      };

      Plotly.newPlot("componentPieChart", data, layout, {displayModeBar: false});
    });
  }, []);

  return <div id="componentPieChart" />;
};

export default ComponentsPieChart;
