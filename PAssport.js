
    var is_valid = 0;
    var start = 0; var end = 0;
        
	$(document).ready(function() {
		$("body").on("click", "#refreshimg", function(){
			$.post(PATH+"/user/reg-captcha", function( data ) {
				$("#captchaimage").html(data);
			});
			return false;
		});	

		$("#appdate").attr("autocomplete", "off");

		$("#upload-form").validate({
			rules: {				
				appdate: {
					required: true
				},
				apptime: {
					required: true
				},
				captcha: {
			            required: true,
			            remote: PATH + "/user/reg-captcha/check"
			          }
			},
			messages: {
				appdate: "လျှောက်ထားလိုသည့်ရက်ရွေးပါ။",
				apptime: "လျှောက်ထားလိုသည့်အချိန်ရွေးပါ။ ",
				captcha: "လုံခြုံရေးစိစစ်ရန်စာသားအား မှန်ကန်စွာဖြည့်ပါ။"
			},
			invalidHandler: function(form, validator) {
            	$.post(PATH+"/user/reg-captcha", function( data ) {
					$("#captchaimage").html(data);
				});
				$('#captcha').focus();
      		},

			errorElement : 'div',
			errorLabelContainer: '.errorTxt'
		});					
	});
	
	$('#btnNext').click(function(){  Event.preventDefault();     
		var selected_Id = $('input[name="apptime"]:checked').attr('id');
		
		if(selected_Id == undefined)	{
			showpopup('Warning!', 'Booking ပြုလုပ်လိုသော အချိန်ကိုရွေးပါ။', 'warning');
		}
		else{
			if($("#upload-form").valid()){
				
				var ip = "";
			    jQuery.ajaxSetup({async:false});
			    $.getJSON("https://api.ipify.org?format=json", function(data) {
		            ip = data.ip;
		        });
			    
				var selected_Id = $('input[name="apptime"]:checked').attr('id');
				var post_obj = {  
		            "appdate": $('#appdate').val(), 
		            "apptime": $('#'+selected_Id).val(), 
		            "station": $('#ddl_station').val(), 
		            "no_of_booking": $('#ddl_no_of_booking').val(), 
		            "ip_address": ip,
		            "captcha": $('#captcha').val(),
		            "start_day" : start,
					"end_day" : end,
					"rand_1": $('#hdn_id').val(),
		        };
		        
		        $.ajax({
		            type: 'POST',
		            url: PATH+'/user/reserve',       
		            data: post_obj  ,
		            success: function (data) { 
		            	 window.location.href = PATH + '/user/booking_info';
		            },
		            error: function () {  window.location.href = PATH + '/user/booking_info';                
		            }
		        });
			}
		}
	});

	function showpopup(title, message, icon){
		Swal.fire({
				  	title: title,
				  	text: message, 
				  	icon: icon,
				  	confirmButtonText: 'OK'
				});
	}

    var click_count = 0 ;

    //change
	$("#appdate").click( function(){ 
		if(click_count == 0){
			var obj = {
				rand_1: $('#hdn_id').val()
			};
			
			$.ajax({
	            async: false,
	            type: "POST",
	            data: obj,
	            url: PATH+"/user/get-config/",
	            success: function (data) {
	            	console.log(data);	            	
	            	
					if(data.message.connect_error == 1){
						showpopup('Warning!', 'အသုံးပြုသူများနေသည့်အတွက် ခေတ္တစောင့်ဆိုင်းပြီးမှ ထပ်မံအသုံးပြုစေလိုပါသည်။', 'warning');
					}
					else if(data.message.connect_error  == -1)
					{
						window.location.href = PATH + '/user/booking'; 
					}
					else{
						$('#hdn_id').val(data.message.random);
						start = data.message.ret_arr.from_day;		 
					 	end = data.message.ret_arr.to_day;
						
						var minDate = data.message.ret_arr.from_date;
					 	var maxDate = data.message.ret_arr.to_date;				 
					 
	                	minDate = $.datepicker.parseDate("yy-mm-dd", data.message.ret_arr.from_date);
	                
	                	maxDate = $.datepicker.parseDate("yy-mm-dd", data.message.ret_arr.to_date);
	                
						weekend = data.message.ret_arr.weekend;
						gholiday = data.message.ret_arr.holiday;
						var holiday_data = "<ul>";
						for(var i=0; i<gholiday.length; i++){
							
						    var myArray = gholiday[i]['closed_date'].split("-");
	                        var datestring = myArray[2]  + "-" + myArray[1] + "-" + myArray[0];
	                        
						    holiday_data += '<li>'+datestring+' ('+gholiday[i]['description']+')</li>';
							
						}
						holiday_data += "</ul>";
						$("#show_holiday").html(holiday_data);
						
		            	InitDatePickers(minDate, maxDate);  
		            	
						var no_of_booking = "";
						for(i=1; i<=data.message.ret_arr.max_person; i++)
						{
							no_of_booking += '<option value="'+i +'">'+ i +'</option>';
						}
						$('#ddl_no_of_booking').html(no_of_booking);  
						click_count++;
					}					
	            }
	        });
		}		
	});
	//change
	$("#appdate").change( function(){ 
		$("#appointtime").html("");
		var obj = {
			appdate : $(this).val(),
			rand_1: $('#hdn_id').val(),
			start_day : start,
			end_day : end
		};
		
		$.ajax({	            
            type: "POST",
            url: PATH+"/user/get-time",
            data: obj,
            success: function (data) {
            	console.log(data);
            	if(data.message.connect_error == ""){
					showpopup('Warning!', 'အသုံးပြုသူများနေသည့်အတွက် ခေတ္တစောင့်ဆိုင်းပြီးမှ ထပ်မံအသုံးပြုစေလိုပါသည်။', 'warning');
				}
				else if(data.message.connect_error == -1){
					window.location.href = PATH + '/user/booking'; 
				}
				else
				{	
					$('#hdn_id').val(data.message.random);
					var data = data.message.ret_arr;
					const myArray = data.split("--");
	            	$("#appointtime").html(myArray[0]);

	            	if(myArray.length>1) $('#btnNext').attr('disabled', true);
	            	else $('#btnNext').attr('disabled', false);						
				}
            }
        });
		$('#ddl_no_of_booking').val(1);
		return false;
	});	

	function publicHoliday(date) {
		var yyyy = date.getFullYear().toString();
  		var mm = (date.getMonth()+1).toString();
  		var dd  = date.getDate().toString();

  		var mmChars = mm.split('');
  		var ddChars = dd.split('');

  		date1 = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);

      	for (i = 0; i < gholiday.length; i++) {  	  
        	if (date1 == gholiday[i]['closed_date']) {
          		return [false,''];
        	}
      	}   
      	for (i = 0; i < weekend.length; i++) { 	  
        	if (date1 == weekend[i]) {
          		return [false,''];
        	}
      	}     	
      	return [true, ''];
	}
	
	function InitDatePickers(minDate, maxDate){
		$("#appdate").datepicker({
			dateFormat: "dd-mm-yy",
			minDate: minDate,
			maxDate: maxDate,	
			beforeShowDay: publicHoliday,
		});
		$('#appdate').datepicker("show");
	}
