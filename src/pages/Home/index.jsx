import React, { useState, useEffect } from "react";
import useLoginStore from "../../store/useLoginStore.js";
import favicon from "../../assets/images/title.jpg";
import "./index.css";
// 图标
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
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
    const [collapsed, setCollapsed] = useState(false);
    const [userInfo, setUserInfo] = useState(
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

    // 菜单项配置
    const menuItems = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to="/">首页</Link>,
        },
        {
            key: "/user",
            icon: <UserOutlined />,
            label: <Link to="/user">用户管理</Link>,
        },
        {
            key: "/blog",
            icon: <ReadOutlined />,
            label: <Link to="/blog">博客管理</Link>,
        },
    ];

    // 退出
    const onClick = ({ key }) => {
        userLogout();
        navigate("/login");
    };
    return (
        <>
            <Layout style={{ height: "100%" }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div style={{ textAlign: "center", marginTop: "5px" }}>
                        {collapsed ? (
                            <Image width={40} src={favicon} />
                        ) : (
                            <h3 style={{ color: "white", textAlign: "center" }}>
                                知否在线博客论坛
                            </h3>
                        )}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={pathname}
                        selectedKeys={pathname}
                        items={menuItems}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="user-info">
                            <Dropdown menu={{ items, onClick }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {userInfo?.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                    <Footer
                        style={{
                            textAlign: "center",
                        }}
                    >
                        知否技术 ©{new Date().getFullYear()} Created by 知否技术
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};
export default Home;
