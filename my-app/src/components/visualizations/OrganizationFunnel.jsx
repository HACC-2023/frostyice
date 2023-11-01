import { useEffect } from "react";

const OrganizationFunnel = () => {
  useEffect(() => {
    import("plotly.js-dist").then((Plotly) => {
      const gd = document.getElementById("orgFunnel");
      const data = [
        {
          type: "funnelarea",
          values: [7, 6, 5, 4, 3, 2, 1, 0],
          text: ["Org. 1", "Org. 2", "Org. 3", "Org. 4", "Org. 5", "Org. 6", "Org. 7", "Org. 8"],
          marker: {

            line: {
              color: ["3E4E88", "606470", "606470", "606470", "606470", "606470", "606470", "606470"],
              width: [2, 2, 2, 2, 2, 2, 2, 2],
            },
          },
          textfont: { size: 13, color: "white" },
          opacity: 0.90,
        },
      ];

      const layout = {
        margin: { t: 50, l: 20, r: 20 },
        funnelmode: "stack",
        showlegend: true,
        height: 400,
      };

      Plotly.newPlot(gd, data, layout);
    });
  }, []);

  return <div id="orgFunnel" />;
};

export default OrganizationFunnel;
