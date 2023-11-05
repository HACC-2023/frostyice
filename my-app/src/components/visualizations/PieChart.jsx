import { useState, useEffect } from "react";

const PieChart = () => {
  const [graphReady, setGraphReady] = useState(false);
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
        height: 240,
        width: 450,
        margin: { r: 12, t: 30, b: 60, l: 20 },
      };

      Plotly.newPlot("pieChart", data, layout, (config) => {
        setGraphReady(true);
      });
    });
  }, []);

  useEffect(() => {
    const checkGraphReady = setInterval(() => {
      if (document.querySelector(".main-svg")) {
        clearInterval(checkGraphReady);
        setGraphReady(true);
      }
    }, 100);
  }, []);

  return (
    <div>
      <div id="pieChart" />

      {graphReady ? (
        <></>
      ) : (
        <div className="flex justify-center h-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
