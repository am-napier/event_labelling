require([
    "splunkjs/mvc",
    "splunkjs/mvc/searchmanager",
    "splunkjs/mvc/simplexml/ready!"
 ], function(mvc, SearchManager) {

	log("on load ...")

	 var spl = ["| makeresults ",
	    `| eval event_id="$event_id$", severity=$severity$, labels="$labels$,${new Date()}" `,
	    '| eval user_name="$user_name$", event_time=event_time, MY_STR="FOOBAH123"',
	    //"outputlookup itoa_event_labels key_field=event_id",
	    "| collect index=main" ].join(" ")

	 spl = ["| makeresults ",
	 	`| eval desc="Ran at ${new Date()}"`,
	 	'| eval event_id=$event_id|s$',
	    '| eval severity=$severity$',
	    '| eval labels=$labels|s$',
	    '| eval user_name="$env:user$"',
	    '| eval event_time=$event_time$',
	    '| eval event_correlation_key=$event_correlation_key|s$',
	    '| outputlookup itoa_event_labels key_field=event_id'
	 ].join(" ")

	 log("done")
	 log("SPL is:", spl)

	 srch = new SearchManager({ id : "event_labels", search : spl },{tokens:true})

	 srch.on('search:done', function(props){
	 	console.log("Done: ", props)
	 	set_script_state("Update OK - "+new Date())
	 })

	 srch.on('search:failed', function(props){
	 	console.log("Failed: ", props)
	 	set_script_state("Update Failed - "+new Date())
	 })

	 olg(srch)
	 log("srch manager loaded")

	 set_script_state("Update Pending - "+new Date())

	 function set_script_state(msg){
	 	mvc.Components.get("default").set("script_state", msg)
	 }

 });

log("loaded event_labels.js")


function olg(ob){
	console.log(ob)
}

function log(str){
	console.log(new Date()+ " "+str)
}
//# sourceURL=event_labels.js
