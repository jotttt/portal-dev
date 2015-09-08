$(".pull-left, .pull-right").click(function(e) {
	e.preventDefault();

	$(".active .form-control").each(function() {
		alert($(this).attr("id") + ":" + $(this).val());
	});

	return false;

	$.ajax({
		url: "/js/testservice.php",
		data: {
			form: "haa"
		},
		type: "get",
		success: function(output) {
			if (output) {
				alert(output);
			}
			else {
				alert('probleem!');
			}
		}
	});
});

/*

/* used on tt_entry page to switch between different form field sets
 $(function() {


 $('#other_problems').hide();
 $('#it_problems').hide();
 $('#re_problems').hide();


 $('#problem_type').change(function() {

 if ($('#problem_type').val() == 'other_problems') {
 $('#other_problems').show();
 $('#re_problems').hide();
 $('#it_problems').hide();
 } else if ($('#problem_type').val() == 'it_problems') {
 $('#other_problems').hide();
 $('#re_problems').hide();
 $('#it_problems').show();
 } else {
 $('#other_problems').hide();
 $('#re_problems').show();
 $('#it_problems').hide();
 }
 });
 });


 $(function() {
 $("#actions-toggle").click(function() {
 $("#more_actions").hide("slow");
 });

 $("#show_more").click(function() {
 $("#more_actions").show("slow");
 });
 });


 /*
 KASPAR:Arenguvestlused - "lisa uus eesmärk"
 Neid kaste peaks saama järjest lisada, kuni x tk
 */
/*
 $(document).ready(function() {

 $('#add_mission').click(function() {
 $('#new_mission1').show('slow');
 });


 $('#add_new_target').click(function() {
 $('#new_target1').show('slow');
 });
 });
 */
