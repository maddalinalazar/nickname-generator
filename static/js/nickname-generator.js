var CONSTANTS = {
	submitButtonID: "generator-nickname-submit",
	jQueryIDSelector: '#',
	generatorValueKey: 'generator',
	firstNameInputFieldID: 'first-name',
	surnameInputFieldID: 'surname', 
	phoneInputFieldID: 'phone-number', 
	zodiacSelectorFieldID: 'zodiac', 
	colorSelectorFieldID: 'color', 
	detailSeparator: '-'
}
//although not good, let's hardcode some nicknames
var nicknames = {
	anime: {
			firstInitial: ['Super', 'Berserk', 'Chibi', 'Digi', 'Detective', 'Fighting', 'Robot', 'Henshin', 'Fullmetal', 'Magical', 'Happy', 'Lovely', 'Kamen', 'Neo', 'Lucky', 'Pretty', 'Samurai', 'Dark', 'Sailor', 'Phantom Thief', 'Ultimate', 'Vampire', 'Doki-Doki', 'Psychic', 'Sparkling', 'Power'],
			lastInitial:  ['Masochist', 'Devil', 'Cat', 'Monster', 'Vampire', 'Sadist', 'Alchemist', 'Pretty-Girl', 'Exorcist', 'Little Sister', 'Prince', 'Student', 'Magician', 'Mermaid', 'Princess', 'Idol', 'Big-Brother', 'Pretty-Boy', 'Alien', 'Angel', 'Ninja', 'Rose', 'Bride', 'Fighter', 'Spirit Monster', 'Teacher']
		}, 
	cat: {
		lastDigitPhoneNumber: ['Princess', 'Chancellor', 'Doctor', 'Judge', 'General', 'Emperor', 'Madam', 'Sir', 'Count', 'Professor'],
		zodiacSign: {
			aries: 'Fluffy',
			taurus: 'Bossy',
			gemini: 'Furry',
			cancer: 'Kissy',
			leo: 'Fishy',
			virgo: 'Sassy',
			libra: 'Scratchy',
			scorpio: 'Kitty',
			sagitarius: 'Pouncey',
			capricorn: 'Hissy',
			aquarius: 'Snuggly',
			pisces: 'Hairy'
		},
		color: {
			red: 'McClump',
			orange: 'Von Litter',
			yellow: 'Pants',
			green: 'McPaws',
			blue: 'Von Scooper',
			white: 'Whiskers',
			pink: 'Bottom',
			purple: 'McMittens'
		}
	}, 
	hipster: {
		firstInitial: ['Peaches', 'Pilot', 'Tiny', 'Angel', 'Princess', 'Ruby', 'Snow', 'Manna', 'Sage', 'Brooklyn', 'Queen', 'Blue', 'Velvet', 'Moon', 'Zany', 'Pearl', 'Wild', 'High', 'Duke', 'India', 'Presence', 'King', 'Shiny', 'Camden', 'Amber'],
		lastInitial:  ['Marrow', 'Rocket', 'Clementine', 'Sweet', 'Trixibelle', 'Pickle', 'Dream', 'Oak', 'Driver', 'Sparkle', 'River', 'Mouse', 'Dog', 'Math', 'Bag', 'Kiss', 'Button', 'Milk', 'Pirate', 'Clone', 'Past', 'Cave', 'Haze', 'Nanny', 'Star', 'Ring']
	}, 
	superhero: {
		firstInitial: ['Captain', 'Princess', 'Boy', 'Girl', 'Superman', 'Supergirl', 'Widow', 'Prince', 'Lord', 'King', 'Queen', 'Black', 'Widow', 'Wonder', 'Cat', 'Woman', 'Man', 'Mistress', 'Mister', 'Invisible', 'Apollo', 'King', 'Iron', 'Spider', 'Amber'],
		lastInitial:  ['America', 'Rocket', 'Robin', 'Super', 'Supergirl', 'Black', 'Dream', 'Oak', 'Driver', 'Sparkle', 'River', 'Mouse', 'Dog', 'Math', 'Bag', 'Kiss', 'Button', 'Milk', 'Pirate', 'Clone', 'Past', 'Cave', 'Haze', 'Nanny', 'Star', 'Ring']
	}, 
	villain: {
		firstInitial: ['The Evil', 'The Mad', 'The Big', 'The Dangerous', 'Captain', 'The Ghostly', 'Professor', 'Doctor', 'Phantom', 'The Brutal', 'The Unstoppable', 'The Vile', 'The Dark', 'The Crazy', 'The Iron', 'The Poison', 'The Brutal', 'The Bloody', 'The Dark', 'The Dangerous', 'The Rancid', 'The Invisible', 'The Black', 'The Atomic', 'The Mega', 'The Grand'],
		lastInitial:  ['Shadow', 'Knight', 'Tarantula', 'Skull', 'Mastermind', 'Wizard', 'Ninja', 'Devil', 'Freak', 'Beast', 'Criminal', 'Master', 'Lord', 'Child', 'Corpse', 'Slayer', 'Spider', 'Creature', 'Werewolf', 'Monster', 'Vampire', 'Mutant', 'Robot', 'Claw', 'MAchine', 'Clown']
	}	
};
//nickanme handles copied from index.html
var aCharCode = 'a'.charCodeAt();

