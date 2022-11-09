Add this as the drilldown link to any correlation search that can write details in to event labels collection

/app/event_labelling/direct_event_labelling?event_id=%event_id%&event_time=%_time%$index_time=_indextime&event_correlation_key=%event_correlation_key%

Notes: 
1. the time passed on the URI is the event time not the index time.
2. the event_correlation_key must be created in the correlation search, it should be used to hard hard match the same event so the adjusted severity can be applied via lookup.

Docs for splunkjs: https://docs.splunk.com/Documentation/WebFramework

lookup properties from this lookup using the | lookup itoa_event_labels event_correlation_key OUTPUT severity as labelled_severity




