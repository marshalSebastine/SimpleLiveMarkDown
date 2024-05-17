import './App.css';
import Editor from '../editor/Editor';

function App() {

    return (
        <div className='outermostwrapper'>
            <div className='projectnamewrapper'>
                <span>SimpleMarkDownEdtr.</span>
            </div>
            <Editor />
        </div>

    )

}

export default App;