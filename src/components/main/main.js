import {Breadcrumb} from 'antd'
import './main.styl';

class Main extends React.Component {

    render() {
        return (
            <section className="main">
                <Breadcrumb {...this.props.children.props} />
                <div>
                    {this.props.children}
                </div>
            </section>
        );
    }
}

export default Main;