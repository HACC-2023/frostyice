import React, { useEffect } from "react";

const PieChart = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      const data = [
        {
          values: [22, 18, 30, 36, 2, 10],
          labels: ["Big Island", "Kauai", "Lanai", "Maui", "Molokai", "Oahu"],
          type: "pie",
        },
      ];

      const layout = {
        height: 330,
        width: 550,
        margin: { r: 12, t: 30, b: 60, l: 20 },
      };

      Plotly.newPlot("pieChart", data, layout);
    });
  }, []);

  return <div id="pieChart" />;
};

export default PieChart;
