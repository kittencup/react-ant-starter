import Simditor from 'simditor';
import 'simditor/styles/simditor.css'

class Editor extends React.Component {

    static defaultProps = {
        content: ''
    }

    render() {
        return (
            <textarea ref='textarea'></textarea>
        )
    }

    componentDidMount(){
        this.editor = new Simditor({
            textarea: $(ReactDOM.findDOMNode(this.refs.textarea))
        });

    }

    componentWillReceiveProps (nextProps){
        this.setValue(nextProps.content);
    }

    getValue () {
        return this.editor.getValue();
    }
    setValue (content) {
        this.editor.setValue(content);
    }

    constructor(props) {
        super(props);
    }
}

export default Editor;