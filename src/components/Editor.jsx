import { useEffect, useState } from 'react';
import { PageHeader, Button, message } from 'antd';
import E from 'wangeditor'
import { useLocation, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons';
import MyModal from './MyModal';
import moment from 'moment'
import { GetArticleByIdApi, EditArticleApi, AddArticleApi } from 'request/api'

let editor = null
const Editor = () => {
    const { id } = useParams()
    const location = useLocation()
    const [content, setContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalSubTitle, setModalSubTitle] = useState("");
    //modal显示隐藏控制
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        // 富文本编辑器实例化
        editor = new E("#myeditor")
        editor.config.onchange = (newHtml) => {
            setContent(newHtml);
        }
        // 创建
        editor.create()

        //获取地址栏id
        if (id) {
            //id存在，代表编辑文章
            GetArticleByIdApi({ id }).then(res => {
                if (res.errCode === 0) {
                    message.success(res.message)
                    //设置富文本编辑器的内容
                    // setContent(res.data.content)
                    //富文本编辑器的内置方法解决内容设置
                    editor.txt.html(res.data.content)
                    //设置模态框里的标题
                    setModalTitle(res.data.title);
                    //设置模态框里的副标题
                    setModalSubTitle(res.data.subTitle);
                } else {
                    message.error(res.message)
                }
            })
        } else {
            //id不存在，代表要添加文章
        }

        return () => {
            // 组件销毁时销毁编辑器
            editor.destroy()
        }
        // eslint-disable-next-line
    }, [])

    //模态框点击了提交，触发的ajax请求
    const submitAticleEdit = (values) => {
        //有id调用编辑的接口
        if (id) {
            EditArticleApi({
                /* 
                title:values.title,
                subTitle:values.subTitle, 
                content:content,
                id:id
                等于下一句代码
                */
                ...values,
                content,
                id
            }).then(res => {
                console.log(res)
                if (res.errCode === 0) {
                    message.success(res.message);
                    //关闭模态框
                    setShowModal(false);
                }
            })
        } else {
            //没有id调用添加的接口
            AddArticleApi({
                ...values,
                content,
            }
            ).then(res => {
                console.log(res)
                if (res.errCode === 0) {
                    message.success(res.message);
                    //关闭模态框
                    setShowModal(false);
                }
            })
        }
    }

    return (
        <div className="editor">
            <PageHeader
                style={{ padding: 0, marginBottom: '20px' }}
                /* 
                /edit/1  有id就有backicon---true
                /edit    没有id就没有backicon---false

                location.pathname==='/edit'?false:true
                */
                backIcon={location.pathname === '/edit' ? false : <ArrowLeftOutlined />}
                onBack={() => null}
                ghost={false}
                title="文章编辑"
                subTitle={`当前日期：${moment().format('YYYY-MM-DD')}`}
                extra={[
                    <Button key="3" type="primary" onClick={() => setShowModal(true)}>提交文章</Button>,
                ]}
            ></PageHeader>
            <div id="myeditor"></div>
            <MyModal showModal={showModal} setShowModal={setShowModal} title={modalTitle} subTitle={modalSubTitle} submitAticleEdit={submitAticleEdit} />
        </div>
    );
}

export default Editor;