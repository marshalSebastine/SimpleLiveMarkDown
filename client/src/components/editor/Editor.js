import MdEditor from '../mdeditor/MdEditor';
import {socket} from '../../index';
import parse from 'html-react-parser';
import './Editor.css';
import { useEffect, useState } from 'react';

const Editor = () => {

    const [html, sethtml] = useState('');

    useEffect(() => {
        socket.on('parsed_html', (html) => {
            sethtml(html)
        })
    }, [])
    return(
        <div className='editorwrapper'>
            <div className='inputcontainer'>
                <div className='header'>
                    <span>Markdown Editor.</span>
                </div>
                <MdEditor/>
            </div>
            <div className='renderedhtmlcontainer'>
                <div className='header'>
                    <span>Live preview.</span>
                </div>
                <div className='renderhtml'>
                    {parse(html)}
                </div>
            </div>
        </div>
    )

}

export default Editor;