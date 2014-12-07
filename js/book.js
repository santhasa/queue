var server_ip;
var server_port;
var existing_patient;

$(window).load(function () {   

	$.getJSON('serverip.json',function(data){
    	// data is an array of objects
	    $.each(data, function(){
	    	server_ip=this.ipaddress;
    		server_port=this.port;
    		//alert(server_ip);
    	});
    });
    //alert("test");
    
});

function getApptDate(appttype) {
	//alert(appttype.value);
	appttypecode=appttype.value;
	doctor_code=document.getElementById('patient_doc_name').value;
	hospital_code="HOS001";
	appointment_status="Not Booked";
	
		$.ajax({
            type: 'GET',
            async: false,
            url: 'http://'+server_ip+':'+server_port+'/queue/php/getApptDate.php?appttype='+appttypecode+'&doctorcode='+
            doctor_code+'&hospitalcode='+hospital_code+'&appointmentstatus='+appointment_status,
            success: function(data){
            		//alert("Deleting data");
            		//remove all existing element from select
            		$('#appt_date')
 					   .find('option')
					   .remove()
					   .end()
					   .append('<option value="0">--Select--</option>')
					   .val('0')
					;
					//end removal
            		//alert("Adding data");
                   	var json= JSON.parse(data);
					today = new Date();
					var dateString = today.format("yyyy-m-dd");
					//alert(dateString);
					var x = document.getElementById("appt_date");
					//alert(json.appointmentdates[0].apptdate);
					for (var i=0;i<json["appointmentdates"].length;i++) {
						//alert(dates.compare(datestring,json.appointmentdates[i].apptdate));
						var option = document.createElement("option");
						option.text = json.appointmentdates[i].dmydate;
						option.value = json.appointmentdates[i].apptdate;
						x.add(option);
					}
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
        });
	
}

function getApptTime(apptdate) {
	//alert(appttype.value);
	apptdate=apptdate.value;
	doctor_code=document.getElementById('patient_doc_name').value;
	hospital_code="HOS001";
	appointment_status="Not Booked";
	
		$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/getApptTime.php?appttype='+appttypecode+'&doctorcode='+
            doctor_code+'&hospitalcode='+hospital_code+'&appointmentstatus='+appointment_status+'&apptdate='+apptdate,
            success: function(data){
		            //remove all existing element from select
            		$('#patient_appt_time')
 					   .find('option')
					   .remove()
					   .end()
					   .append('<option value="0">--Select--</option>')
					   .val('0')
					;
					//end removal
            		//alert(data);
                   	var json= JSON.parse(data);
					var x = document.getElementById("patient_appt_time");
					for (var i=0;i<json["appointmenttime"].length;i++) {
						var option = document.createElement("option");
						option.text = json.appointmenttime[i].ampmtime;
						option.value = json.appointmenttime[i].appttime;
						x.add(option);
					}
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
        });
	
}

function validateMobileNumber() {
	var patient_name=document.getElementById("patient_name").value;
	var mobno=document.getElementById("mobile_number").value;
	$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/validateMobileNumber.php?mobilenumber='+mobno+'&patient_name='+patient_name,
            success: function(data){
            	var objJSON = eval("(function(){return " + data + ";})()");
               	//alert(objJSON.data);
               	if (objJSON.data=="Success") {
               		if (objJSON.no>1) {
               			//alert ("There are more than one patients who have registered with the same mobile number. Please enter the name and try again.");
            	   		document.getElementById("error_text").style.display= "block";
            	   		document.getElementById("patient_name").focus();

               		} else {
            	   		document.getElementById("error_text").style.display= "none";
	               		document.getElementById("patient_name").value=objJSON.patient_name;
    	           		document.getElementById("patient_age").value=objJSON.patient_age;
        	       		$('#patient_gender').val(objJSON.patient_gender);
            	   		document.getElementById("patient_doc_name").focus();
               			existing_patient="Y";
               		}
               	}
               	else {
	               	existing_patient="N";
	            }
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
        });
    $.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/getDoctors.php',
            success: function(data){
            	$('#patient_doc_name')
 					   .find('option')
					   .remove()
					   .end()
					   .append('<option value="0">--Select--</option>')
					   .val('0')
					;
            	var json= JSON.parse(data);
            	var x = document.getElementById("patient_doc_name");
				for (var i=0;i<json["doctor_details"].length;i++) {
					var option = document.createElement("option");
					option.text = json.doctor_details[i].doctor_name;
					option.value = json.doctor_details[i].doctor_code;
					x.add(option);
				}
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
           
        });
   
}
$(function(){
    $('form').submit(function(){
      	//alert("I am in submit form function");
        var postData = $(this).serialize();
        //alert(postData);
        $.ajax({
            type: 'POST',
            data: postData,
            url: 'http://'+server_ip+':'+server_port+'/queue/php/book.php?existing_patient='+existing_patient,
            success: function(data){
            	//alert(data);
              	var objJSON = eval("(function(){return " + data + ";})()");
				if (objJSON.msg=="success") {
		            if (objJSON.existing=="N") {
	               		alert("Patient Registered. Registration No. "+objJSON.patient_code);
    	        		alert("Appointment number is " + objJSON.booking_no);
        		    } 
        		    else {
               			alert("Appointment number is " + objJSON.booking_no);
	        	   	}
    	     		location.reload();
    	       }
    	       else {
    	       		alert("This patient has another appointment on the same day. Sorry!");
    	       }
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
        });
        return false;
    });
});
