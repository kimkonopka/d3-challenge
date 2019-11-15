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
    
 
    healthData.forEach(function(xdata) {
        xdata.poverty = +xdata.poverty;
        xdata.healthcare = +xdata.healthcare;
    
    });


    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d=>d.poverty)*1, 
            d3.max(healthData, d => d.poverty)*1])
        .range([0, width]);


    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)*1])
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
        .attr("transform", "rotate(-90)")
        .attr("y", 20 - margin.left)
        .attr("x", 0 - (height / 2))
        .text("Lacks Healthcare (%)");

  
    chartGroup.append("text")
        .attr("y", height + margin.bottom)
        .attr("x", width)
        .text("In Poverty (%)");


});