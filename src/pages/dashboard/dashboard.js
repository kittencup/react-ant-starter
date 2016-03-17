import {Link} from 'react-router';

class Dashboard extends React.Component {
    render() {
        return (
            <Link to={{pathname:'posts',query:{}}}>strategy</Link>
        )
    }
}

export default Dashboard;