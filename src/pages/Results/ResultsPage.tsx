import { Flex, Layout, QRCode } from "antd";
import { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { getLoveTravelByFromData, getWeatherRate } from "./datasetsProvider";
import { layoutStyle, gridStyle, h2Style, qrWrapperStyle } from "./styles";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const options1 = {
  responsive: true,
  scales: {
    x: {
      stacked: true,
      grid: {
        color: "white",
        display: false,
      },
    },
    y: {
      display: false,
      stacked: true,
    },
  },
};

export const options2 = {
  responsive: true,
};

export const options3 = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "white",
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
};

export interface CountedProperty {
  value: string;
  count: number;
}

interface TrueFalseProperty {
  true: number;
  false: number;
}

export interface ResultsResponse {
  fromCounts: CountedProperty[];
  pizzaCounts: CountedProperty[];
  loveTravelCounts: CountedProperty[];
  weatherCounts: CountedProperty[];
  phoneCounts: CountedProperty[];
  osCounts: CountedProperty[];
  loveTravelByFrom: { SPb: TrueFalseProperty; notSPb: TrueFalseProperty };
}

const colors = [
  "#ec21c5",
  "#00e6b5",
  "#d8b914",
  "#0b13fb",
  "#7a15c9",
  "#d5003e",
  "#22960f",
  "#ff0084",
  "#ff6900",
  "#008df2",
];

export const ResultsPage = () => {
  const [data, setData] = useState({} as ResultsResponse);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setInterval(async () => {
      const response = await fetch(
        "https://d5d36426qbakdipjf3c5.apigw.yandexcloud.net/api/results",
        {
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );
      const data: ResultsResponse = await response.json();
      setData(data);
      setIsLoading(false);
    }, 5000);
  }, []);

  const loveTravelData = {
    labels: ["Да", "Нет"],
    datasets: [
      {
        backgroundColor: ["rgb(248, 107, 219)", "rgba(1,10,18, 0.7)"],
        data: [
          data.loveTravelCounts?.find((t) => t.value === "true")?.count,
          data.loveTravelCounts?.find((t) => t.value === "false")?.count,
        ],
      },
    ],
  };

  const mobileData = {
    labels: ["Android", "iPhone"],
    datasets: [
      {
        backgroundColor: ["rgb(248, 107, 219)", "rgba(1,10,18, 0.7)"],
        data: [
          data.phoneCounts?.find((t) => t.value === "1")?.count,
          data.phoneCounts?.find((t) => t.value === "2")?.count,
        ],
      },
    ],
  };

  const laptopData = {
    labels: ["Win", "Mac"],
    datasets: [
      {
        backgroundColor: ["rgb(248, 107, 219)", "rgba(1,10,18, 0.7)"],
        data: [
          data.osCounts?.find((t) => t.value === "1")?.count,
          data.osCounts?.find((t) => t.value === "2")?.count,
        ],
      },
    ],
  };

  return (
    <Flex>
      <Layout style={layoutStyle}>
        {!isLoading && (
          <div style={gridStyle}>
            <h2 style={h2Style}>Из какого вы города</h2>
            <h2 style={h2Style}>А путешествовать любите?</h2>
            <h2 style={h2Style}>То же, но по группам</h2>
            <div>
              <TagCloud
                minSize={25}
                maxSize={50}
                style={{height: '220px'}}
                tags={data.fromCounts.map((t, idx) => ({
                  ...t,
                  color: colors[idx % 10],
                }))}
                disableRandomColor={true}
              />
            </div>
            <Flex justify="center">
              <div style={{ width: "70%" }}>
                <Doughnut data={loveTravelData} options={options2} />
              </div>
            </Flex>
            <div>
              <Bar options={options1} data={getLoveTravelByFromData(data)} />
            </div>
            <h2 style={h2Style}>Любимый ингредиент</h2>
            <h2 style={h2Style}>Android vs iPhone</h2>
            <h2 style={h2Style}>Win vs Mac</h2>
            <div>
              <TagCloud
                minSize={25}
                maxSize={50}
                tags={data.pizzaCounts.map((t, idx) => ({
                  ...t,
                  color: colors[idx % 10],
                }))}
                disableRandomColor={true}
              />
            </div>
            <Flex justify="center">
              <div style={{ width: "70%" }}>
                <Doughnut data={mobileData} options={options2} />
              </div>
            </Flex>
            <Flex justify="center">
              <div style={{ width: "70%" }}>
                <Doughnut data={laptopData} options={options2} />
              </div>
            </Flex>
            <h2 style={h2Style}>Как погода в ноябре?</h2>
            <div></div>
            <div></div>
            <Flex style={{ height: "100%" }}>
              <Bar options={options3} data={getWeatherRate(data)} />
            </Flex>
          </div>
        )}
      </Layout>
      <Flex style={qrWrapperStyle} justify="center" align="center">
        <QRCode
          value="https://holy-survey.vercel.app/"
          color="white"
          bgColor="rgb(10 10 10)"
          bordered={false}
          size={250}
        />
      </Flex>
    </Flex>
  );
};
