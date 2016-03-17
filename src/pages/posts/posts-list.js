import { Table,Button,Icon,Popconfirm} from 'antd';

const ButtonGroup = Button.Group;


class PostsList extends React.Component {

    state = {
        loading: false,
        pagination: {
            pageSize: 20
        }
    }

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
                    <Popconfirm placement="top" title={text} record={record} target={this} onConfirm={this.deleteData}>
                        <Button type="primary">
                            <Icon type="delete"/>
                        </Button>
                    </Popconfirm>
                </ButtonGroup>)
            }
        }
    ];

    deleteData() {
        console.log(this.props.target.getData());
    }

    getData(params = {}) {
        this.setState({
            loading: true
        });
        $.ajax({
                url: 'http://api.wallstcn.com/v2/policies/index',
                dataType: 'jsonp',
                data: params
            })
            .success((data)=> {
                this.setState({
                    loading: false,
                    data: data.results,
                    pagination: {
                        total: data.paginator.total
                    }
                });
            });

    };


    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;

        pager.current = pagination.current;

        this.setState({
            pagination: pager
        });
        const params = {
            limit: pagination.pageSize,
            page: pagination.current
        };

        if (sorter.field) {
            params.order = (sorter.order === 'ascend' ? '' : '-') + sorter.field;
        }

        for (let key in filters) {
            if (filters.hasOwnProperty(key)) {
                params[key] = filters[key];
            }
        }
        this.getData(params);
    }

    componentDidMount() {

        this.getData({page: this.state.pagination.pageSize});
    }

    render() {

        return (
            <Table columns={this.columns}
                   dataSource={this.state.data}
                   loading={this.state.loading}
                   pagination={this.state.pagination}
                   onChange={this.handleTableChange.bind(this)}
                   rowKey={record => record.id}
                   bordered

            />
        );
    }
}

export default PostsList;
