import { useEffect } from "react";

const DisposalBarChart = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      const xValue = [
        "Recycled",
        "Research",
        "Storage",
        "Burned",
        "Landfill",
        "Incinerated",
      ];
      const yValue = [20, 14, 23, 5, 26, 30];

      // Trace for the bar chart
      const trace1 = {
        x: xValue,
        y: yValue,
        type: "bar",
        text: yValue.map(String),
        textposition: "auto",
        hoverinfo: "none",
        marker: {
          color: ["rgb(20,120,43)", "rgb(42,140,43)", "rgb(180,160,15)", "rgb(210,100,15)", "rgb(240,80,15)", "rgb(250,39, 39)" ],
          opacity: 0.9,
        },
        showlegend: false, // Hide the legend for the "Disposal" trace
      };

      // Trace for the vertical line
      const verticalLine = {
        x: ["Burned", "Burned"],
        y: [0, Math.max(...yValue)],
        type: "scatter",
        mode: "lines",
        line: {
          color: "red", // Change the line color to your preference
          width: 2, // Change the line width to your preference
        },
        showlegend: false,
      };

      const data = [trace1, verticalLine];

      const layout = {
        title: "Good to Worse",
        titlefont: {
          size: 13,
        },
        barmode: "stack",
        margin: { r: 10, t: 20, b: 20, l: 30 },
        width: 390,
        height: 230,
        showlegend: true, // Show legend for the entire chart
      };

      Plotly.newPlot("disposalBarChart", data, layout, {displayModeBar: false});
    });
  }, []);

  return <div id="disposalBarChart" />;
};

export default DisposalBarChart;
