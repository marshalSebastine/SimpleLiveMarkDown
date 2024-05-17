const markdownit = require('markdown-it');
const { appendFile, readFile } = require('fs');
const path = require('path');

class MdParser {

    constructor() {
        this.parser = markdownit()
    }

    /* wrote this function to write md file character by character to bypass redundant markdown
    sending on each socket parse_md event. Need to implement diff checking algorithm
    of user input on front end to use this approach. */
    async writeToMDFile(name, text) {

        const filePath = path.resolve(__dirname, `../markdowns/${name}.md`);
        return new Promise((res, rej) => {
            appendFile(filePath, text, 'utf8', (err) => {
                if (err) rej(err);
                res(filePath);
            });
        })
    }

    /* Wrote this function to parse the markdown file of the user asynchronously,
    can be used if diff checking of input in frontend is implemented */
    async parseMDFile(name) {

        return new Promise((res, rej) => {
            const filePath = path.resolve(__dirname, `../markdowns/${name}.md`);
            readFile(filePath, 'utf8', (er, data) => {
                if (er) rej(er);
                res(this.parser.render(data));
            });
        })
    }

    parseToHtml(mdtext) {
        return this.parser.render(mdtext)
    }

}

module.exports = new MdParser()