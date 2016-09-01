/**
 * Alexa voice home automation
 */
var awsIot = require('aws-iot-device-sdk');
var deviceName = "voice-chair";  
var host = "a3jra11pv5kiyg.iot.us-east-1.amazonaws.com";
var app_id = "amzn1.ask.skill.2b38790d-905a-4005-ad73-908f63e1622f"

var thingShadows = awsIot.thingShadow({
   keyPath: './private.pem.key',
  certPath: './certificate.pem.crt',
    caPath: './rootCA.pem',
  clientId: deviceName,
    region: "us-east-1",
});

var ctx = null;

// Route the incoming request based on type (LaunchRequest, IntentRequest, etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        ctx = context;

        if (event.session.application.applicationId !== app_id) {
             ctx.fail("Invalid Application ID");
         }
 
        thingShadows.on('connect', function() {
			thingShadows.register('voice-chair');
 
		});
		
		thingShadows.on('message', function(topic, payload) {
            console.log('message', topic, payload.toString());
        });
     
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }
        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request, event.session);
        }  else if (event.request.type === "IntentRequest") {
            onIntent(event.request, event.session);
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            ctx.succeed();
        }
    } catch (e) {
        console.log("EXCEPTION in handler:  " + e);
        ctx.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId + ", sessionId=" + session.sessionId);
}


/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session ) {                  //, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
    intentName = intentRequest.intent.name;

    console.log("REQUEST to string =" + JSON.stringify(intentRequest));

    var callback = null;
    // Dispatch to your skill's intent handlers
    if ("BedroomLightOn" === intentName) {
		thingShadows.publish('taifur/test/pi/voice', 'Bedlighton', function(){
			var cardTitle = "Bedroom Lamp on";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your bedroom light is on. ";
			repromptText = "Your bedroom light is on. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
	
    }else if ("BedroomLightOff" === intentName) {
		thingShadows.publish('taifur/test/pi/voice', 'Bedlightoff', function(){
			var cardTitle = "Lamp on";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your bedroom light is off. ";
			repromptText = "Your bedroom light is off. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
	
    }else if ("KitchenLightOn" === intentName) {
		thingShadows.publish('taifur/test/pi/voice', 'Kitchenlighton', function(){
			var cardTitle = "Lamp on";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your kitchen light is on. ";
			repromptText = "Your kitchen light is on. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
	
    }else if ("KitchenLightOff" === intentName) {
		thingShadows.publish('taifur/test/pi/voice', 'Kitchenlightoff', function(){
			var cardTitle = "Lamp on";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your kitchen light is off. ";
			repromptText = "Your kitchen light is off. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
	
    }else if ("BathroomLightOn" === intentName) {
		thingShadows.publish('taifur/test/pi/voice', 'Bathroomlighton', function(){
			var cardTitle = "Lamp on";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your bathroom light is on. ";
			repromptText = "Your bathroom light is on. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
	
    }else if ("BathroomLightOff" === intentName) {
        thingShadows.publish('taifur/test/pi/voice', 'Bathroomlightoff', function(){
			var cardTitle = "Lamp off";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your bathroom light is off. ";
			repromptText = "Your bathroom light is off. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
		
    }else if ("BedroomFanOn" === intentName) {
		thingShadows.publish('taifur/test/pi/voice', 'Bedroomfanon', function(){
			var cardTitle = "Lamp on";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your bedroom fan is on. ";
			repromptText = "Your bedroom fan is on. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
	
    }else if ("BedroomFanOff" === intentName) {
        thingShadows.publish('taifur/test/pi/voice', 'Bedroomfanoff', function(){
			var cardTitle = "Lamp off";
			var repromptText = "";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Your bedroom fan is off. ";
			repromptText = "Your bedroom fan is off. ";
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		});
		
    }else if ("IncreaseSpeed" === intentName) {
		  var speedLevelSlotInc = intent.slots.Speed;
		  var speedLevelInc = speedLevelSlotInc.value;
	      thingShadows.publish('taifur/test/pi/voice', 'Inc' +speedLevelInc, function(){
		    var cardTitle = "Fan Speed";
		    var repromptText = "";
		    var speechOutput = "Fan speed is adjusted to " + speedLevelInc + " percent. ";
			var sessionAttributes = {};
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));			
	    });
	
	}else if ("DecreaseSpeed" === intentName) {
          var speedLevelSlot = intent.slots.Speed;
		  var speedLevel = speedLevelSlot.value;
	      thingShadows.publish('taifur/test/pi/voice', 'Dec' +speedLevel, function(){
		    var cardTitle = "Fan Speed";
		    var repromptText = "";
		    var speechOutput = "Fan speed is adjusted to " + speedLevel + " percent. ";
			var sessionAttributes = {};
			var shouldEndSession = false;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));			
	    });
		
    }else if ("AMAZON.HelpIntent" === intentName) {
        getHelp(callback);
    }else if ("AMAZON.StopIntent" === intentName || "AMAZON.CancelIntent" === intentName) {
        handleSessionEndRequest(callback);
    }else {
        throw "Invalid intent";
    }

}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse() {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to Pi Home Master . I can control your electrical appliances. Tell me what can I do for you. ";

    var repromptText = "I am ready for command.";
    var shouldEndSession = false;

    ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));

}

function getHelp() {
	var sessionAttributes = {};
    var cardTitle = "Help";
    var speechOutput = "Welcome to pi home master, I can control your light and fan. " + 
    "You can ask me by saying, turn on my bedroom light or turn off my bedroom fan.";
    var repromptText = "Would you like to control your light or fan?";
    var shouldEndSession = false;

    ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
}

function handleSessionEndRequest() {
	var sessionAttributes = {};
    var cardTitle = "Session Ended";
    var speechOutput = "Thank you for using pi home master, Have a nice day!";
    var shouldEndSession = true;
	var repromptText = "";
    ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
}


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    }
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
}

