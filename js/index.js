var server_ip;
var server_port;
$(window).load(function () {   
	$.getJSON('serverip.json',function(data){
    	// data is an array of objects
	    $.each(data, function(){
	    	server_ip=this.ipaddress;
    		server_port=this.port;
  		   	getindexpageupdate();
    	});
    });
});


function getindexpageupdate() {
		$.ajax({
            type: 'GET',
            async: false,
            url: 'http://'+server_ip+':'+server_port+'/queue/php/apptforindex.php',
            success: function(data){
               	var objJSON = eval("(function(){return " + data + ";})()");
               	document.getElementById("todaysappointments").innerHTML=objJSON.html;
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
        });
}
