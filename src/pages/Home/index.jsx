import React, { useState, useEffect } from "react";
import useLoginStore from "../../store/useLoginStore.js";
import favicon from "../../assets/images/title.jpg";
import "./index.css";
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnFoldOutlined,
    UserOutlined,
    ReadOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Space, Image } from "antd";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
const { Header, Sider, Content, Footer } = Layout;
const Home = () => {
    useEffect(() => {
        const userInfo = localStorage.getItem("zhifou-user");
        if (!userInfo) {
            navigate("/login");
        }
    }, []);
    const navigate = useNavigate();
    const { userLogout } = useLoginStore();
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState(
        JSON.parse(localStorage.getItem("zhifou-user"))
    );
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items = [
        {
            label: "退出",
            key: "1",
        },
    ];
    const menuItems = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to="/">首页</Link>,
        },
        {
            key: "/user",
            icon: <UserOutlined />,
            label: <Link to="/user">用户管理</Link>
        },
        {
            key: "/blog",
            icon: <ReadOutlined />,
            label: <Link to="/blog">博客管理</Link>,
        },
    ];

    const onClick = ({ key }) => {
        userLogout();
        navigate("/login");
    };
    return (
        <>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div style={{ textAlign: "center", marginTop: "5px" }}>
                        {
                            collapsed ? (<Image width={40} src={favicon} />) :
                                (<h3 style={{ color: "white", textAlign: "center" }}>
                                    在线博客论坛
                                </h3>)
                        }

                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={pathname}
                        items={menuItems} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }}>
                    </Header>
                    <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG }}>
                        <Outlet></Outlet>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        知否技术 ©{new Date().getFullYear()} Created by 知否技术
                    </Footer>
                </Layout>
            </Layout >

        </>
    );
};
export default Home;