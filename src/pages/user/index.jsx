import { Button, Form, Input, message, Modal, Popover, Radio, Table, Select, Space, ConfigProvider, Watermark } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useState } from "react";
import userApi from "../../api/UserApi";
const Blog = () => {
    const { Column } = Table;
    const [params, setParams] = useState({
        current: 1,
        size: 10,
        name: "",
        code: "",
    });
    const [blogList, setBlogList] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        getBlogList();
    }, [params]);
    const getBlogList = async () => {
        const { data } = await userApi.getUserList(params);
        setTotal(data.data.total);
        setBlogList(data.data.records);
    };
    const handlePaginationChange = (newPageNum, newPageSize) => {
        setParams({
            ...params,
            current: newPageNum,
            size: newPageSize,
            name: "",
            code: ""
        });
    };
    const showTotal = (total) => {
        return `共 ${total} 条`;
    };
    return (
        // {操作栏}
        <div>
            <Space>
                <Input.Search
                    value={params.name}
                    onChange={(e) => setParams({ ...params, name: e.target.value })}
                    style={{ width: "200px" }}
                    allowClear
                    placeholder="请输入名称"
                    enterButton />
            </Space>
            <ConfigProvider local={zhCN}>
                <Table
                    rowKey={(record) => record.id}
                    bordered={true}
                    pagination={{
                        current: params.current,
                        pageSize: params.size,
                        total: total,
                        showSizeChange: true,
                        showQuickJumper: true,
                        showTotal: showTotal,
                        onChange: handlePaginationChange
                    }}
                    dataSource={blogList}
                    scroll={{ y: 540 }}>

                    <Column title="编号" dataIndex="code" key="code" />
                    <Column title="账号" dataIndex="username" key="username" />
                    <Column title="姓名" dataIndex="name" key="name" />
                </Table>
            </ConfigProvider>
        </div>
    );
};
export default Blog;