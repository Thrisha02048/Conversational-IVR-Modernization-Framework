let state = {
session_active:true,
last_intent:null
}

function addMessage(sender,text){

let chat=document.getElementById("chat")

let div=document.createElement("div")

div.innerHTML="<b>"+sender+":</b> "+text

chat.appendChild(div)

chat.scrollTop=chat.scrollHeight

}

function detectIntent(text){

text=text.toLowerCase()

if(text.includes("visit") || text.includes("timing") || text.includes("hours"))
return "visiting_hours"

if(text.includes("doctor") || text.includes("specialist"))
return "doctor_info"

if(text.includes("emergency") || text.includes("ambulance"))
return "emergency"

if(text.includes("appointment") || text.includes("booking"))
return "appointment"

if(text.includes("location") || text.includes("address"))
return "location"

return "fallback"

}

function extractEntity(text){

text=text.toLowerCase()

if(text.includes("cardiology"))
return "cardiology"

if(text.includes("orthopedic"))
return "orthopedic"

return null

}

function backendService(intent,entity){

if(intent=="visiting_hours")
return "Hospital visiting hours are 10 AM to 1 PM and 4 PM to 7 PM."

if(intent=="doctor_info"){

if(entity=="cardiology")
return "Cardiology doctor is available from 11 AM to 3 PM."

if(entity=="orthopedic")
return "Orthopedic doctor is available from 10 AM to 2 PM."

return "Doctors are available from 9 AM to 5 PM Monday to Saturday."

}

if(intent=="emergency")
return "Emergency services are available 24 hours."

if(intent=="appointment")
return "You can book an appointment at reception between 9 AM and 4 PM."

if(intent=="location")
return "City Hospital is located near central bus station."

return null

}

function getResponse(intent,entity){

let result=backendService(intent,entity)

if(result!=null)
return result

return "Sorry I did not understand your request. Please ask about visiting hours, doctors, appointments or emergency services."

}

function speak(text){

let speech=new SpeechSynthesisUtterance(text)

speech.lang="en-IN"

window.speechSynthesis.speak(speech)

}

function processInput(text){

addMessage("You",text)

let intent=detectIntent(text)

let entity=extractEntity(text)

state.last_intent=intent

let response=getResponse(intent,entity)

addMessage("System",response)

speak(response)

}

function sendText(){

let input=document.getElementById("textInput")

let text=input.value

if(text.trim()=="")
return

input.value=""

processInput(text)

}

function startVoice(){

const recognition=new webkitSpeechRecognition()

recognition.lang="en-IN"

recognition.onresult=function(event){

let text=event.results[0][0].transcript

processInput(text)

}

recognition.start()

}

function resetChat(){

document.getElementById("chat").innerHTML=""

state={session_active:true,last_intent:null}

}

document.getElementById("textInput").addEventListener("keypress",function(e){

if(e.key==="Enter")
sendText()

})

window.onload=function(){

let welcome="Welcome to City Hospital Conversational IVR. You can ask about visiting hours, doctors, emergency services, appointments or hospital location."

addMessage("System",welcome)

speak(welcome)

}