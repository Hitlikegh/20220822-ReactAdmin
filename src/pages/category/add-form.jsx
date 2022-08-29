import React, { useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, Select } from 'antd'
const { Option } = Select

const AddForm = (props, ref) => {

    // console.log(props);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        formFields: form,
    }));

    const { categorys, parentId } = props;
    return (
        <>
            <Form
                form={form}
                initialValues={
                    { parentId }
                }>
                <Form.Item
                    name='parentId'
                    rules={[
                        {
                            required: true,
                            message: '分类名称必须输入'
                        }
                    ]
                    }
                >
                    <Select
                    >
                        <Option value="0">一级分类</Option>
                        {
                            categorys.map(category => {
                                return <Option key={category._id} value={category._id}>{category.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name='categoryName'>
                    <Input placeholder='请输入分类名' />
                </Form.Item>
            </Form>
            {/* <div>addupdate</div> */}
        </>
    )


};

const WrappedForm = forwardRef(AddForm);
export default WrappedForm;