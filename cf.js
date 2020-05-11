// create 2 data_set
var data1 = [
   {group: "Valinhos", value: 143665},
   {group: "Ribeirão", value: 131370},
   {group: "ABC", value: 79441},
   {group: "Taubaté", value: 73354},
   {group: "Guarulhos", value: 70525},
   {group: "Praia Grande", value: 64851},
   {group: "Rio Preto", value: 59112},
   {group: "Bauru", value: 52562},
   {group: "Sorocaba", value: 43930},
   {group: "Santa Bárbara", value: 43690},
   {group: "Regente Feijó", value: 37087},
   {group: "Araçatuba", value: 29040},
   {group: "Jundiaí", value: 18553}
];

var data2 = [
   {group: "Gaspar/SC", value: 133210},
   {group: "SJ dos Pinhais/PR", value: 98240},
   {group: "Cascavel/PR", value: 67670},
   {group: "Londrina/PR", value: 32020},
   {group: "Maringá/PR", value: 29640},
   {group: "Ponta Grossa/PR", value: 29500},
   {group: "Mourão/PR", value: 20130},
   {group: "Francisco Beltrão/PR", value: 19640},
   {group: "Guarapuava/PR", value: 11640}
];

var data3 = [
   {group: "Contagem/MG", value: 98215},
   {group: "Varginha/MG", value: 53355},
   {group: "Matias Barbosa/MG", value: 46150},
   {group: "Coronel Fabriciano/MG", value: 46117},
   {group: "Montes Claros/MG", value: 45781},
   {group: "Uberlândia/MG", value: 43210},
   {group: "Francisco Beltrão/PR", value: 19640},
   {group: "Passos/MG", value: 17900}
];

var data4 = [
   {group: "Jaboatão dos Guararapes/PE", value: 116966},
   {group: "Maceió/AL", value: 25256},
   {group: "", value: 0},
   {group: "                                                                                ", value: 0},
   {group: "                                                                                 ", value: 0},
   {group: "                                                                                  ", value: 0},
   {group: "                                                                                    ", value: 0}
];

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(data) {

  // Update the X axis
  x.domain(data.map(function(d) { return d.group; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  y.domain([0, d3.max(data, function(d) { return d.value }) ]);
  yAxis.transition().duration(1000).call(d3.axisLeft(y));

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#69b3a2")

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}

// Initialize the plot with the first dataset
update(data1)
