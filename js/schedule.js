function openWindowWithPost(when) {window.open(when, "_self")}

var shallwe = false;
var ndo = "dontknowyet";

function getDayFromUrl() {
 	var query = location.search.substr(1);
	var whats =  query.split("=");
	var result =  whats[1];
	var today = new Date();
	
	var h = today.getHours();
	if(h < 10){
		h = "0"+ h;
	} else {
		var h = h;
	};
	
    var m = today.getMinutes();

	var weekday = new Array(7);
	
weekday[0]=  "sun";
weekday[1] = "mon";
weekday[2] = "tue";
weekday[3] = "wed";
weekday[4] = "thu";
weekday[5] = "fri";
weekday[6] = "sat";

var da = weekday[today.getDay()];
	
if(result == da){
	
	window.shallwe = true;
	
	if (m < 15) {
		window.ndo = "h"+ h +"_00"	
	}else if (m >= 15 && m < 30) {
			window.ndo = "h"+ h +"_15"
		//document.getElementById(ndo).innerHTML = "zio";
	}else if (m >= 30 && m < 45) {
		window.ndo = "h"+ h +"_30"
	} else if (m >= 45) {
		window.ndo = "h"+ h +"_45"
	}
}
	return result;
}

var theday = getDayFromUrl();

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	var da = today.getDay();
	var mo = today.getMonth();
	var no = today.getDate();
	var ye = today.getFullYear();
	
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var da = weekday[today.getDay()];

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var mo = month[today.getMonth()];

    m = checkTime(m);
    s = checkTime(s);
	
    var t = setTimeout(startTime, 500);
	document.getElementById("dater").innerHTML = h+":"+m+":"+s+"</br></br>"+da+" "+mo+" "+no+" "+ye;
	
	return da;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

startTime();



function checkday(z){



var lookfor = theday + "s";


document.getElementById(lookfor).className = "istoday";
	
	if(z<10){z = "0"+z;}else{z = z;};
	
	var lineh1 = "h"+ z + "_00";
	var lineh2 = "h"+ z + "_15";
	var lineh3 = "h"+ z + "_30";
	var lineh4 = "h"+ z + "_45";

	var linet1 = "t" + z + "_00";
	var linet2 = "t" + z + "_15";
	var linet3 = "t" + z + "_30";
	var linet4 = "t" + z + "_45";
	
	var jolly1 =  eval( theday + "_"+ z + "_q1");
	var jolly2 =  eval( theday + "_"+ z + "_q2");
	var jolly3 =  eval( theday + "_"+ z + "_q3");
	var jolly4 =  eval( theday + "_"+ z + "_q4");
	
	var jolly1t = jolly1["title"];
	var jolly2t = jolly2["title"];
	var jolly3t = jolly3["title"];
	var jolly4t = jolly4["title"];
	
//	var info1t = jolly1["file"];
//	var info2t = jolly2["file"];
//	var info3t = jolly3["file"];
//	var info4t = jolly4["file"];
	

	document.getElementById(lineh1).innerHTML =  z + ":00...";
	document.getElementById(lineh2).innerHTML =  z + ":15...";
	document.getElementById(lineh3).innerHTML =  z + ":30...";
	document.getElementById(lineh4).innerHTML =  z + ":45...";

	document.getElementById(linet1).innerHTML = jolly1t;
	

document.getElementById(linet1).innerHTML=  jolly1t  ;

	document.getElementById(linet2).innerHTML = jolly2t;
	
	if(jolly2t == undefined){
		document.getElementById(linet2).innerHTML = document.getElementById(linet1).innerHTML;
	}else{
		document.getElementById(linet2).innerHTML =  jolly2t ;	
	};
	
	if(jolly3t == undefined){
		document.getElementById(linet3).innerHTML = document.getElementById(linet2).innerHTML;
	}else{
		document.getElementById(linet3).innerHTML = jolly3t;	
	};
	
	if(jolly4t == undefined){
		document.getElementById(linet4).innerHTML = document.getElementById(linet3).innerHTML;
	}else{
		document.getElementById(linet4).innerHTML = jolly4t ;	
	};
	
	if(window.shallwe){
	document.getElementById(window.ndo).innerHTML = "..NOW.....";	
	};
}

var callCount = 0;

checkday(callCount);

var repeater = setInterval(function () {
  if (callCount < 23) {
    callCount += 1;
	checkday(callCount);
  } else {
    clearInterval(repeater);
  }
}, 1);
