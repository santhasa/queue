var server_ip;
var server_port;

window.onload = function(){
		$.getJSON('serverip.json',function(data){
	    	// data is an array of objects
	    	$.each(data, function(){
	    		server_ip=this.ipaddress;
    			server_port=this.port;
	    		//alert(server_ip);
    		});
	    });
		$(function() {
                    $('#slot_start_time').timepicker();
                    $('#slot_end_time').timepicker();
                });
		new JsDatePick({
			useMode:2,
			target:"slot_start_date",
			dateFormat:"%d-%M-%Y"
			/*selectedDate:{				This is an example of what the full configuration offers.
				day:5,						For full documentation about these settings please see the full version of the code.
				month:9,
				year:2006
			},
			yearsRange:[1978,2020],
			limitToToday:false,
			cellColorScheme:"beige",
			dateFormat:"%m-%d-%Y",
			imgPath:"img/",
			weekStartDay:1*/
		});
		new JsDatePick({
			useMode:2,
			target:"slot_end_date",
			dateFormat:"%d-%M-%Y"
			/*selectedDate:{				This is an example of what the full configuration offers.
				day:5,						For full documentation about these settings please see the full version of the code.
				month:9,
				year:2006
			},
			yearsRange:[1978,2020],
			limitToToday:false,
			cellColorScheme:"beige",
			dateFormat:"%m-%d-%Y",
			imgPath:"img/",
			weekStartDay:1*/
		});

};

$(function(){
    $('form').submit(function(){
      	//alert("I am in submit form function");
        var postData = $(this).serialize();
        //alert(postData);
        $.ajax({
            type: 'POST',
            data: postData,
            url: 'http://'+server_ip+':'+server_port+'/queue/php/createSlots.php',
            success: function(data){
            	alert("Slots Created");
              	//test
              	//var objJSON = eval("(function(){return " + data + ";})()");
               	//alert(objJSON.workingdays);
               	//alert(objJSON.no_of_days);
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
        });
        return false;
    });
});