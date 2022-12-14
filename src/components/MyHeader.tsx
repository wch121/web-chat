import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu, message } from 'antd';
// const logo = require("../assets/images/logo.png")
const defaultAvatar = require("../assets/images/defaultAvatar.jpg")


export default function MyHeader() {
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [username, setUsername] = useState("匿名用户");
    const navigate = useNavigate()

    //componentDidMount
    useEffect(() => {
        if ("avatar"!==null) {
            let avatar1 = process.env.SERVER_PORT+ '/' + localStorage.getItem("avatar");
            setAvatar(avatar1)
        } else {
            let avatar1 = defaultAvatar;
            setAvatar(avatar1)
        }
        let username1 = localStorage.getItem("username") || "匿名用户";
        setUsername(username1)
    }, [])

    //点击修改资料
    const goMeans = () => {
        let token = localStorage.getItem("cms-token")
        if (token) {
            navigate('/means')
        } else {
            //给出提示，并跳转到登录页
            message.warning("登录失败，请重新登录", 1.5);
            setTimeout(() => {
                navigate('/login')
            }, 1500)
        }
    }

    //退出登录
    const logout = () => {
        localStorage.removeItem("cms-token");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        //给出提示，并跳转到登录页
        message.success("即将跳转登录页", 1.5);
        setTimeout(() => {
            navigate('/login')
        }, 1500)
    }

    const menu = (
        <Menu>
            <Menu.Item key={1} onClick={goMeans}>修改资料</Menu.Item>
            <Menu.Divider />
            <Menu.Item key={2} onClick={logout}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <header>
            {/* <img src={logo}  alt="" /> */}
            <div className="right">
                <Dropdown overlay={menu}>
                <a className="ant-dropdow-link" href="!#" onClick={(e) => e.preventDefault()}>
                    <img src={avatar} className="avatar" alt="" />
                    <span >{username}</span>
                    <DownOutlined />
                </a>
            </Dropdown>
            </div>
            
        </header>
    )
}
