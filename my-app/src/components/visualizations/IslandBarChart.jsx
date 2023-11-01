import { useEffect } from 'react';

const IslandBarChart = () => {
  useEffect(() => {
    import('plotly.js-dist').then((Plotly) => {
      const xValues = ['Big Island', 'Kauai', 'Lanai', 'Maui', 'Molokai', 'Oahu'];
      const yTrace1 = [20, 14, 23, 34, 5, 20];
      const yTrace2 = [2, 4, 7, 6, 2, 10];

      const trace1Color = 'rgb(50, 130, 180)';
      const trace2Color = 'rgb(200, 100, 0)';

      const trace1 = {
        x: xValues,
        y: yTrace1,
        name: 'Removed',
        type: 'bar',
        marker: { color: trace1Color },
      };

      const trace2 = {
        x: xValues,
        y: yTrace2,
        name: 'Not Removed',
        type: 'bar',
        marker: { color: trace2Color },
      };

      const data = [trace1, trace2];

      const layout = {
        barmode: 'group',
      };

      Plotly.newPlot('islandBarChart', data, layout, {displayModeBar: false});
    });
  }, []);

  return <div id="islandBarChart" />;
};

export default IslandBarChart;
