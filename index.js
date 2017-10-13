var express = require('express');
var app = express();
var path = require('path')

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

	}, 
	villain: {
		firstInitial: ['The Evil', 'The Mad', 'The Big', 'The Dangerous', 'Captain', 'The Ghostly', 'Professor', 'Doctor', 'Phantom', 'The Brutal', 'The Unstoppable', 'The Vile', 'The Dark', 'The Crazy', 'The Iron', 'The Poison', 'The Brutal', 'The Bloody', 'The Dark', 'The Dangerous', 'The Rancid', 'The Invisible', 'The Black', 'The Atomic', 'The Mega', 'The Grand'],
		lastInitial:  ['Shadow', 'Knight', 'Tarantula', 'Skull', 'Mastermind', 'Wizard', 'Ninja', 'Devil', 'Freak', 'Beast', 'Criminal', 'Master', 'Lord', 'Child', 'Corpse', 'Slayer', 'Spider', 'Creature', 'Werewolf', 'Monster', 'Vampire', 'Mutant', 'Robot', 'Claw', 'MAchine', 'Clown']
	}	
};

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

app.use(express.static('static'));

app.get('/', function(req, res) {
	// res.send('Test the burner');
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/nickname/generate', function(req, res) {
	// res.send('Test the burner');
	console.log(req.query);
	var queryParams = req.query,
		generatedNickname = {},
		nicknameChoice = queryParams.nicknameChoice;

	if (nicknameChoice == 'cat') {
		generatedNickname.nickname = nickNameHandlers[nicknameChoice](queryParams);
	} else {
		generatedNickname.nickname = nickNameHandlers['simple'](queryParams);
	}

	res.send(generatedNickname);
});


app.listen(3000, function() {
	console.log('Burner running at port 3000!');
}, '0.0.0.0');
