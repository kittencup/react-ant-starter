import { Table,Button,Icon,Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getPosts,setQuery,deletePost} from '../../actions/post';

const ButtonGroup = Button.Group;

class PostList extends React.Component {

    static propTypes = {
        actions: React.PropTypes.object
    };

    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            sorter: true,
            key: 'id'
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record)=> {

                text = '是否删除编号为' + record.id + '的内容!';

                return (<ButtonGroup>
                    <Button type="primary">
                        <Icon type="edit"/>
                    </Button>
                    <Popconfirm placement="top" title={text} record={record} {...this.props} onConfirm={this.deleteRow}>
                        <Button type="primary">
                            <Icon type="delete"/>
                        </Button>
                    </Popconfirm>
                </ButtonGroup>)
            }
        }
    ];

    deleteRow() {
        this.props.dispatch(deletePost(this.props.record.id));
    }


    handleTableChange(pagination, filters, sorter) {

        const query = {
            limit: pagination.pageSize,
            page: pagination.current
        };

        if (sorter.field) {
            query.order = (sorter.order === 'ascend' ? '' : '-') + sorter.field;
        }

        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                query[key] = filters[key];
            }
        }

        this.props.dispatch(setQuery(query));
        this.props.dispatch(getPosts());

    }

    componentDidMount() {
        this.props.dispatch(getPosts());
    }

    render() {

        let {posts,loading} = this.props;

        return (
            <Table columns={this.columns}
                   dataSource={posts.results}
                   loading={loading}
                   pagination={posts.pagination}
                   onChange={this.handleTableChange.bind(this)}
                   rowKey={record => record.id}
                   bordered

            />
        );
    }
}

export default connect((state) => state.post)(PostList);
