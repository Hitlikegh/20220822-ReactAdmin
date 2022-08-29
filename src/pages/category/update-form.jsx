import React, { useImperativeHandle, forwardRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Input, Select } from 'antd'
const { Option } = Select

const UpdateForm = (props, ref) => {

    // console.log(props);
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        formFields: form,
    }));

    const { category_name } = props;
    return (
        <>
            <Form
                form={form}
                initialValues={{ categoryName: category_name }}
            >
                <Form.Item
                    name='categoryName'
                    rules={[
                        {
                            required: true,
                            message: '分类名必须输入',
                        },
                    ]}>
                    <Input
                        placeholder="请输入分类名" />
                </Form.Item>
            </Form>
        </>
    )


};

const WrappedForm = forwardRef(UpdateForm);
export default WrappedForm;



