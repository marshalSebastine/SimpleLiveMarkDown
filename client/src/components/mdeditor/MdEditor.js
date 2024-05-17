import './MdEditor.css';
import { useState } from 'react';
import {socket} from "../../index"


const MdEditor = () => {

    const [textareaValue, setTextareaValue] = useState('');
    
    return(
        <textarea autoComplete="off"
                  value={textareaValue}
                  autoFocus = {false}
                  autoCorrect="off" spellCheck={false}
                  autoCapitalize="off" className='textareashape'
                  onChange={(e) => {
                    setTextareaValue(e.target.value)
                    socket.emit('parse_markdown', e.target.value);
                  }}
                  >

        </textarea>
    )
}

export default MdEditor;