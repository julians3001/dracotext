const strings = require('../index').load();

console.log('App Name = ' + strings.get('key.system.application.name'));
console.log('Creature MONSTER_WATER_14 = ' + strings.getCreature('MONSTER_WATER_14'));
