var server_ip;
var server_port;

window.onload=function(){
	$.getJSON('serverip.json',function(data){
	    $.each(data, function(){
	    	server_ip=this.ipaddress;
    		server_port=this.port;
			getDashboard();
			setInterval(getDashboard,1000);
		});
    });
	GetClock();
	setInterval(GetClock,1000);
}

function getDashboard() {
	$.ajax({
            type: 'GET',
            url: 'http://'+server_ip+':'+server_port+'/queue/php/getDashboard.php',
            success: function(data){
            	//alert(data);
    			var json= JSON.parse(data);
    			var number_of_elements=json["slotdetails"].length;
    			//alert(number_of_elements);
	          	for (i=0;i<=11;i++) {
	          		var j=i+1;
		          	j=j.toString();
					var appttime="appttime"+j;
					var patientname="patientname"+j;
					var appttype="appttype"+j;
					var status="status"+j;
					var tablecell="cell"+j;
					if ((i+1)<=number_of_elements) {
						var tc=document.getElementById(tablecell);
						if (i==0) {
							tc.className="tab1";
						}
						document.getElementById(appttime).innerHTML=json.slotdetails[i].dmyactualslotstart;				
						if (json.slotdetails[i].patientname!="") {
							document.getElementById(patientname).innerHTML=json.slotdetails[i].patientname;
							if (i!=0) tc.className="tabbooked";
						} 
						else {
							document.getElementById(patientname).innerHTML="FREE SLOT";
							tc.className="tabfree";
						}
						if (json.slotdetails[i].appttype=='APPT001') {
							document.getElementById(appttype).innerHTML="Prior Appointment";
							
						}
						else { 
							document.getElementById(appttype).innerHTML="Walk-in";					          	
						}
						document.getElementById(status).innerHTML=json.slotdetails[i].reportingstatus;					          	
						var j=0;
					} else {
						var tc=document.getElementById(tablecell);
						tc.className="tabgrey";
						document.getElementById(appttime).innerHTML="";
						document.getElementById(patientname).innerHTML="";
						document.getElementById(appttype).innerHTML="";
						document.getElementById(status).innerHTML="";
					}
	          }  	
            },
            error: function(){
		        alert("There seems to be a technical error. Please try again later");
            }
           
        });
}
