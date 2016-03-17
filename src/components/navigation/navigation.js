import { Menu, Icon } from 'antd';
import {Link,hashHistory} from 'react-router';
import './navigation.styl';

const SubMenu = Menu.SubMenu;

class Navigation extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    state = {
        current: [],
        openKeys: []
    };

    componentDidMount() {
        this.context.router.listen(this.locationHasChanged.bind(this));
    }

    locationHasChanged(toRoute) {
        let current = toRoute.pathname;
        let key = current.split('/')[1];
        let openKey = key ? ('/' + key) : '';

        this.setState({
            current: [current],
            openKeys: [openKey]
        });

    }

    handleClick = (e)=> {
        this.setState({
            current: [e.key]
        });
    };

    onOpen = (e) => {
        this.setState({
            openKeys: e.openKeys
        });
    };

    onClose = (e) => {
        this.onOpen(e);
    };

    formatPath(path) {
        return '/' + path;
    }

    render() {

        let routes = this.props.routes.routes[0].childRoutes;
        let menus = [];

        routes.forEach((route)=> {

            let path = this.formatPath(route.path);

            if (route.childRoutes) {

                menus.push(
                    <SubMenu key={path} title={<span><Icon type={route.icon} /><span>{route.breadcrumbName}</span></span>}>
                        {route.childRoutes.map((childRoute)=> {
                            let childPath = this.formatPath(childRoute.path);
                            return <Menu.Item key={path + childPath}><Link
                                to={{pathname:path + childPath}}>{childRoute.breadcrumbName}</Link></Menu.Item>
                        })}
                    </SubMenu>
                );

            } else {
                menus.push(
                    <Menu.Item key={path}>
                        <Link to={{pathname:path}}>{route.breadcrumbName}</Link>
                    </Menu.Item>
                );
            }

        });


        return (
            <aside className="navigation">
                <Menu onClick={this.handleClick}
                      openKeys={this.state.openKeys}
                      onOpen={this.onOpen}
                      onClose={this.onClose}
                      selectedKeys={this.state.current}
                      mode="inline">

                    {menus}

                </Menu>
            </aside>
        );
    }
}

export default Navigation;