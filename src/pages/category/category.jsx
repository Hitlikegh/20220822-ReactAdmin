import { React, useEffect, useState, useRef } from 'react';
import { Table, Button, message, Card, Modal } from 'antd';
import { reqAddCategorys, reqCategorys, reqUpdateCategorys } from '../../api';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import AddForm from './add-form';
import UpdateForm from './update-form'


const Category = () => {

    const getFormValue = useRef();
    const upDateFormValue = useRef();

    const defaultState = {
        loading: false,
        parentId: '0', // 
        parentName: '', // 分类名
        categorys: [],//分类列表
        subCategorys: [], // 子分类列表
        showModal: 0, //0表示都不显示;1表示添加;2表示修改
        category: '', // 被选中的类名
        dataSource: []
    }

    const [states, setStates] = useState(defaultState);
    // const [isModalVisible, setIsModalVisible] = useState(false);



    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };


    const getCategory = async (parentId) => {
        states.loading = true;
        const result = (await reqCategorys(parentId)).data;

        states.loading = false;
        if (result.status === 0) {
            states.parentId = parentId;
            // 取出分类数组， 可能是一级的也可能是二级的
            if (parentId === "0") {
                const categorys = result.data;
                setStates({ ...states, categorys: categorys, dataSource: categorys });


            } else {
                // console.log("111");
                const subCategorys = result.data;
                setStates({
                    ...states,
                    subCategorys: subCategorys,
                    dataSource: subCategorys,
                    showModal: '0'
                });


            }
        } else {

            message.error('获取列表失败');
        }

    };

    // 显示子分类
    const showSubCategorys = (category) => {
        // console.log("category", category);
        const _id = category._id;
        const name = category.name;
        setStates({
            ...states,
            parentId: _id,
            parentName: name
        });
        getCategory(_id);
        states.parentId = _id;
        states.parentName = name;
        // setTimeout(() => {
        //     getCategory(_id);
        //     console.log(states.subCategorys);

        // }, 2000)

    }

    // 回到父类
    const showCategorys = () => {
        setStates({
            ...states,
            parentId: '0',
            subCategorys: [],
            parentName: '',
        })
        states.parentId = '0';
        getCategory("0");

    };

    // 添加提示框
    const addCategroyModal = () => {
        // if (typeof (states.forms) !== "undefined") {
        //     states.forms.current.setFieldsValue({ parentId: states.categorys._id })
        // }
        setStates({ ...states, showModal: 1 });
    }
    // 更新提示框
    const updateCategroy = (category) => {
        const _category = category;
        // if (typeof (states.forms) !== "undefined") {
        //     states.forms.current.setFieldsValue({ categoryName: _category.name })
        // }
        setStates({ ...states, showModal: 2, category: _category })
    }
    // 退出提示框
    const cancelModal = () => {
        setStates({ ...states, showModal: 0 });
    }
    // 添加数据手动
    const handleAddOk = async () => {
        // console.log('添加', this.form.current.getFieldsValue())
        // 获取数据
        const getFieldsForm = getFormValue.current.formFields;
        // console.log("getFieldsForm", getFieldsForm);

        const { parentId, categoryName } = getFieldsForm.getFieldsValue();
        // 清除输入数据
        // console.log("parentId", parentId);
        getFieldsForm.resetFields()
        // 判断一级分类还是二级分类;这里不用判断后端会根据传递的parentId值分辨是父分类还是子分类
        // const result = (await reqAddCategory(parentId, categoryName)).data
        // 发送请求
        // console.log("parentId", parentId);
        await reqAddCategorys(parentId, categoryName);
        // 重新设置state

        getCategory(parentId);
        // console.log(states.subCategorys);
        // 取消对话框
        cancelModal();
    }
    // 手动更新数据
    const HandleUpdateOk = async () => {
        // 准备数据
        const gupFieldsForm = upDateFormValue.current.formFields;
        const categoryName = gupFieldsForm.getFieldValue('categoryName');
        // 清除输入数据
        gupFieldsForm.resetFields()
        // 发送修改分类请求
        // console.log("categoryName", categoryName);
        const result = (await reqUpdateCategorys({ categoryId: states.category._id, categoryName })).data
        if (result.status === 0) {
            // 重新设置state
            getCategory(states.parentId);
            cancelModal();
        }
        else {
            console.log(result.msg)
        }
    }


    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: 300,
            render: (category) => {
                return (
                    <span>
                        <Button type="link" onClick={() => { updateCategroy(category) }}>修改分类</Button>
                        {states.parentId === '0' ? <Button type='link' onClick={() => { showSubCategorys(category) }}>查看子分类</Button> : null}
                        {/* <Button type="link" onClick={() => { showSubCategorys(category) }}>查看子分类</Button> */}
                    </span>
                )
            },
        },
    ];





    useEffect(() => {
        return () => {

            getCategory(states.parentId);
        };
    }, []);



    const { categorys, loading, parentId, parentName, subCategorys, showModal, category, dataSource } = states;
    // console.log("subCategorys", subCategorys, "parentId", parentId, "dataSource", dataSource);
    const title = parentId === "0" ? '一级分类列表' : (
        <span>
            <Button type="link" onClick={showCategorys}>一级分类列表</Button>
            <ArrowRightOutlined />&nbsp;
            <span>{parentName}</span>
        </span>
    );
    // console.log("title", title);
    const extra = <Button type="primary" onClick={addCategroyModal}><PlusOutlined />添加</Button>;




    // const _category = _category || {};

    // getCategory();
    return (
        <>

            <Card
                title={title}
                extra={extra}>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={'_id'}
                    loading={loading}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }} />;

                <Modal
                    title="添加分类"
                    visible={showModal === 1}
                    onOk={handleAddOk}
                    onCancel={cancelModal}
                >
                    <AddForm
                        categorys={categorys}
                        parentId={parentId}
                        ref={getFormValue}
                    />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={showModal === 2}
                    onOk={HandleUpdateOk}
                    onCancel={cancelModal}
                >
                    <UpdateForm
                        ref={upDateFormValue}
                        category_name={category.name}
                    />
                </Modal>
            </Card>
        </>
    );
}



export default Category;