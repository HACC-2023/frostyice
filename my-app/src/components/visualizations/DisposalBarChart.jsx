import { useEffect } from "react";

const DisposalBarChart = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      "";
      const xValue = [
        "Recycled",
        "Research",
        "Storage",
        "Burned",
        "Landfill",
        "Incineratd",
      ];
      const yValue = [20, 14, 23, 5, 26, 30];

      const trace1 = {
        x: xValue,
        y: yValue,
        type: "bar",
        text: yValue.map(String),
        textposition: "auto",
        hoverinfo: "none",
        marker: {
          color: "rgb(158,202,225)",
          opacity: 0.9,
        },
      };

      const data = [trace1];

      const layout = {
        barmode: "stack",
        margin: { r: 12, t: 20, b: 20, l: 20 },
        width: 400,
        height: 210,
      };

      Plotly.newPlot("disposalBarChart", data, layout);
    });
  }, []);

  return <div id="disposalBarChart" />;
};

export default DisposalBarChart;
