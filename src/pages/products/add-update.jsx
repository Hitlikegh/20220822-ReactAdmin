import React, { createRef, useRef, useEffect, useState, forwardRef } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom'
import { reqCategorys } from '../../api';
import { Button, Card, Form, Input, InputNumber, Cascader, message } from 'antd'
import { reqAddOrUpdateProduct, reqDeleteImg } from '../../api';
import PictureWalls from './picture-wall';
import RichTextEditor from './richTextEditor';


const AddUpdate = (props, ref) => {
    const { state } = useLocation();

    const navigate = useNavigate();

    const defaultStates = {
        options: []
    }
    const [states, setStates] = useState(defaultStates);

    const getCategorys = async (parentId) => {
        const result = (await reqCategorys(parentId)).data
        if (result.status === 0) {
            const categorys = result.data;

            if (parentId === '0') {
                initOptions(categorys);
                // console.log("1")
            } else {//二级分类的列表
                // console.log(categorys)
                return categorys
            }

        }
    }

    const addUpdateForm = useRef();
    const pwParentRef = useRef();//接收图片的ref
    const editor = useRef(); //富文本的ref

    const getImgs = (fileList) => {
        return fileList.map(file => file.name
        );
    };

    // 提交更新或者修改
    const submit = async () => {
        let values
        try {
            values = await addUpdateForm.current.validateFields();
            // console.log("values", values);
            // 取出数据
            const { name, desc, price, categoryIds } = values;

            const { fileList } = pwParentRef.current;
            // console.log("fileList", fileList);

            const imgs = getImgs(fileList);
            // console.log("imgs", imgs)

            let pCategoryId, categoryId;
            if (categoryIds.length === 1) {
                pCategoryId = '0'
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }
            // console.log("pwParentRef上层", pwParentRef);

            // const imgs = pwParentRef.current.getImgs();
            const detail = editor.current.getDetail();
            const product = { name, desc, price, imgs, detail, pCategoryId, categoryId };

            // console.log("product", product);
            // 如果是更新, 需要添加_id
            if (isUpdate) {
                product._id = products._id
            }
            // 2. 调用接口请求函数去添加/更新
            const result = (await reqAddOrUpdateProduct(product)).data;
            // console.log("result", result);
            // 3. 根据结果提示
            if (result.status === 0) {
                message.success(`${isUpdate ? '更新' : '添加'}商品成功!`)
                navigate(-1)
            } else {
                message.error(`${isUpdate ? '更新' : '添加'}商品失败!`)
            }
        }
        catch ({ errorFields, values }) {
            // console.log(errorFields)
            if (errorFields) {
                if (errorFields.length > 0) {
                    errorFields.map(err => {
                        return message.error(err.errors)
                    })
                }

            }
        }
    }
    const { products } = state;
    // console.log("products", products);
    const { name, desc, price, pCategoryId, categoryId, imgs, detail } = products;
    const isUpdate = Object.keys(products).length > 0 ? true : false
    const formItemLayout = {
        labelCol: { span: 2 },  // 左侧label的宽度
        wrapperCol: { span: 20 }, // 右侧包裹的宽度
    }

    const initOptions = async (categorys) => {
        const options = categorys.map(category => {
            return (
                {
                    label: category.name,
                    value: category._id,
                    isLeaf: false
                }
            )
        })
        const { pCategoryId } = products
        if (isUpdate && pCategoryId !== '0') {
            // 二级分类列表
            const subCategorys = await getCategorys(pCategoryId)
            // console.log('subCategorys', subCategorys)
            // 生成当前一级分类下二级下拉列表options
            const childrenOptions = subCategorys.map(c => {
                return {
                    value: c._id,
                    label: c.name,
                    isLeaf: true
                }
            })
            // 找到当前商品的一级option对象
            const targetOption = options.find(option => { return option.value === pCategoryId })
            // 关联对应一级option！
            targetOption.children = childrenOptions
        }
        // 更新option状态
        setStates({ options })
        // console.log("states", states);
        // 如果是一个二级分类商品更新
    }
    // 用加载下一级列表的回调函数
    const loadData = async selectedOptions => {
        // console.log(selectedOptions)
        // 得到选择的option对象
        const targetOption = selectedOptions[0];
        // 显示loading
        targetOption.loading = true;

        // 根据选中的分类, 请求获取二级分类列表
        const subCategorys = await getCategorys(targetOption.value);
        // console.log("subCategorys", subCategorys)

        // 隐藏loading
        targetOption.loading = false
        // 二级分类数组有数据
        if (subCategorys && subCategorys.length > 0) {
            // 生成一个二级列表的options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true
            }))
            // 关联到当前option上
            targetOption.children = childOptions
        } else { // 当前选中的分类没有二级分类
            targetOption.isLeaf = true
        }
        // const state = props;
        // 更新options状态
        setStates({
            options: [...states.options],
        })
    }

    const categoryIds = []
    if (pCategoryId === '0') {
        categoryIds.push(categoryId)
    } else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
    }
    // console.log("categoryIds", categoryIds);
    // console.log("option", states.options);

    const title = (
        <span>
            <Button
                type='link'
                onClick={() => navigate(-1)}>
                <ArrowLeftOutlined style={{ marginRight: 5, fontSize: 20 }} />
            </Button>
            <span>{isUpdate ? '修改商品' : '添加商品'}</span>
        </span>
    )

    useEffect(() => {
        getCategorys('0');
    }, [])

    return (
        <>
            {/* {console.log("state.options", state.options)} */}
            <Card
                title={title}>
                <Form
                    {...formItemLayout}
                    ref={addUpdateForm}
                >
                    <Form.Item
                        label='商品名称'
                        name='name'
                        initialValue={name}
                        rules={[
                            {
                                required: true, message: '必须输入商品名称'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='商品描述'
                        name='desc'
                        initialValue={desc}
                        rules={[
                            {
                                required: true, message: '必须输入商品描述'
                            }
                        ]}
                    >
                        <Input.TextArea
                            placeholder='请输入商品描述'
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label='商品价格'
                        name='price'
                        initialValue={price}
                        rules={[
                            {
                                required: true, message: '必须输入商品价格'
                            }
                        ]}
                    >
                        <InputNumber addonAfter="元" />
                    </Form.Item>
                    <Form.Item
                        label='商品分类'
                        name='categoryIds'
                        initialValue={categoryIds}
                    >
                        <Cascader
                            options={states.options}
                            loadData={loadData}
                            placeholder='请指定商品分类'
                            rules={[
                                {
                                    required: true, message: '必须指定商品分类'
                                }
                            ]}
                        ></Cascader>
                    </Form.Item>
                    <Form.Item
                        label='商品图片'
                    >
                        <PictureWalls imgs={imgs} ref={pwParentRef} />
                    </Form.Item>
                    <Form.Item label="商品详情">
                        <RichTextEditor detail={detail} ref={editor} />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' onClick={submit}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* <div>addUpdate</div> */}

        </>
    );
}

const WrappedForm = forwardRef(AddUpdate);
export default WrappedForm;