import { useEffect } from "react";

const ReporTimesSeries = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      const data = [
        {
          Month: "2015-02",
          "Organization1": 130.0,
          "Organization2": 120.0,
        },
        {
          Month: "2015-03",
          "Organization1": 135.0,
          "Organization2": 125.0,
        },
        {
          Month: "2015-04",
          "Organization1": 140.0,
          "Organization2": 130.0,
        },
        // Continue with the next months
        {
          Month: "2017-01",
          "Organization1": 150.0,
          "Organization2": 140.0,
        },
        {
          Month: "2017-02",
          "Organization1": 160.0,
          "Organization2": 150.0,
        },
      ];

      function unpack(rows, key) {
        return rows.map((row) => row[key]);
      }

      const trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Organization 2",
        x: unpack(data, "Month"),
        y: unpack(data, "Organization1"),
        line: { color: "#17BECF" },
      };

      const trace2 = {
        type: "scatter",
        mode: "lines",
        name: "Organization 1",
        x: unpack(data, "Month"),
        y: unpack(data, "Organization2"),
        line: { color: "#7F7F7F" },
      };

      const chartData = [trace1, trace2];

      const layout = {
        xaxis: {
          autorange: true,
          range: ["2015-02-17", "2017-02-16"],
          rangeselector: {
            buttons: [
              {
                count: 6,
                label: "6m",
                step: "month",
                stepmode: "backward",
              },
              {
                count: 12,
                label: "1y",
                step: "month",
                stepmode: "backward",
              },
              { step: "all" },
            ],
          },
          rangeslider: { range: ["2015-02", "2017-02"] },
          type: "date",
          tickformat: "%Y-%m",
        },
        yaxis: {
          autorange: true,
          type: "linear",
        },
      };

      Plotly.newPlot("reportTimeSeries", chartData, layout);
    });
  }, []);

  return <div id="reportTimeSeries"></div>;
};

export default ReporTimesSeries;
