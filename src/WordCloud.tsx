import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { CountedProperty } from "./pages/Results/ResultsPage";

const WordCloud = (props: { words: CountedProperty[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [wordsCache, setWordsCache] = useState("");
  const words = props.words;

  useEffect(() => {
    const cache = JSON.stringify(words);
    if (cache === wordsCache) return;

    setWordsCache(cache);

    const layout = cloud()
      .size([250, 200]) // размеры облака тегов
      .words(words.map((word) => ({ text: word.value, size: word.count + 20 })))
      .padding(5)
      .rotate(() => 0)
      .fontSize((d) => d.size ?? 20)
      .on("end", draw);

    layout.start();

    function draw(
      words: {
        text: string;
        size: number;
        x: number;
        y: number;
        rotate: number;
      }[]
    ) {
      if (!svgRef.current) return;
      d3.select(svgRef.current).selectAll("*").remove(); // очищаем предыдущий контент

      d3.select(svgRef.current)
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`
        )
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style(
          "fill",
          () => d3.schemeCategory10[Math.floor(Math.random() * 10)]
        ) // случайный цвет
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`
        )
        .text((d) => d.text);
    }
  }, [words]);

  return <svg ref={svgRef}></svg>;
};

export default WordCloud;
