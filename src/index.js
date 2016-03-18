import Navigation from './components/navigation/navigation';
import Main from './components/main/main';
import Dashboard  from './pages/dashboard/dashboard';
import Page from './components/page/page';
import Async from './async';
import {Provider} from 'react-redux';
import { Router, Route ,hashHistory,IndexRoute,Redirect} from 'react-router';
import configureStore from './utils/configure-store';
import post from './reducers/post';

let store = configureStore({});

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navigation routes={this.props.children.props}/>
                <Main children={this.props.children}/>
            </div>
        )
    }
}

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route name="layout" breadcrumbName="首页" path="/" component={Layout}>
                <Route name="dashboard" breadcrumbName="仪表盘" path="dashboard" component={Dashboard}/>
                <Route name="post" icon="mail" breadcrumbName="文章" path="post"
                       getComponents={Async.getComponent('./components/page/page.js')}>
                    <Route name="post-list" breadcrumbName="文章列表" path="list"
                           getComponents={Async.getComponent('./pages/post/post-list.js')}/>
                    <Route name="post-create" breadcrumbName="添加文章" path="create"
                           getComponents={Async.getComponent('./pages/post/post-create.js')}/>
                </Route>
                <IndexRoute component={Dashboard}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));

