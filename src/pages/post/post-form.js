import { Form, Input ,Button,Spin } from 'antd';
import {createPost,resetPostForm} from '../../actions/post';
import {connect} from 'react-redux';
import Editor from '../../components/editor/editor';

const FormItem = Form.Item;

class PostForm extends React.Component {

    constructor(props){

        super(props);

        this.state = {content:'11'};

    }

    componentDidMount() {
        this.props.dispatch(resetPostForm());

        setTimeout(()=>{
            this.setState({content:'<p>hello world</p>'})
        },5000)
    }

    handleSubmit(e) {
        e.preventDefault();

        let content = this.refs.editor.getValue();
        this.setState({content:content});

        console.log(content);

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.props.dispatch(createPost(values));
        });
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    render() {

        const {form,loading,postForm} = this.props;
        const { getFieldProps} = form;

        const layout = {
            labelCol: {span: 3},
            wrapperCol: {span: 14},
        };

        const titleProps = getFieldProps('title', {
            validate: [{
                rules: [
                    {
                        required: true,
                        message: '请输入标题'
                    }
                ],
                trigger: 'onBlur'
            }]
        });

        return (
            <Spin spining={loading}>
                <Form horizontal form={form}>
                    <FormItem label="标题：" {...layout}>
                        <Input {...titleProps} />
                    </FormItem>
                    <Editor ref="editor" content={this.state.content} />

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>创建</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
                    </FormItem>
                </Form>

            </Spin>
        );
    }
}


export default connect((state) => state.post)(Form.create()(PostForm));

