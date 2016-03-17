class Page extends React.Component {

    defaultPath = 'list';

    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.children) {
            this.context.router.replace(nextProps.location.pathname + '/' + this.defaultPath);
        }
    }

    render() {
        return this.props.children;
    }
}

export default Page;