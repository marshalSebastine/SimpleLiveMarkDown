const MdParser = require('./utils/mdparser');

const socketCallback = (socket) => {

    console.log('a client connected', socket.id);


    socket.on('parse_markdown', (md) => {
        console.log("markdown valu receved: " + md)
        socket.emit('parsed_html', MdParser.parseToHtml(md))
    })

    /* Implemented to efficiently receive markdown file content from user
    instead of receing redundant data on each keystroke of texteditor in frontend.
    */
   //currently not used.
    socket.on('parse_markdown_per_char',async (md) => {
        try {
            await MdParser.writeToMDFile(socket.id, md);
            let html = await MdParser.parseMDFile(socket.id);
            socket.emit('parsed_html', html);
        } catch (er) {
            console.error("error while processing md content", er);
        }
    })

    socket.conn.on('close', (reason) => {
        console.log('client ' + socket.id + 'closed with reason ' + reason);
    })


    socket.conn.on("error", (err) => {

        console.error('error on socket connection for' + socket.id);
        if (err && err.message === "unauthorized event") {
          socket.disconnect();
        }
      });

};

module.exports = socketCallback;