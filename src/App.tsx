import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu } from 'antd';
import SubMenu from "antd/lib/menu/SubMenu";
import { ReadOutlined, UserOutlined, EditOutlined, SelectOutlined } from '@ant-design/icons';
import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import MyHeader from "components/MyHeader";
import "App.less";
// import { Dispatch} from "react";
import { connect } from "react-redux";

let arr: number[] = [];
for (var i = 0; i < 80; i++) {
    arr.push(i)
}

const { Content, Sider } = Layout;

interface Iprops {
    key1: number;
    changeKeyFn: () => void;
}

function App(props: Iprops) {
    //定义侧边栏当前项的值
    const [asideKey, setAsideKey] = useState("0");
    const [bread, setBread] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    //监听路由的变化，从而修改侧边栏当前值
    useEffect(() => {
        if(location.pathname==='/'){
            //根路径重定向到/list
            navigate('/list')
        }
        switch (location.pathname) {
            case "/list":
                setAsideKey("1");
                setBread("查看文章列表")
                break;
            case "/edit":
                setAsideKey("2");
                setBread("文章编辑")
                break;
            case "/means":
                setAsideKey("3");
                setBread("修改资料")
                break;
            case "/namelist":
                setAsideKey("4-1");
                setBread("小编名单")
                break;
            default:
                setAsideKey("0");
                setBread("")
                break;
        }
        //只要路径中有、edit的字符串，就让文章编辑呈现当前项
        if (location.pathname.includes('/edit')) {
            setAsideKey("2");
            setBread("文章编辑")
        }
    }, [location.pathname])

    return (
        <Layout className="container">
            <MyHeader key={props.key1} />
            <Layout className="container_content">
                <Sider width={200} >
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[asideKey]}
                        defaultOpenKeys={['4']}
                        style={{ height: '200%', borderRight: 0 }}
                    >
                        <Menu.Item key="1">
                            <Link to={'/list'}><ReadOutlined />查看文章列表</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/edit'}><EditOutlined />文章编辑</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={'/means'}><ReadOutlined />修改资料</Link>
                        </Menu.Item>
                        <SubMenu
                            key="4"
                            icon={<UserOutlined />}
                            title="管理员"
                            style={{ display: localStorage.getItem('player') === 'vip' ? 'block' : 'none' }}
                        >
                            <Menu.Item key="4-1">
                                <Link to={'/namelist'}><SelectOutlined />小编名单</Link>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item><Link to={'/'}>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>{bread}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="mycontent">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout >
            <footer style={{
                textAlign: 'center',
                color: '#fff',
                height: '70px',
                lineHeight: '70px',
                background: '#001529'
            }}>Respect | Copyright © 2022 Author wch</footer>
        </Layout >
    );
};

//state的映射
const mapStateToProps = (state: { key: number }) => {
    return {
        key1: state.key
    }
}

//dispatch的映射
// const mapDispatchToProps = (dispatch: Dispatch<any>) => {
//     return {
//         changeKeyFn() {
//             dispatch({ type: "changeKey" })
//         }
//     }
// }

export default connect(mapStateToProps)(App)