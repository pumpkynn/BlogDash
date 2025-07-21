import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Radio,
  Table,
  Select,
  Space,
  ConfigProvider,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useState } from "react";
import moment from "moment";
import blogApi from "../../api/BlogApi";
const Blog = () => {
  const { TextArea } = Input;
  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      width: 100,
      render: (_, record, index) => (index + 1).toString(),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "类别",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "内容",
      dataIndex: "content",
      key: "content",
      width: 400,
    },
    {
      title: "创建时间",
      key: "createTime",
      render: (record) => moment(record.createTime).format("YYYY-MM-DD"),
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <span>
          <Button
            style={{
              backgroundColor: "orange",
              color: "white",
              marginRight: "5px",
            }}
            onClick={() => handleOpenUpdateModal(row)}
          >
            编辑
          </Button>
          <Popover
            title="您确定要删除该博客吗？"
            content={
              <Button
                onClick={() => handleDeleteBlog(row.id)}
                type="primary"
                danger
              >
                确定
              </Button>
            }
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popover>
        </span>
      ),
    },
  ];
  //查询参数
  const [params, setParams] = useState({
    current: 1,
    size: 10,
    type: "",
    title: "",
  })
  const [blogList, setBlogList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getBlogList();
  }, [params]);
  const getBlogList = async () => {
    const res = await blogApi.getBlogList(params);
    const { total = 0, records = [] } = res.data.data || {};
    setTotal(total);
    setBlogList(records);
  };

  const handlePaginationChange = (newPageNum, newPageSize) => {
    setParams({
      ...params,
      current: newPageNum,
      size: newPageSize,
    });
  };
  const [form] = Form.useForm();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenUpdateModal = (row) => {
    form.setFieldsValue(row);
    setIsUpdate(true);
    setIsModalOpen(true);
  };
  const handleDeleteBlog = async (id) => {
    await blogApi.delBlog(id);
    message.success("删除成功");
    getBlogList();
  };
  const handleOpenAddModal = () => {
    form.resetFields();
    setIsUpdate(false);
    setIsModalOpen(true);
  };
  const showTotal = (total) => {
    return `共 ${total} 条`;
  };
  const handleAddUpdateBlog = async (blogForm) => {
    console.log('提交的博客数据:', blogForm);
    const res = await blogApi.saveBlog(blogForm);
    console.log('保存结果:', res);
    if (res.data.code == 200) {
      message.success(isUpdate ? "更新成功" : "添加成功");
      form.resetFields();
      setIsModalOpen(false);
      getBlogList();
    } else {
      message.error(res.data.message);
    }
  };
  return (
    <div>
      <Space style={{ marginBottom: "10px" }}>
        <label>选择类别
          <Select
            style={{ width: 120 }}
            placeholder="选择类别"
            allowClear
            onChange={(value) => setParams({ ...params, type: value })}
            options={[
              {
                value: "vue",
                label: "vue",
              },
              {
                value: "java",
                label: "java",
              },
              {
                value: "uniapp",
                label: "uniapp",
              },
              {
                value: "react",
                label: "react",
              },
              {
                value: "js",
                label: "js",
              },
            ]}
          />
        </label>
        <Input.Search
          value={params.title}
          onChange={(e) => setParams({ ...params, title: e.target.value })}
          style={{ width: "200px" }}
          allowClear
          placeholder="请输入标题"
          enterButton />
        <Button type="primary" onClick={handleOpenAddModal}>
          新增博客
        </Button>
      </Space>
      <ConfigProvider locale={zhCN}>
        <Table
          rowKey={(record) => record.id}
          bordered={true}
          pagination={{
            current: params.current,
            pageSize: params.size,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: showTotal,
            onChange: handlePaginationChange,
          }}
          columns={columns}
          dataSource={blogList}
          scroll={{ y: 540 }}>
        </Table>
      </ConfigProvider>
      <Modal
        title={isUpdate ? "编辑博客" : "新增博客"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}>
        <Form form={form}
          style={{ maxWidth: 400 }}
          onFinish={handleAddUpdateBlog}
          autoComplete="off">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            label="类别"
            name="type"
            rules={[{ required: true, message: "请选择类别" }]}
          >
            <Radio.Group>
              <Radio value={"java"}> java </Radio>
              <Radio value={"vue"}> vue </Radio>
              <Radio value={"react"}> react </Radio>
              <Radio value={"uniapp"}> uniapp </Radio>
              <Radio value={"js"}> js </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入内容" }]}
          >
            <TextArea
              placeholder="请输入内容"
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="submit" onClick={() => setIsModalOpen(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>

  );
};
export default Blog;