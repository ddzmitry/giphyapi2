$(document).ready(function() {//telling the page that the document will run
var horror = ['Halloween', 'The Shining', 'Saw', 'Texas Chainsaw Massacre', 'Human Centipede', 'Childs Play',
'Friday the 13th', 'Hellraiser', 'Evil Dead'];//the original buttons that will be added to the page

	function buttonInfo() {
		var giphy = $(this).attr('data-name');
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
				url: queryUrl,
				method: 'GET'
			})
			.done(function(response) {
				console.log(queryUrl);
				console.log(response);
				
				var results = response.data;

				$('#giphyShow').empty();

				for (var i = 0; i < results.length; i++) {
					var still = results[i].images.fixed_height_still.url;
					var animate = results[i].images.fixed_height.url;

					var giphyDiv = $('<div>');

					var giphyRating = $('<p> Rating:' + results[i].rating + '</p>')
					giphyDiv.append(giphyRating);
					$('#addRating').append(giphyDiv);

					var giphyImage = $('<img>', {
						class: 'image',
						src: still
					});
					giphyImage.attr('data-still', still);
					giphyImage.attr('data-animate', animate);
					giphyImage.attr('data-state', 'still');
					giphyDiv.append(giphyImage);
					$('#giphyShow').prepend(giphyDiv);
			$('.image').on('click', function() {
				var state = $(this).attr('data-state');
				console.log(state);
            if (state === 'still') {
            	$(this).attr('src', $(this).data('animate'));
            	$(this).attr('data-state', 'animate');
            	console.log('clicked1');
            } else { 
                $(this).attr('src', $(this).data('still'));
            	$(this).attr('data-state', 'still');		
            	console.log('clicked2');	
				}
			});
		}

	}); 
}
	function addButtons() {
		$('#giphyButtons').empty()//does not repeat the buttons already added

		for (var i = 0; i < horror.length; i++) {
			var newButtons = $('<button>');//new buttons when added from the input box
			newButtons.addClass('giphy');//adding a class in order to give location to a place where the new buttons will be
										   //dynamically added. also will be the class where the data from the buttons
										   //clicked will unload
			newButtons.attr('data-name', horror[i]);//added a data attribute to the buttons
			newButtons.text(horror[i]);//adding text to the movie buttons
			$('#giphyButtons').append(newButtons);//adding buttons to the html
			console.log('buttons add');
		}
	}
	$('#giphyAdd').on('click', function() {//creating a function for the onclick, adding buttons
			var input = $('#giphyInput').val().trim();//getting the value of the input, while removing some text with the .trim()
			horror.push(input);//pushing the inputs to the horror array
			addButtons();//incorporating the buttons when added to be appended to the buttons already on the page
			return false; // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		});

	$(document).on('click', '.giphy', buttonInfo);//telling the document to retrieve the data from the api when buttons are clicked
	addButtons();//calling the function
});