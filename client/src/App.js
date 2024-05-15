import { useState, useEffect } from 'react';
import './App.css';
import { socket } from './index';
import parse from 'html-react-parser';

function App() {

  const [inputState, setInputState] = useState('');



  useEffect(() => {
    console.log('running use effect')
    socket.on('parsed_html', (html) => {
      console.log('parsed_html triggered', html)
      setInputState(html);
    });
  }, []);

  return (
    <>
      {inputState && parse(inputState)}
      <div className="App">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => { socket.emit('parse_markdown', '## This is a Header') }}> send text</button>
      </div>
    </>

  );
}

export default App;
