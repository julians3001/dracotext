let loaded = {};

class Strings {
    constructor(language = 'english') {
        this.strings = loaded[language];
    }
    get(key) {
        return this.strings[key];
    }

    getCreature(key) {
        return this.strings['creature.' + key];
    }

    getitem(key) {
        return this.strings['key.item.' + key];
    }
}

module.exports = function load(language = 'english') {
    if (!loaded[language]) {
        loaded[language] = require(`./generated.${language}`);
    }
    return new Strings(language);
}
