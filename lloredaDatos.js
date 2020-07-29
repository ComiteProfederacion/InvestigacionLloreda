// https://observablehq.com/d/437483300f2989e7@209
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Datos sobre trazabilidad societaria Lloreda`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-- SET UP --`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: 80, bottom: 5, left: 5}
)});
  main.variable(observer("width")).define("width", ["margin"], function(margin){return(
890 - margin.left - margin.right
)});
  main.variable(observer("height")).define("height", ["margin"], function(margin){return(
800 - margin.top - margin.bottom
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
<style> 

    .links { 
    // stroke: #999; 
    stroke-opacity: 0.4; 
    // stroke-width: 1px; 
    }

    text {
    pointer-events: none;
    fill: #000;
    font: 10px sans-serif;
    }

    svg{
    border:1px solid #000;
    }

</style>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`-- DATA --`
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3"], function(d3){return(
d3.scaleOrdinal() //=d3.scaleOrdinal(d3.schemeSet2)
    .domain(["Empresa Principal", "Empresa Secundaria", "Persona", "Familia"])
    .range(['#ff9e6d', '#86cbff', '#c2e5a0','#fff686'])
)});
  main.variable(observer("simulation")).define("simulation", ["d3","width","height"], function(d3,width,height){return(
d3.forceSimulation()
    .force("link", d3.forceLink() // This force provides links between nodes
                    .id(d => d.id) // This sets the node id accessor to the specified function. If not specified, will default to the index of a node.
                    .distance(80)
     ) 
    .force("charge", d3.forceManyBody().strength(-50)) // This adds repulsion (if it's negative) between nodes. 
    .force("center", d3.forceCenter(width / 2, height / 2))
)});
  main.variable(observer("myChart")).define("myChart", ["html","d3","width","margin","height","colorScale","simulation"], function(html,d3,width,margin,height,colorScale,simulation)
{
  const div = html`<div style='max-width: 900px; overflow-x: auto; padding: 0px; margin: 0px;'></div>`;
  const svg = d3.select(div)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`); 
  
  const subgraphWidth = width*2/8;
const subgraphHeight = height*1/5;      

const subgraph = svg.append("g")
    .attr("id", "subgraph")
    .attr("transform", `translate(10, 0)`);
    
subgraph.append("text")
        .style("font-size","16px")
  
 //appending little triangles, path object, as arrowhead
//The <defs> element is used to store graphical objects that will be used at a later time
//The <marker> element defines the graphic that is to be used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.
svg.append('defs').append('marker')
    .attr("id",'arrowhead')
    .attr('viewBox','-0 -5 10 10') //the bound of the SVG viewport for the current SVG fragment. defines a coordinate system 10 wide and 10 high starting on (0,-5)
     .attr('refX',24) // x coordinate for the reference point of the marker. If circle is bigger, this need to be bigger.
     .attr('refY',0)
     .attr('orient','auto')
        .attr('markerWidth',6)
        .attr('markerHeight',6)
        .attr('xoverflow','visible')
    .append('svg:path')
    .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
    .attr('fill', '#999')
    .style('stroke','none');
  
  svg.append("text")
      .text("Trazabilidad Societaria")
      .attr("text-anchor","middle")
      .attr("x",width/2)
      .style("font-size","20px")
  
//create some data
const dataset =  {
  nodes: [
        {id: 1, name: 'LLOR', label: 'LLOREDA S.A.', group: 'Empresa Principal', runtime: 1},
        {id: 2, name: 'CIYU', label: 'C.I.YUMBO S.A.', group: 'Empresa Principal', runtime: 1},
        {id: 3, name: 'LLDI', label: 'LLOREDA DISTRIBUCIONES S.A.', group: 'Empresa Principal', runtime: 1},
        {id: 4, name: 'BUCA', label: 'PALMAS OLEAGINOSAS BUCARELIA S.A.S.', group: 'Empresa Principal', runtime: 1},
        {id: 5, name: 'HARI', label: 'HARINERA DEL VALLE S.A.', group: 'Empresa Secundaria', runtime: 1},
        {id: 6, name: 'CONS', label: 'CONSULTORIAS DE INVERSIONES S.A.', group: 'Empresa Secundaria', runtime: 1},
        {id: 7, name: 'RYFI', label: 'RYFIELD COLOMBIA S.A.S.', group: 'Empresa Secundaria', runtime: 1},
        {id: 8, name: 'SANT', label: 'INDUSTRIA SANTA CLARA S A S', group: 'Empresa Secundaria', runtime: 1},
        {id: 9, name: 'ECOD', label: 'ECODIESEL COLOMBIA S.A.', group: 'Empresa Secundaria', runtime: 1},
        {id: 10, name: 'NMOT', label: 'NUBIA  MONTES DE OCA DE TOBÓN', group: 'Persona', runtime: 1},
        {id: 11, name: 'JEQG', label: 'JORGE ELIECER QUINTERO GONZALEZ ', group: 'Persona', runtime: 1},
        {id: 12, name: 'FEUW', label: 'FERNANDO EDUARDO URDANETA WIESNER', group: 'Persona', runtime: 1},
        {id: 13, name: 'JCHR', label: 'JUAN CARLOS HENAO RAMOS', group: 'Persona', runtime: 1},
        {id: 14, name: 'LRRS', label: 'LINA ROSALBA REYES SALAZAR', group: 'Persona', runtime: 1},
        {id: 15, name: 'CPPA', label: 'CLAUDIA PATRICIA PEREA ALDANA', group: 'Persona', runtime: 1},
        {id: 16, name: 'MHS', label: 'MARINO HERRERA SALGADO', group: 'Persona', runtime: 1},
        {id: 17, name: 'RMB', label: 'Ruby Mogollón Barrios ', group: 'Persona', runtime: 1},
        {id: 18, name: 'LADL', label: 'LUIS ALBERTO DORADO LERMA', group: 'Persona', runtime: 1},
{id: 19, name: 'CFAR', label: 'CHRISTIAN FERNANDO  ACOSTA RODRIGUEZ', group: 'Persona', runtime: 1},
{id: 20, name: 'KUV', label: 'KATHERINE  URREA VELASQUEZ', group: 'Persona', runtime: 1},
{id: 21, name: 'CCMV', label: 'CLEMENTE CARLOS MIRA VELASQUEZ', group: 'Persona', runtime: 1},
{id: 22, name: 'LICP', label: 'LUIS IVAN CORREA PELAEZ', group: 'Persona', runtime: 1},
{id: 23, name: 'LEAJ', label: 'LUIS EDUARDO ARELLANO JARAMILLO', group: 'Persona', runtime: 1},
{id: 24, name: 'CAPB', label: 'CARLOS ARCESIO PAZ BAUTISTA ', group: 'Persona', runtime: 1},
{id: 26, name: 'ECE', label: 'EDISON CERON ESCOBAR ', group: 'Persona', runtime: 1},
{id: 27, name: 'JVL', label: 'JHONIER VALLEJO LOPEZ', group: 'Persona', runtime: 1},
{id: 28, name: 'CRBS', label: 'CARLOS RAMIRO BECERRA SANCHEZ', group: 'Persona', runtime: 1},
{id: 29, name: 'MPGS', label: 'GONZALEZ SALCEDO MARIA DEL PILAR', group: 'Persona', runtime: 1},
{id: 30, name: 'PABB', label: 'PAZ BAUTISTA', group: 'Familia', runtime: 1},
{id: 31, name: 'HERA', label: 'HENAO RAMOS', group: 'Familia', runtime: 1},
{id: 32, name: 'HALV', label: 'HECTOR AUGUSTO LOPEZ VARGAS ', group: 'Persona', runtime: 1},
{id: 33, name: 'CGGM', label: 'CARLO GUSTAVO GARCIA MENDEZ ', group: 'Persona', runtime: 1},
{id: 34, name: 'DIHR', label: 'DANIELA IBETH HERRERA RAMIREZ', group: 'Persona', runtime: 1},
{id: 35, name: 'LRRP', label: 'LAURA ROCIO REYES PLAZAS', group: 'Persona', runtime: 1},
{id: 36, name: 'LMPB', label: 'LUZ MARINA PAZ BAUTISTA', group: 'Persona', runtime: 1},
{id: 37, name: 'AJHR', label: 'HENAO RAMOS ALVARO JOSE', group: 'Persona', runtime: 1},
{id: 38, name: 'FPB', label: 'FERNANDO PAZ BAUTISTA', group: 'Persona', runtime: 1},
{id: 40, name: 'RRM', label: 'RAFAEL ROBLEDO MONTAGUT', group: 'Persona', runtime: 1},
{id: 41, name: 'RAMR', label: 'ROSA ADRIANA DEL SOCORRO MARTINEZ RAMIREZ', group: 'Persona', runtime: 1},
{id: 42, name: 'JCR', label: 'JULIO CESAR RODRIGUEZ', group: 'Persona', runtime: 1},
{id: 43, name: 'LEOC', label: 'LUZ ELENA  OROZCO CORDOBA', group: 'Persona', runtime: 1},
{id: 44, name: 'SMAM', label: 'SANDRA MARCELA  ARCILA MUNERA', group: 'Persona', runtime: 1},
{id: 45, name: 'JMP', label: 'JULIAN MADRID PINILLA', group: 'Persona', runtime: 1},
{id: 46, name: 'DCDM', label: 'DIANA CAROLINA DUQUE MARIN', group: 'Persona', runtime: 1},
{id: 47, name: 'JMRV', label: 'JHOAN MANUEL  RUEDA VALDERRAMA', group: 'Persona', runtime: 1},
{id: 48, name: 'DPCB', label: 'DIANA PATRICIA  CASTILLO BELTRAN', group: 'Persona', runtime: 1},
{id: 49, name: 'GRP', label: 'GASPAR RUEDA PLATA', group: 'Persona', runtime: 1},
{id: 50, name: 'LDUM', label: 'LEON DARIO URIBE MESA', group: 'Persona', runtime: 1},
{id: 51, name: 'JCJC', label: 'JUAN CARLOS JIMENEZ CESPEDES ', group: 'Persona', runtime: 1},
{id: 52, name: 'DFMN', label: 'DIEGO FERNANDO MANRIQUE NIETO', group: 'Persona', runtime: 1},
{id: 53, name: 'SCA', label: 'SEBASTIAN  CASTAÑEDA ARBELAEZ', group: 'Persona', runtime: 1},
{id: 54, name: 'DARR', label: 'DIEGO ANDRES RESTREPO RADA', group: 'Persona', runtime: 1},
{id: 55, name: 'FEGB', label: 'FABIO ENRIQUE GONZALEZ BEJARANO ', group: 'Persona', runtime: 1},
{id: 56, name: 'EMGR', label: 'EDWARD MAURICIO  GIRONZA ROJAS', group: 'Persona', runtime: 1},
{id: 57, name: 'ALP', label: 'ADOLFO LEON PIZARRO', group: 'Persona', runtime: 1},
{id: 58, name: 'GRP', label: 'GASPAR RUEDA PLATA', group: 'Persona', runtime: 1},
{id: 59, name: 'JLCB', label: 'JULIO LEONARDO CASTELLANOS BARAJAS ', group: 'Persona', runtime: 1},
{id: 60, name: 'CCRV', label: 'CHRISTIAN CAMILO RIVAS ORTIZ', group: 'Persona', runtime: 1}
	], 
  links: [
    {source: 10, target: 1, type: 'Representante Legal -->>'},
    {source: 10, target: 2, type: 'Representante Legal -->>'},
    {source: 15, target: 3, type: 'Representante Legal -->>'},
    {source: 11, target: 4, type: 'Representante Legal -->>'},
    {source: 12, target: 5, type: 'Representante Legal -->>'},
    {source: 16, target: 6, type: 'Gerente General -->>'},
    {source: 17, target: 7, type: 'Representante Legal -->>'},
    {source: 13, target: 8, type: 'Representante Legal -->>'},
    {source: 14, target: 9, type: 'Representante Legal -->>'},
    {source: 14, target: 9, type: 'Representante Legal -->>'},
    {source: 18, target: 1, type: 'Junta directiva -->>'},
{source: 19, target: 1, type: 'Junta directiva -->>'},
{source: 19, target: 2, type: 'Junta directiva -->>'},
{source: 19, target: 4, type: 'Junta directiva -->>'},
{source: 20, target: 1, type: 'Junta directiva -->>'},
{source: 20, target: 2, type: 'Junta directiva -->>'},
{source: 20, target: 4, type: 'Junta directiva -->>'},
{source: 21, target: 1, type: 'Junta directiva -->>'},
{source: 21, target: 2, type: 'Junta directiva -->>'},
{source: 22, target: 1, type: 'Junta directiva -->>'},
{source: 22, target: 2, type: 'Junta directiva -->>'},
{source: 23, target: 1, type: 'Junta directiva -->>'},
{source: 23, target: 2, type: 'Junta directiva -->>'},
{source: 24, target: 1, type: 'Junta directiva -->>'},
{source: 26, target: 1, type: 'Junta directiva -->>'},
{source: 26, target: 2, type: 'Junta directiva -->>'},
{source: 27, target: 1, type: 'Junta directiva -->>'},
{source: 27, target: 2, type: 'Junta directiva -->>'},
{source: 28, target: 1, type: 'Junta directiva -->>'},
{source: 29, target: 1, type: 'Junta directiva -->>'},
{source: 30, target: 1, type: 'Junta directiva -->>'},
{source: 30, target: 5, type: 'Junta directiva -->>'},
{source: 30, target: 6, type: 'Junta directiva -->>'},
{source: 31, target: 1, type: 'Junta directiva -->>'},
{source: 31, target: 8, type: 'Junta directiva -->>'},
{source: 31, target: 5, type: 'Junta directiva -->>'},
{source: 13, target: 1, type: 'Junta directiva -->>'},
{source: 13, target: 5, type: 'Junta directiva -->>'},
{source: 32, target: 2, type: 'Junta directiva -->>'},
{source: 32, target: 9, type: 'Junta directiva -->>'},
{source: 32, target: 4, type: 'Junta directiva -->>'},
{source: 33, target: 4, type: 'Junta directiva -->>'},
{source: 34, target: 5, type: 'Junta directiva -->>'},
{source: 35, target: 5, type: 'Junta directiva -->>'},
{source: 36, target: 5, type: 'Junta directiva -->>'},
{source: 37, target: 5, type: 'Junta directiva -->>'},
{source: 38, target: 5, type: 'Junta directiva -->>'},
{source: 40, target: 5, type: 'Junta directiva -->>'},
{source: 41, target: 5, type: 'Junta directiva -->>'},
{source: 42, target: 8, type: 'Junta directiva -->>'},
{source: 43, target: 8, type: 'Junta directiva -->>'},
{source: 44, target: 8, type: 'Junta directiva -->>'},
{source: 45, target: 8, type: 'Junta directiva -->>'},
{source: 46, target: 9, type: 'Junta directiva -->>'},
{source: 47, target: 9, type: 'Junta directiva -->>'},
{source: 48, target: 9, type: 'Junta directiva -->>'},
{source: 49, target: 9, type: 'Junta directiva -->>'},
{source: 50, target: 9, type: 'Junta directiva -->>'},
{source: 51, target: 9, type: 'Junta directiva -->>'},
{source: 52, target: 9, type: 'Junta directiva -->>'},
{source: 53, target: 9, type: 'Junta directiva -->>'},
{source: 54, target: 9, type: 'Junta directiva -->>'},
{source: 55, target: 9, type: 'Junta directiva -->>'},
{source: 56, target: 9, type: 'Junta directiva -->>'},
{source: 57, target: 9, type: 'Junta directiva -->>'},
{source: 58, target: 9, type: 'Junta directiva -->>'},
{source: 59, target: 9, type: 'Junta directiva -->>'},
{source: 18, target: 1, type: 'Representante Legal RUES -->>'},
{source: 18, target: 2, type: 'Representante Legal RUES -->>'},
{source: 18, target: 4, type: 'Representante Legal RUES -->>'},
{source: 32, target: 1, type: 'Representante Legal RUES -->>'},
{source: 32, target: 2, type: 'Representante Legal RUES -->>'},
{source: 32, target: 3, type: 'Representante Legal RUES -->>'},
{source: 32, target: 4, type: 'Representante Legal RUES -->>'},
{source: 60, target: 1, type: 'Representante Legal RUES -->>'},
{source: 60, target: 3, type: 'Representante Legal RUES -->>'},
{source: 45, target: 5, type: 'Representante Legal RUES -->>'},
{source: 38, target: 6, type: 'Representante Legal RUES -->>'},
{source: 41, target: 6, type: 'Representante Legal RUES -->>'},
{source: 26, target: 8, type: 'Representante Legal RUES -->>'}
  ]
};

    console.log("dataset is ...",dataset);

// Initialize the links
const link = svg.selectAll(".links")
        .data(dataset.links)
        .enter()
        .append("line")
        .attr("class", "links")
        .attr("stroke","#999")
        .attr("stroke-width","2px")
        .style("opacity", 0.8)
        .attr("id",d=> "line"+d.source+d.target)
        .attr("class", "links")
        .attr('marker-end','url(#arrowhead)') //The marker-end attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.


//The <title> element provides an accessible, short-text description of any SVG container element or graphics element.
//Text in a <title> element is not rendered as part of the graphic, but browsers usually display it as a tooltip.
link.append("title")
    .text(d => d.type);

const edgepaths = svg.selectAll(".edgepath") //make path go along with the link provide position for link labels
        .data(dataset.links)
        .enter()
        .append('path')
        .attr('class', 'edgepath')
        .attr('fill-opacity', 0)
        .attr('stroke-opacity', 0)
        .attr('id', function (d, i) {return 'edgepath' + i})
        .style("pointer-events", "none");

const edgelabels = svg.selectAll(".edgelabel")
        .data(dataset.links)
        .enter()
        .append('text')
        .style("pointer-events", "none")
        .attr('class', 'edgelabel')
        .attr('id', function (d, i) {return 'edgelabel' + i})
        .attr('font-size', 10)
        .attr('fill', '#aaa');

edgelabels.append('textPath') //To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.
    .attr('xlink:href', function (d, i) {return '#edgepath' + i})
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("startOffset", "50%")
    .text(d => d.type);
  
// Initialize the nodes
const node = svg.selectAll(".nodes")
    .data(dataset.nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")

node.call(d3.drag() //sets the event listener for the specified typenames and returns the drag behavior.
        .on("start", dragstarted) //start - after a new pointer becomes active (on mousedown or touchstart).
        .on("drag", dragged)      //drag - after an active pointer moves (on mousemove or touchmove).
    );

node.append("circle")
    .attr("r", d=> 17)//+ d.runtime/20 )
    .attr("id",d=> "circle"+d.id)
    .style("stroke", "grey")
    .style("stroke-opacity",0.3)
    .style("stroke-width", d => d.runtime/10)
    .style("fill", d => colorScale(d.group))

node.append("title")
    .text(d => d.id + ": " + d.label + " - " + d.group +", Patrimonio Neto:"+ d.runtime+ "M");

node.append("text")
    .attr("dy", 4)
    .attr("dx", -15)
    .text(d => d.name);
node.append("text")
    .attr("dy",12)
    .attr("dx", -8)
    .text(d=> d.runtime);

  //set up dictionary of neighbors
  var neighborTarget= {};
  for (var i=0; i < dataset.nodes.length; i++ ){
    var id = dataset.nodes[i].id;
    neighborTarget[id] = dataset.links.filter(function(d){
      return d.source == id;
    }).map(function(d){
      return d.target;
    })
  }
  var neighborSource = {};
  for (var i=0; i < dataset.nodes.length; i++ ){
    var id = dataset.nodes[i].id;
    neighborSource[id] = dataset.links.filter(function(d){
      return d.target == id;
    }).map(function(d){
      return d.source;
    })
  }
  
console.log("neighborSource is ",neighborSource);
console.log("neighborTarget is ",neighborTarget);
  
 node.selectAll("circle").on("click",function(d){

            var active = d.active? false : true // toggle whether node is active
            , newStroke = active ? "yellow":"grey"
            , newStrokeIn = active ? "green":"grey"
            , newStrokeOut = active? "red": "grey"
            , newOpacity = active? 0.6: 0.3
            , subgraphOpacity = active? 0.9:0;

            subgraph.selectAll("text")
                    .text("Selected: " +d.label)
                    .attr("dy",14)
                    .attr("dx",14)

            //extract node's id and ids of its neighbors
            var id =d.id
            , neighborS = neighborSource[id]
            , neighborT = neighborTarget[id];
            console.log("neighbors is from ",neighborS," to ", neighborT);
            d3.selectAll("#circle"+id).style("stroke-opacity", newOpacity);
            d3.selectAll("#circle"+id).style("stroke", newStroke);
   
            d3.selectAll("#subgraph").style("opacity",subgraphOpacity)

            //highlight the current node and its neighbors
            for (var i =0; i < neighborS.length; i++){
              d3.selectAll("#line"+neighborS[i]+id).style("stroke", newStrokeIn);
              d3.selectAll("#circle"+neighborS[i]).style("stroke-opacity", newOpacity).style("stroke", newStrokeIn);
            }
            for (var i =0; i < neighborT.length; i++){
              d3.selectAll("#line"+id+neighborT[i]).style("stroke", newStrokeOut);
              d3.selectAll("#circle"+neighborT[i]).style("stroke-opacity", newOpacity).style("stroke", newStrokeOut);
            }
            //update whether or not the node is active
            d.active =active;
 })

  
  
 //Listen for tick events to render the nodes as they update in your Canvas or SVG.
 simulation
        .nodes(dataset.nodes)
        .on("tick", ticked);

simulation.force("link")
        .links(dataset.links);


// This function is run at each iteration of the force algorithm, updating the nodes position (the nodes data array is directly manipulated).
function ticked() {
  link.attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

  node.attr("transform", d => `translate(${d.x},${d.y})`);

  edgepaths.attr('d', d => 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y);
}

//When the drag gesture starts, the targeted node is fixed to the pointer
//The simulation is temporarily “heated” during interaction by setting the target alpha to a non-zero value.
function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();//sets the current target alpha to the specified number in the range [0,1].
      d.fy = d.y; //fx - the node’s fixed x-position. Original is null.
      d.fx = d.x; //fy - the node’s fixed y-position. Original is null.
}

  //When the drag gesture starts, the targeted node is fixed to the pointer
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  //drawing the legend
  const legend_g = svg.selectAll(".legend")
  .data(colorScale.domain())
  .enter().append("g") 
  .attr("transform", (d, i) => `translate(${width-30},${i * 20})`); 

  legend_g.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 5)
    .attr("fill", colorScale);

  legend_g.append("text")
    .attr("x", 10)
    .attr("y", 5)
    .text(d => d);
  
  //drawing the second legend
  const legend_g2 = svg.append("g") 
  //.attr("transform", (d, i) => `translate(${width},${i * 20})`); 
  .attr("transform", `translate(${width-30}, 120)`);
  
  legend_g2.append("circle")
    .attr("r", 5)
    .attr("cx", 0)
    .attr("cy", 0)
    .style("stroke", "grey")
    .style("stroke-opacity",0.3)
    .style("stroke-width", 15)
    .style("fill", "black")
  legend_g2.append("text")
     .attr("x",15)
     .attr("y",0)
     .text("Gran Patrimonio");
  
    legend_g2.append("circle")
    .attr("r", 5)
    .attr("cx", 0)
    .attr("cy", 20)
    .style("stroke", "grey")
    .style("stroke-opacity",0.3)
    .style("stroke-width", 2)
    .style("fill", "black")
  legend_g2.append("text")
     .attr("x",15)
     .attr("y",20)
     .text("Pequeño Patrimonio");
  
  
    return div
}
);
  return main;
}
