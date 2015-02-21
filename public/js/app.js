function getTask(){
	var deferred = new jQuery.Deferred();
	$.ajax({
		url:'/getTask',
	}).done(function (results) {
		deferred.resolve(results);
	});
	return deferred.promise();
}

function printTask () {
	$('.task-box li').remove();

	getTask().then(function (results) {
		for (var i = 0 ; i < results.length; i++) {
			var title = results[i].title;
			$('<li>' + title + '</li>').appendTo('.task-box');
		}

	});
}



$(".form-add").submit(function(e){
	e.preventDefault();
	var task = $('.form-add input').val();
	$('.form-add input').val('');

	var obj = {
		title: task
	};

	$.ajax({
		type: 'POST',
	 	url: '/saveTask',
	  	data: obj
	});

	printTask();
});
