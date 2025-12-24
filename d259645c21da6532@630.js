import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Taiwan birth projections</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# 臺灣出生人數推估

使用國家發展委員會的人口推估資料，顯示 1970–2070 年按性別的出生人數變化，並以中推估情境的數字繪製折線圖。`
)}

function _key(legend,chart){return(
legend({color: chart.scales.color, title: "性別"})
)}

function _chart(d3,data)
{
  const width = 928;
  const height = 520;
  const marginTop = 30;
  const marginRight = 40;
  const marginBottom = 40;
  const marginLeft = 70;

  const sexes = Array.from(
    d3.rollup(
      data,
      (values) => values.sort((a, b) => d3.ascending(a.year, b.year)),
      (d) => d.sex
    ),
    ([sex, values]) => ({sex, values})
  );

  const color = d3.scaleOrdinal()
      .domain(sexes.map(d => d.sex))
      .range(d3.schemeSet2);

  const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([marginLeft, width - marginRight]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.births)]).nice()
      .range([height - marginBottom, marginTop]);

  const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.births))
      .defined(d => d.births != null);

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickFormat(d3.format("d")))
      .call(g => g.selectAll(".domain").attr("opacity", 0.25))
      .call(g => g.selectAll(".tick line").attr("opacity", 0.25));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 80).tickFormat(d3.format(",")))
      .call(g => g.selectAll(".domain").attr("opacity", 0.25))
      .call(g => g.selectAll(".tick line").attr("opacity", 0.25))
    .append("text")
      .attr("x", -marginLeft + 10)
      .attr("y", marginTop - 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("出生人數 (人)");

  svg.append("g")
    .selectAll("path")
    .data(sexes)
    .join("path")
      .attr("fill", "none")
      .attr("stroke", d => color(d.sex))
      .attr("stroke-width", 2.5)
      .attr("d", d => line(d.values));

  svg.append("g")
    .selectAll("g")
    .data(sexes)
    .join("g")
      .attr("fill", d => color(d.sex))
    .selectAll("circle")
    .data(d => d.values.filter(v => line.defined()(v)))
    .join("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.births))
      .attr("r", 2.5)
    .append("title")
      .text(d => `${d.year} ${d.sex}\n${d.births.toLocaleString("en-US")}`);

  svg.append("text")
      .attr("x", width - marginRight)
      .attr("y", height - 5)
      .attr("text-anchor", "end")
      .attr("fill", "currentColor")
      .text("年份");

  return Object.assign(svg.node(), {scales: {color}});
}


async function _data(FileAttachment,d3)
{
  const raw = await FileAttachment("Bron_20251224115120.csv").text();
  const rows = d3.csvParseRows(raw);
  const yearHeaderIndex = rows.findIndex(row => row[0] === "" && row[1] === "" && /^\d{4}$/.test(row[2] || ""));
  if (yearHeaderIndex < 0) throw new Error("找不到年份欄位");

  const years = rows[yearHeaderIndex].slice(2).map(Number);
  const dataRows = rows.slice(yearHeaderIndex + 2).filter(row => row.length > 0 && row[0] && row[1] && (row[2] === "-" || /^\d/.test(row[2] || "")));

  return years.flatMap((year, i) => dataRows.map(row => {
    const births = row[i + 2];
    if (births === undefined || births === "-") return null;
    return {
      scenario: row[0],
      sex: row[1],
      year,
      births: +births.replace(/,/g, "")
    };
  })).filter(Boolean);
}


function _6(md){return(
md`資料來源：國家發展委員會「中華民國人口推估」；2025 年（含）以後為推估值。`
)}

function _7(Plot,data){return(
Plot.plot({
  height: 520,
  color: {legend: true},
  x: {label: "年份"},
  y: {label: "出生人數"},
  marks: [
    Plot.ruleY([0], {strokeOpacity: 0.3}),
    Plot.line(data, {x: "year", y: "births", stroke: "sex", sort: "year"})
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Bron_20251224115120.csv", {url: new URL("./files/Bron_20251224115120.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["legend","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Plot","data"], _7);
  return main;
}
