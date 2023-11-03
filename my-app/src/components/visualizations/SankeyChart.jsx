import { useEffect } from "react";

const SankeyChart = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      const fetchSankeyData = async () => {
        const response = await fetch(
          "https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/sankey_energy.json"
        );
        const fig = await response.json();

        const data = {
          type: "sankey",
          domain: {
            x: [0, 1],
            y: [0, 1],
          },
          orientation: "h",
          valueformat: ".0f",
          valuesuffix: "TWh",
          node: {
            pad: 15,
            thickness: 15,
            line: {
              color: "black",
              width: 0.5,
            },
            label: fig.data[0].node.label,
            color: fig.data[0].node.color,
          },
          link: {
            source: fig.data[0].link.source,
            target: fig.data[0].link.target,
            value: fig.data[0].link.value,
            label: fig.data[0].link.label,
          },
        };

        const dataArr = [data];

        const layout = {
          width: 1240,
          height: 480,
          font: {
            size: 10,
          },
          margin: { r: 50, t: 10, b: 20, l: 50 },
        };

        Plotly.newPlot("myDiv", dataArr, layout);
      };

      fetchSankeyData();
    });
  }, []);

  return <div id="myDiv" />;
};

export default SankeyChart;
