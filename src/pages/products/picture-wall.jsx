import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import React, { useState, forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { reqDeleteImg } from '../../api';
import { LoadingOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const PictureWalls = (props, parentRef) => {
    // console.log("props", props);


    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };



    const handleChange = async ({ fileList, file }) => {

        if (file.status === 'done') {
            const result = file.response  // {status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if (result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                // console.log("newFileList上面", newFileList)
                // console.log("name", name);
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
                // console.log("After", file);
            } else {
                message.error('上传图片失败')
            }
        } else if (file.status === 'removed') { // 删除图片
            // console.log("file.name", file.response.data.name);
            const result = (await reqDeleteImg(file.response.data.name)).data
            if (result.status === 0) {
                message.success('删除图片成功!')
            } else {
                message.error('删除图片失败!')
            }
        }

        // console.log('handleChange()', file.status, file, fileList);
        // console.log("newFileList下面", fileList)
        setFileList(fileList);
        // console.log("pwInputRef", pwInputRef)
    };


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    useEffect(() => {
        // console.log((props.imgs));
        if (props.imgs) {
            const imgs = props.imgs;
            // console.log("after", props.imgs);
            const newFileList = imgs.map(img => {
                return {
                    uid: img,
                    name: img,
                    status: 'done',
                    url: "/upload/" + img
                }
            });
            // console.log("newFileList厦门", newFileList);


            setFileList(newFileList);
        } else {
            setFileList([]);

        }
    }, [])




    return (
        <>
            <Upload
                action="/manage/img/upload" // 上传图片接口
                accept='images/*' // 只接收图片格式
                name='image' // 请求的参数名
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                ref={parentRef}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>

            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    )
};

let ForwardChild = forwardRef(PictureWalls);
export default ForwardChild;
