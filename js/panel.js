var server_ip;
var server_port;

window.onload=function(){
	$.getJSON('serverip.json',function(data){
	    $.each(data, function(){
	    	server_ip=this.ipaddress;
    		server_port=this.port;
			refreshPanel();
			//setInterval(refreshPanel,10000);
		});
    });
}

function refreshPanel() {
	$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/getPatientsForPanel.php',
            success: function(data){
            	//alert(data);
				var objJSON = eval("(function(){return " + data + ";})()");
               	//alert(objJSON.data);
               	 document.getElementById("list").innerHTML=objJSON.html;				
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
           
        });
}

function patientReporting() {
	var rates = document.getElementsByName('choose');
	var rate_value;
	for(var i = 0; i < rates.length; i++){
    	if(rates[i].checked){
        	rate_value = rates[i].value;
	    }
	}
	var apptnumber = rate_value;
	//alert(apptnumber);
	$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/updatePatientReporting.php?appointment_number='+apptnumber,
            success: function(data){
            		alert("Patient reporting status updated");
            		location.reload();
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
           
    });
}

function startConsultation() {
	var rates = document.getElementsByName('choose');
	var rate_value;
	for(var i = 0; i < rates.length; i++){
    	if(rates[i].checked){
        	rate_value = rates[i].value;
	    }
	}
	var apptnumber = rate_value;
	alert(apptnumber);
	$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/startConsultation.php?appointment_number='+apptnumber,
            success: function(data){
            		alert("Patient appointment status updated");
            		location.reload();
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
           
    });
}

function finishConsultation() {
	var rates = document.getElementsByName('choose');
	var rate_value;
	for(var i = 0; i < rates.length; i++){
    	if(rates[i].checked){
        	rate_value = rates[i].value;
	    }
	}
	var apptnumber = rate_value;
	//alert(apptnumber);
	$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/finishConsultation.php?appointment_number='+apptnumber,
            success: function(data){
            		alert("Patient appointment status updated");
            		location.reload();
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
           
    });
}
