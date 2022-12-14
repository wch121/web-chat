import { Modal, Form, Input } from 'antd';
import React from 'react';

interface Iprops {
    showModal: boolean;
    setShowModal: (bool: boolean) => void;
    title: string;
    subTitle: string;
    submitAticleEdit: (res: { title: string; subTitle: string; }) => void;
}

const MyModal = (props: Iprops) => {
    const [form] = Form.useForm();
    //点击确认按钮
    const handleOk = () => {
        // props.setShowModal(false)
        //获取title和subTitle
        form.validateFields().then(res => {
            props.submitAticleEdit(res)
            //通知父级修改文章
        }).catch(err => {
            console.log('错误', err);
        })
    };

    //点击取消按钮
    const handleCancel = () => {
        props.setShowModal(false)
    };

    return (
        <Modal title="填写文章标题" visible={props.showModal} onOk={handleOk} onCancel={handleCancel} okText='提交' cancelText='取消' >
            <Form
                form={form}
                name="basic"
                initialValues={{ title: props.title, subTitle: props.subTitle }}
                autoComplete="off"
            >
                <Form.Item
                    label="标题"
                    name="title"
                    rules={[{ required: true, message: '请输入标题!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="副标题"
                    name="subTitle"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MyModal;