var nickNameHandlers = {
	cat : function(userParameters) {
		var userNicknameTokens = [],
			userNickname, 
			possibleNicknames = nicknames[userParameters.nicknameChoice];

		if (userParameters.lastDigitPhoneNumber) {
			userNicknameTokens.push(possibleNicknames.lastDigitPhoneNumber[parseInt(userParameters.lastDigitPhoneNumber)]);
		}

		if (userParameters.zodiacSign) {
			userNicknameTokens.push(possibleNicknames.zodiacSign[userParameters.zodiacSign]);
		}

		if (userParameters.color) {
			userNicknameTokens.push(possibleNicknames.color[userParameters.color]);
		}

		userNickname = userNicknameTokens.join(' ');
		return userNickname;
	}, 
	simple: function(userParameters) {
		var userNicknameTokens = [],
			userNickname, 
			possibleNicknames = nicknames[userParameters.nicknameChoice];

		if (userParameters.firstInitial) {
			userNicknameTokens.push(possibleNicknames.firstInitial[userParameters.firstInitial.charCodeAt() - aCharCode]);
		}

		if (userParameters.lastInitial) {
			userNicknameTokens.push(possibleNicknames.lastInitial[userParameters.lastInitial.charCodeAt() - aCharCode]);
		}

		userNickname = userNicknameTokens.join(' ');
		return userNickname;
	}

}

//end of nicname handlers

function updateNickname(serviceNicknameResponse) {
	if (serviceNicknameResponse.nickname) {
	    	//add the nickname and toggle the state of the paragraph if neccessary
	    	$('#' + 'generator-nickname-value').text(serviceNicknameResponse.nickname);
	    	if ($('#' + 'generator-nickname-value-wrapper').hasClass('hidden')) {
	    		$('#' + 'generator-nickname-value-wrapper').toggleClass('hidden')
	    	}
	}
}

function performAJAXRequest(methodName, serviceURL, requestData, handlerMethod) {
	console.log(requestData);
	//replaced AJAX request  with local call
	// $.ajax({
	//   method: methodName,
	//   url: serviceURL,  
	//   contentType: 'application/json; charset=utf-8',
	//   dataType: 'json',
	//   data: requestData
	// })
	// .done(handlerMethod);
	var generatedNickname = {},
		nicknameChoice = requestData.nicknameChoice;

	if (nicknameChoice == 'cat') {
		generatedNickname.nickname = nickNameHandlers[nicknameChoice](requestData);
	} else {
		generatedNickname.nickname = nickNameHandlers['simple'](requestData);
	}

	handlerMethod(generatedNickname);
}

function retrieveValueFromInputField(nicknameFields, selectedNicknameType, inputFieldTokenName) {
	var inputValue = nicknameFields.find('#' + CONSTANTS.generatorValueKey +  CONSTANTS.detailSeparator + selectedNicknameType + CONSTANTS.detailSeparator + inputFieldTokenName).val(); //format to lower case
	if (!inputValue) {
		alert('The value for' + inputFieldTokenName + ' should not be empty');
	}

	return inputValue.toLowerCase();
}

function buildRequestDataFromUserInput(nicknameChoice) {
	var requestData = {}, 
		nicknameFields;

	if (!nicknameChoice) {
		alert('No value chosen from the list of proposed nickname choices.')
	}

	nicknameFields = $('.generator-nickname-fields.'+ nicknameChoice); // all the input fields/form items that are needed for the current selection 
	requestData.nicknameChoice = nicknameChoice;

	//add the corresponding values from the forms
	switch (nicknameChoice) { //maybe query the page for the corresponding value
		case 'anime': 
		case 'hipster':
		case 'superhero':
		case 'villain':
			requestData.firstInitial = retrieveValueFromInputField(nicknameFields, nicknameChoice, CONSTANTS.firstNameInputFieldID).charAt(0); 
			requestData.lastInitial = retrieveValueFromInputField(nicknameFields, nicknameChoice, CONSTANTS.surnameInputFieldID).charAt(0);
			break;
		case 'cat': 
			var telephoneValue = retrieveValueFromInputField(nicknameFields, nicknameChoice, CONSTANTS.phoneInputFieldID);
			requestData.lastDigitPhoneNumber = telephoneValue.charAt(telephoneValue.length - 1);

			var zodiacSign = retrieveValueFromInputField(nicknameFields, nicknameChoice, CONSTANTS.zodiacSelectorFieldID);
			var preferredColor = retrieveValueFromInputField(nicknameFields, nicknameChoice, CONSTANTS.colorSelectorFieldID);

			requestData.zodiacSign = zodiacSign;
			requestData.color = preferredColor;
			break;
		default:
			alert('Invalid value was read from the nickname choice radio boxes.');	
	}

	return requestData;
}

/**
* Change the forms needed when the user clicks on a different nickname type
*/
$('#generator-nickname-type').change(function() {
	var currentSelection = $("#generator-nickname-type option:selected").val();
	$('.generator-nickname-fields').not('.hidden').toggleClass('hidden');
	$('.generator-nickname-fields.' + currentSelection).toggleClass('hidden')

});

/**
* Fetch the nickname based on the user's preferences. Attach event click handler to the 'submit button'
*/
$('#' + CONSTANTS.submitButtonID).click(function(event) {
	event.preventDefault();

	var	nicknameChoice = $("#generator-nickname-type option:selected").val();
	var requestData = buildRequestDataFromUserInput(nicknameChoice);

	performAJAXRequest('GET', "/nickname/generate", requestData, updateNickname)

})
