function startCall() {

document.getElementById("screen").innerHTML =

"Welcome to Hospital Enquiry System <br><br>" +

"Press 1 for Visiting Hours <br>" +

"Press 2 for Doctor Availability <br>" +

"Press 3 for Hospital Address <br>" +

"Press 4 for Contact Details <br>" +

"Press 5 to Exit";

}

function endCall(){

document.getElementById("screen").innerHTML =

"Call Ended <br> Thank you for calling.";

}

function pressKey(key){

if(key=="1"){

document.getElementById("screen").innerHTML =

"Hospital Visiting Hours <br><br>" +

"Morning: 10 AM - 1 PM <br>" +

"Evening: 4 PM - 7 PM";

}

else if(key=="2"){

document.getElementById("screen").innerHTML =

"Doctor Availability <br><br>" +

"General Doctor: 9 AM - 2 PM <br>" +

"Specialist: 5 PM - 8 PM";

}

else if(key=="3"){

document.getElementById("screen").innerHTML =

"Hospital Address <br><br>" +

"ABC Hospital <br>" +

"Hyderabad";

}

else if(key=="4"){

document.getElementById("screen").innerHTML =

"Contact Number <br><br>" +

"9876543210";

}

else if(key=="5"){

document.getElementById("screen").innerHTML =

"Thank you for calling <br>" +

"Goodbye";

}

}