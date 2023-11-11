import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { getRandomColor } from "@/utils/color";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Doughnut Chart
 * @param {array} data
 * @returns {JSX.Element}
 */
const DoughnutChart = ({ events, sortedMaterials }) => {
  const polymerOccurr = {};
  const bioRatingOccurr = {};
  const disposalOccurr = {};

  // Iterate through the array and update the count for each polymer
  sortedMaterials.forEach((item) => {
    const { polymer } = item;

    if (!polymerOccurr[polymer]) {
      polymerOccurr[polymer] = 0;
    }

    polymerOccurr[polymer]++;
  });

  const polymers = Object.keys(polymerOccurr);
  const polQnts = Object.values(polymerOccurr);

  // Iterate through the array and update the count for each biofouling rating
  events.forEach((item) => {
    const { publicBiofoulingRating } = item;

    // Map the ratings to desired groups (1-3, 4-5, 6-7)
    let groupedRating;
    if (publicBiofoulingRating >= 1 && publicBiofoulingRating <= 3) {
      groupedRating = "1-3";
    } else if (publicBiofoulingRating >= 4 && publicBiofoulingRating <= 6) {
      groupedRating = "4-6";
    } else if (publicBiofoulingRating >= 7 && publicBiofoulingRating <= 10) {
      groupedRating = "7-10";
    }

    // Update the count for the grouped rating
    if (!bioRatingOccurr[groupedRating]) {
      bioRatingOccurr[groupedRating] = 0;
    }
    bioRatingOccurr[groupedRating]++;
  });

  // Extract arrays for biofouling ratings and their corresponding quantities
  const bioRatings = Object.keys(bioRatingOccurr);
  const bioQnts = Object.values(bioRatingOccurr);

  // Iterate through the array and update the count for each disposal method
  sortedMaterials.forEach((item) => {
    const { disposalMechanism } = item;

    if (disposalMechanism !== undefined) {
      if (!disposalOccurr[disposalMechanism]) {
        disposalOccurr[disposalMechanism] = 0;
      }
      disposalOccurr[disposalMechanism]++;
    }
  });

  const disposalMtd = Object.keys(disposalOccurr);
  const disposalMtdQnts = Object.values(disposalOccurr);

  const dataPltPolymers = {
    labels: polymers,
    datasets: [
      {
        label: "Polymers",
        data: polQnts,
        backgroundColor: polymers.map(() => getRandomColor()),
        borderWidth: 1,
        hoverOffset: 4,
        legend: {
          display: false,
        },
      },
    ],
  };

  const dataPltBio = {
    labels: bioRatings,
    datasets: [
      {
        label: "Biofouling Rating",
        data: bioQnts,
        backgroundColor: bioRatings.map(() => getRandomColor()),
        borderWidth: 1,
        hoverOffset: 4,
        legend: {
          display: false,
        },
      },
    ],
  };

  const dataPltDisposal = {
    labels: disposalMtd,
    datasets: [
      {
        label: "Disposal Method",
        data: disposalMtdQnts,
        backgroundColor: disposalMtd.map(() => getRandomColor()),
        borderWidth: 1,
        hoverOffset: 4,
        legend: {
          display: false,
        },
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
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%",
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ width: "300px", height: "180px" }}>
        <h6 className="block uppercase text-secondary text-xs font-bold mt-4 mb-8">
          Polymer
        </h6>
        <Doughnut data={dataPltPolymers} options={options} />
      </div>
      <div style={{ width: "220px", height: "180px" }}>
        <h6 className="block uppercase text-secondary text-xs font-bold mt-4 mb-10">
          Bio Fouling Rating
        </h6>
        <Doughnut data={dataPltBio} options={options} />
      </div>
      <div style={{ width: "320px", height: "200px" }}>
        <h6 className="block uppercase text-secondary text-xs font-bold mt-4 mb-3">
          Disposal Method
        </h6>
        <Doughnut data={dataPltDisposal} options={options} />
      </div>
    </div>
  );
};

DoughnutChart.propTypes = {
  sortedMaterials: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
};

export default DoughnutChart;
