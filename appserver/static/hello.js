require([
    "splunkjs/mvc",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/simplexml/ready!"
 ], function(mvc, SearchManager) {

	console.log("loading ...")

 	$("#hello").on("click", function(){
 		console.log("Hello: "+Date.now())
 	});
 });

console.log("EOF")
// #sourceURL = hello.js