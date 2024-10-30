import { Layout } from "antd";
import { useEffect, useState } from "react";
import { TagCloud } from "react-tagcloud";

interface CountedProperty {
  value: string;
  count: number;
}

interface ResultsResponse {
  fromCounts: CountedProperty[];
  pizzaCounts: CountedProperty[];
  loveTravelCounts: CountedProperty[];
  weatherCounts: CountedProperty[];
  phoneCounts: CountedProperty[];
  osCounts: CountedProperty[];
}

const layoutStyle = {
  paddingTop: "30px",
  backgroundColor: "#fff",
  height: "100vh",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
};

export const ResultsPage = () => {
  const [data, setData] = useState({} as ResultsResponse);
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
    }, 5000);
  }, []);
  return (
    <Layout style={layoutStyle}>
      {data.fromCounts?.length && (
        <div style={gridStyle}>
          <div>
            <h2>Из какого вы города</h2>
            <TagCloud
              minSize={20}
              maxSize={40}
              tags={data.fromCounts}
              onClick={(tag) => alert(`'${tag.value}' was selected!`)}
            />
          </div>
          <div>
            <h2>Любимый ингредиент</h2>
            <TagCloud
              minSize={20}
              maxSize={40}
              tags={data.pizzaCounts}
              onClick={(tag) => alert(`'${tag.value}' was selected!`)}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};
