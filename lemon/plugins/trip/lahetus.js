/*jshint -W117 */
$(document).ready(function(){
	//DATEPICKER PLUGIN
	$.fn.datepicker.defaults.format = 'dd-mm-yyyy';
	// END DATEPICKER PLUGIN

	// INLINE EDITING PLUGIN
	//defaults
	$.fn.editable.defaults.url = '/post';

	//enable / disable
	$('#enable').click(function() {
		$('#user .editable').editable('toggleDisabled');
	});
	$.fn.editable.defaults.mode = 'inline';

	// 1ST BLOCK
	$('#name').editable({
		type: 'text',
		url: '/post',
	});
	$('#department').editable({
		type: 'text',
		url: '/post',
	});
	$('#position').editable({
		type: 'text',
		url: '/post',
	});
	$('#errand_duration_b').editable();

	$('#errand_duration_e').editable();

	$('#financing').editable({
		type: 'text',
		url: '/post',
	});
	// 2ND BLOCK
	$('#destination').editable({
		type: 'text',
		url: '/post',
	});
	$('#event').editable({
		type: 'text',
		url: '/post',
	});
	$('#event_type').editable({
		type: 'text',
		url: '/post',
	});
	$('#event_duration_b').editable();

	$('#event_duration_e').editable();
	// 3RD BLOCK

	// END INLINE EDITING PLUGIN
});
