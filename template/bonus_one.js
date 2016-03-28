// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	var search_term;
	
	$.ajax({
		type: 'get',
		url: 'http://www.mattbowytz.com/simple_api.json',
		data: {"data":"all"},
		success: function(data) {
			data=data['data']
			search_term=$.merge(data["interests"],data["programming"]);
			
		}
	});
	
	$(".flexsearch-input").keyup(function(){
		$("div.results").remove();
		var search_input=$(".flexsearch-input").val();
		if (search_input!=''){
			for (s of search_term){
				check=s.toLowerCase().search(search_input.toLowerCase());
				if (check == 0){
					search_format = s.split(' ').join('+')
					search_url='https://www.google.com/search?q='+search_format;
					$("#result_container").append('<a href="'+search_url+'"><div class="results" id="'+s+'">'+s+'</div></a>');
				}	
			}
		}
	});
	
	window.onload=function() {
		document.getElementById("mainForm").onsubmit=function() {
			var search_input=$(".flexsearch-input").val();
			var search_format = search_input.split(' ').join('+');
			var search_url='https://www.google.com/search?q='+search_format;
			window.location.href=search_url
			return false;
		}
	}
		
	$('input[type=search]').on('search', function () {
		$("div.results").remove();
	});
	
	console.log('Keepin\'n it clean with an external script!');
})();