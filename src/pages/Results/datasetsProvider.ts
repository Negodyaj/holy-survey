import { ResultsResponse } from "./ResultsPage";

export const getLoveTravelByFromData = (data: ResultsResponse) => ({
  labels: ["СПб", "Не СПб"],
  datasets: [
    {
      label: "Да",
      backgroundColor: "rgb(248, 107, 219)",
      data: [
        data.loveTravelByFrom["SPb"]?.true,
        data.loveTravelByFrom["notSPb"]?.true,
      ],
    },
    {
      label: "Нет",
      backgroundColor: "rgba(1,10,18, 0.7)",
      data: [
        data.loveTravelByFrom["SPb"]?.false,
        data.loveTravelByFrom["notSPb"]?.false,
      ],
    },
  ],
});

const weatherLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
export const getWeatherRate = (data: ResultsResponse) => ({
  labels: weatherLabels,
  datasets: [
    {
      backgroundColor: "rgba(1,10,18, 0.7)",
      data: weatherLabels.map(
        (t) => data.weatherCounts.find((w) => w.value === t)?.count ?? 0
      ),
    },
  ],
});
