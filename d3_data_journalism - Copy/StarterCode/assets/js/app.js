// basic settings
var svgWidth = 800;
var svgHeight = 900;

var margin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 70
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("/assets/data/data.csv").then(function(healthData) {
    
d3.csv("data.csv").then(function(healthData) {
    console.log(healthData);
    console.log([healthData]);

healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    
    });


var xLinearScale = d3.scaleLinear()
    .domain([d3.extent(healthData, d=>d.poverty)) 
    .range([0, width]);


var yLinearScale = d3.scaleLinear()
    .domain(0, d3.max(healthData, d => d.healthcare)])
    .range([height, 0]);

   
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

 
chartGroup.append("g")
    .call(leftAxis);
  
chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 14)
    .attr("fill", "purple")
    .attr("opacity", ".5");

    
chartGroup.selectAll("text.text-circles")
    .data(healthData)
    .enter()
    .append("text")
    .classed("text-circles",true)
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy",6);
      

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .text("Lacks Health Care (%)");
  
    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });

