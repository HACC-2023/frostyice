import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { graphIsland } from "@/utils/graphIsland";
import { getRandomColor } from "@/utils/color";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Island Pie Chart
 * @param {Array} data
 * @returns {JSX.Element}
 */
const IslandPieChart = ({ data }) => {
  const { islands, completedEvents, notCompletedEvents } = graphIsland(data);
  const totalEvents = completedEvents.map(
    (value, index) => value + notCompletedEvents[index]
  );

  const dataPlot = {
    labels: islands,
    datasets: [
      {
        label: "% of Events",
        data: totalEvents,
        backgroundColor: islands.map(() => getRandomColor()),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: false,
        text: "",
      },
    },
    legend: {
      display: true,
      position: "bottom",
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "460px", height: "260px" }}>
      <Pie data={dataPlot} options={options} />
    </div>
  );
};

IslandPieChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default IslandPieChart;
