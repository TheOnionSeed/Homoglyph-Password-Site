//Global Dictionary
var glyphDictionary = {};

//Initializations 
getDictionary();
$(document).ready(initEvents);


//Init all the required events
function initEvents(){
	$("#userWordBtn").click(function(){
		var userWord = $("#userWord").val();
		wordToGlyphed(userWord,"#userGlyphed");
	});
	
	$("#randomPassBtn").click(randomPassword);
}

//---------------------USER_GENRATED PASSWORD------------------------

//initialize the parsing process
function getDictionary(){
	$.getJSON( "./scripts/dictionary/homoglyphDictionary.json", function( data ) {
		glyphDictionary = data;
	});
}

//Convert a word to a glyphed password
function wordToGlyphed(word,outputID){
	var password = "";
	for(var i = 0; i < word.length; i++){
		var key = word.charAt(i);
		var values = glyphDictionary[key];
		
		var randInd = Math.floor(Math.random() * (values.length));
		
		password += values[randInd];
	}
	$(outputID).html(password);
}
//---------------------END USER_GENRATED PASSWORD------------------------



////-------------------RANDOM PASSWORD-----------------------------

//Generate a random password with a real english word
function randomPassword(){
	var length = parseInt($("#passwordLength").val());
	
	if (isInteger(length))
		choosePassword(length);
	
}
//Choose a random password with certain length
function choosePassword(length){
	$.getJSON( "./scripts/dictionary/dictionary.json", function( data ) {
		var lengthArray = data[length];
		var randInd = Math.floor(Math.random() * (lengthArray.length));
		$("#chosenWord").html(lengthArray[randInd]);
		wordToGlyphed(lengthArray[randInd] , "#glyphedPassword");
	});
}
//check if input variable is an integer
function isInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0);
}
