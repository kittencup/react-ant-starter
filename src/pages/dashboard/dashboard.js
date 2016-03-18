import {Link} from 'react-router';

class Dashboard extends React.Component {
    render() {
        return (
            <Link to={{pathname:'post',query:{}}}>strategy</Link>
        )
    }
}

export default Dashboard;