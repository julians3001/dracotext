const fs = require('fs');

const files = fs.readdirSync('build').filter(f => f.indexOf('.txt') > 0);
for (const file of files) {
    console.log('Parsing file ' + file);

    let lang = 'english';
    let values = [];

    let content = fs.readFileSync(`build/${file}`, 'utf8');
    let lines = content.split(/\s*\r?\n\s*/);
    for (let line of lines) {
        if (line.indexOf('string m_Name = ') >= 0) {
            line = line.substring(line.indexOf('string m_Name = ') + 'string m_Name = '.length + 1);
            line = line.substring(0, line.indexOf('"'));
            if (line !== 'messages') {
                lang = line.substring(line.indexOf('_') + 1);
            }
        } else if (line.indexOf('string m_Script = ') >= 0) {
            line = line.substring(line.indexOf('string m_Script = ') + 'string m_Script = '.length + 1);
            line = line.substring(0, line.lastIndexOf('}'));
            let resources = line.split('\\n');
            let match;
            for (let resource of resources) {
                if (match = resource.match(/\s*"(.+)"\: "(.+)"/)) {
                    values.push({
                        key: match[1],
                        value: match[2].replace(/'/g, '\\\''),
                    });
                }
            }
        }
    }

    if (!lang || values.length === 0) {
        console.error('Unable to parse ' + file);
    } else {
        let stream = fs.createWriteStream(`generated.${lang}.js`);
        stream.write(`module.exports = {\n`);
        for (let value of values) {
            stream.write(`    '${value.key}': '${value.value}',\n`);
        }
        stream.write('};\n');
        stream.end();
    }
}

console.log('Done.');