// This code mostly came from chancejs's code

export function generateName(options) {
    // Borrowed from ChanceJS library (http://chancejs.com)
    options = options || {};
    if (options.syllables && options.length) {
        console.error("Chance: Cannot specify both syllables AND length.");
        return 'CheckConsoleForError';
    }

    let syllables = options.syllables || randomInt(1, 3),
        text = '';

    if (options.length) {
        // Either bound word by length
        do {
            text += getSyllable();
        } while (text.length < options.length);
        text = text.substring(0, options.length);
    } else {
        // Or by number of syllables
        for (let i = 0; i < syllables; i++) {
            text += getSyllable();
        }
    }

    // if (options.capitalize) {
    text = capitalize(text);
    // }

    return text;
}

export function getSyllable(options) {
    options = options || {};
    let length = options.length || randomInt(2, 3),
        consonants = 'bcdfghjklmnprstvwz', // consonants except hard to speak ones
        vowels = 'aeiou', // vowels
        all = consonants + vowels, // all
        text = '',
        chr;

    // I'm sure there's a more elegant way to do this, but this works
    // decently well.
    for (let i = 0; i < length; i++) {
        if (i === 0) {
            // First character can be anything
            chr = getCharacter(all);
        } else if (consonants.indexOf(chr) === -1) {
            // Last character was a vowel, now we want a consonant
            chr = getCharacter(consonants);
        } else {
            // Last character was a consonant, now we want a vowel
            chr = getCharacter(vowels);
        }

        text += chr;
    }

    if (options.capitalize) {
        text = capitalize(text);
    }

    return text;
}

export function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
}

export function getCharacter(chars) {
    return chars.charAt(randomInt(0, chars.length - 1));
}