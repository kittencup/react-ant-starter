import Navigation from './components/navigation/navigation';
import Main from './components/main/main';
import Dashboard  from './pages/dashboard/dashboard';
import Page from './components/page/page';
import Async from './async';

import { Router, Route ,hashHistory,IndexRoute,Redirect} from 'react-router'


class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navigation routes={this.props.children.props} />
                <Main children={this.props.children}/>
            </div>
        )
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route name="layout" breadcrumbName="首页" path="/" component={Layout}>
            <Route name="dashboard" breadcrumbName="仪表盘" path="dashboard" component={Dashboard} />
            <Route name="posts" icon="mail" breadcrumbName="文章" path="posts" getComponents={Async.getComponent('./components/page/page.js')}>
                <Route name="posts-list" breadcrumbName="文章列表" path="list" getComponents={Async.getComponent('./pages/posts/posts-list.js')}/>
                <Route name="posts-create" breadcrumbName="添加文章" path="create" getComponents={Async.getComponent('./pages/posts/posts-form.js')} />
            </Route>
            <IndexRoute component={Dashboard}/>
        </Route>
    </Router>
), document.getElementById('root'));

