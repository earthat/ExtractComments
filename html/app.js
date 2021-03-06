anychart.onDocumentReady(function () {

    // create data
    var data =                { 
       nodes: [ 
{id: "avgVelcoity", Description: "  function to calculate average velocity   relative velocity for each vehicle"}, 
{id: "avgDistancelevel", Description: "  this function calculates the ADL. The nodes in a cluster are considered only"}, 
{id: "CScredits", Description: "  OFDM network Enviornment  Set the simulation parameters."}, 
{id: "spectrumSensing", Description: "  generate LDPC encoder and decoder object  save frameSize frameSize  H = sparse([genH(floor(frameSize(1)/2),floor(frameSize(1)/2)) genLowTri(floor(frameSize(1)/2))]);  hEnc = comm.LDPCEncoder(H);"}, 
{id: "spectrumSensing_Attack", Description: "  generate LDPC encoder and decoder object"}, 
{id: "nwconnectlevel", Description: "   this function calculated the network connectivity level     total nodes in vicinity of each nodes in each flow"}, 
{id: "laneWeight", Description: "   function to calculate lane weights for each traffic flow"}, 
{id: "main", Description: "   this code implements the road junction scenario. Few vehicles at the junction take turn at right hand side. The continuous cluster head  selection by fuzzy logic is implemented. White colored vehicle which pop up during simulation in each lane is the elected cluster head. Initial speed of every vehicle is different i.e.[80,100]"}, 
{id: "resultsPlot1", Description: "resultsPlot1 is a function.    resultsPlot1(nodes, RSU)"}, 
{id: "checkExit", Description: "checkExit is a function.    nodes = checkExit(nodes, highwayL)"}, 
{id: "distance_nodetoRSU", Description: "   function to calculate the distance of each node to each RSU and to check  is vehicle is in range of RSU"}, 
{id: "distance_nodetonode", Description: "   function to calculate the distance of each node to each RSU and to check  is vehicle is in range of RSU  for LtoR"}, 
{id: "genH", Description: "genH is a function.    [H] = genH(rows, cols)"}, 
{id: "genLowTri", Description: "genLowTri is a function.    LowTri = genLowTri(n)"}, 
{id: "initializevehicles", Description: "  function to initilaise vehciles' psoitions at each road"}, 
{id: "normalize", Description: "normalize - Normalize filter numerator or feed-forward coefficients    This MATLAB function normalizes the filter numerator coefficients for a    quantized filter to have values between -1 and 1.    normalize(hq)    g = normalize(hd)    See also denormalize    Documentation for normalize       doc normalize"}, 
             ], 
       edges: [ 
      {from: "avgVelcoity", to: "main"}, 
 {from: "avgDistancelevel", to: "main"}, 
        {from: "CScredits", to: "main"}, 
{from: "spectrumSensing", to: "CScredits"}, 
   {from: "nwconnectlevel", to: "main"}, 
       {from: "laneWeight", to: "main"}, 
     {from: "resultsPlot1", to: "main"}, 
        {from: "checkExit", to: "main"}, 
{from: "distance_nodetoRSU", to: "main"}, 
{from: "distance_nodetonode", to: "main"}, 
{from: "genH", to: "spectrumSensing_Attack"}, 
{from: "genLowTri", to: "spectrumSensing_Attack"}, 
{from: "initializevehicles", to: "main"}, 
 {from: "normalize", to: "avgVelcoity"}, 
{from: "normalize", to: "avgDistancelevel"}, 
   {from: "normalize", to: "CScredits"}, 
{from: "normalize", to: "nwconnectlevel"}, 
             ], 
     } 


;

    // create a chart and set the data
    var chart = anychart.graph(data);

    // prevent zooming the chart with the mouse wheel
    chart.interactivity().zoomOnMouseWheel(false);
    
    // enable labels of nodes
    chart.nodes().labels().enabled(true);

    // configure labels of nodes
    chart.nodes().labels().format("{%id}");
    chart.nodes().labels().fontSize(12);
    chart.nodes().labels().fontWeight(600);

    // configure tooltips of nodes
    chart.nodes().tooltip().useHtml(true);
    chart.nodes().tooltip().format(
      "<span style='font-weight:bold'>{%id} {%last_name}</span><br>Description: {%Description}"
    );

    // configure tooltips of edges
    chart.edges().tooltip().format("{%from} -> {%to}");

    // set the chart title
    chart.title("Code Dependency on Custom Functions. Hover the mouse over nodes to get the function description");
    

    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
});