const mockBlogs = [
  {
    id: 1,
    title: "React 开发指南",
    type: "react",
    content: "React 是一个用于构建用户界面的 JavaScript 库，它由 Facebook 开发并开源。React 的核心思想是组件化开发，通过组件的方式构建用户界面。",
    createTime: "2024-01-15"
  },
  {
    id: 2,
    title: "Ant Design 使用教程",
    type: "react",
    content: "Ant Design 是阿里巴巴开源的一套企业级 UI 设计语言和 React 组件库，提供了丰富的组件和设计规范。",
    createTime: "2024-01-16"
  },
  {
    id: 3,
    title: "Vue.js 基础入门",
    type: "vue",
    content: "Vue.js 是一套用于构建用户界面的渐进式框架，与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。",
    createTime: "2024-01-17"
  },
  {
    id: 4,
    title: "Java 后端开发实践",
    type: "java",
    content: "Java 是一种广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性，广泛应用于企业级 Web 应用开发和移动应用开发。",
    createTime: "2024-01-18"
  },
  {
    id: 5,
    title: "JavaScript 高级特性",
    type: "js",
    content: "JavaScript 是一种具有函数优先的轻量级，解释型或即时编译型的编程语言，支持面向对象、命令式和声明式编程风格。",
    createTime: "2024-01-19"
  }
];
const getBlogList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredBlogs = [...mockBlogs];
      if (params && params.title) {
        filteredBlogs = filteredBlogs.filter(blog => blog.title.includes(params.title));
      }
      if (params && params.type) {
        filteredBlogs = filteredBlogs.filter(blog => blog.type === params.type);
      }
      //分页
      const current = params && params.current ? params.current : 1;
      const size = params && params.size ? params.size : 10;
      const start = (current - 1) * size;
      const end = start + size;
      const records = filteredBlogs.slice(start, end);
      resolve({
        data: {
          code: 200,
          message: "获取成功",
          data: {
            total: filteredBlogs.length,
            records: records
          }
        }
      })
    }, 30);
  })
};

const saveBlog = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (data.id) {
        const index = mockBlogs.findIndex(blog => blog.id === data.id);
        if (index !== -1) {
          mockBlogs[index] = {
            ...mockBlogs[index],
            ...data,
            createTime: new Date().toISOString().split('T')[0]
          };
        }
      } else {
        const newBlog = {
          ...data,
          id: mockBlogs.length + 1,
          createTime: new Date().toISOString().split('T')[0]
        };
        mockBlogs.push(newBlog);
      }
      resolve({
        data: {
          code: 200,
          message: "保存成功",
          data: null
        }
      });
    }, 30)
  });
}
const delBlog = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockBlogs.findIndex(blog => blog.id === parseInt(id));
      if (index !== -1) {
        mockBlogs.splice(index, 1);
      }
      resolve({
        data: {
          code: 200,
          message: "删除成功",
          data: null
        }
      });
    }, 30)
  });
}
const getBlogInfo = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const blog = mockBlogs.find(blog => blog.id === parseInt(id));
      resolve({
        data: {
          code: 200,
          message: " 获取成功",
          data: blog || null
        }
      });
    }, 30);
  });
};

export default {
  getBlogList,
  saveBlog,
  delBlog,
  getBlogInfo
}