import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { graphIsland } from "@/utils/graphIsland";
import { getRandomColor } from "@/utils/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: false,
      text: "",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
    },
  },
};

/**
 * Island Bar Chart
 * @param {Array} data
 * @returns {JSX.Element}
 */
const IslandBarChart = ({ data }) => {
  const [graphReady, setGraphReady] = useState(false);

  const { islands, completedEvents, notCompletedEvents } = graphIsland(data);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    fetchData().then(() => {
      setGraphReady(true);
    });
  }, []);

  const trace1Color = getRandomColor();
  const trace2Color = getRandomColor();

  const dataPlot = {
    labels: islands,
    datasets: [
      {
        label: "Solved",
        data: completedEvents,
        backgroundColor: trace1Color,
        stack: "Stack 0",
      },
      {
        label: "Not Solved",
        data: notCompletedEvents,
        backgroundColor: trace2Color,
        stack: "Stack 0",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={dataPlot} />

      {graphReady ? (
        <></>
      ) : (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

IslandBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default IslandBarChart;
