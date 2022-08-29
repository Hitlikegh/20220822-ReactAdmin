import React, { useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Select } from 'antd'


const AddFormRole = (props, ref) => {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        formFields: form,
    }));


    return (
        <>
            <Form
                form={form}
                initialValues={
                    {}
                }>

                <Form.Item
                    name='roleName'
                    label='角色名称'>
                    <Input placeholder='请输入角色名称' />
                </Form.Item>
            </Form>
        </>
    );
}


const WrappedForm = forwardRef(AddFormRole);
export default WrappedForm;