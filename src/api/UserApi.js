const mockUsers = [
  {
    id: 1,
    code: "USER1",
    username: "zhifou",
    name: "知否",
    password: "123456",
    role: "admin"
  },
  {
    id: 2,
    code: "USER2",
    username: "libai",
    name: "李白",
    password: "123456",
    role: "editor"
  },
  {
    id: 3,
    code: "USER3",
    username: "houyi",
    name: "后羿",
    password: "123456",
    role: "author"
  },
  {
    id: 4,
    code: "USER4",
    username: "liyuanfang",
    name: "李元芳",
    password: "123456",
    role: "user"
  },
  {
    id: 5,
    code: "USER5",
    username: "harmony",
    name: "鸿蒙",
    password: "123456",
    role: "guest"
  }
];
const login = (data) => {
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(
          u => u.username === data.username && u.password === data.password
        );
        if (user) {
          resolve({
            data: {
              code: 200,
              message: "登录成功",
              data: {
                token: "mock-token-" + Date.now(),
                userInfo: {
                  id: user.id,
                  username: user.name,
                  name: user.name,
                  role: user.role
                }
              }
            }
          });
        } else {
          resolve({
            data: {
              code: 400,
              message: "用户名或密码错误",
              data: null
            }
          });
        }
      }, 500)
    });
}

const getUserList = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredUsers = [...mockUsers];
      if (params && params.name) {
        filteredUsers = filteredUsers.filter(user => user.name.includes(params.name));
      }
      const current = params && params.current ? params.current : 1;
      const size = params && params.size ? params.size : 10;
      const start = (current - 1) * size;
      const end = start + size;
      const records = filteredUsers.slice(start, end);
      resolve({
        data: {
          code: 200,
          message: "获取成功",
          data: {
            total: filteredUsers.length,
            records: records
          }
        }
      });
    }, 300);
  });
};
export default {
  login,
  getUserList
};





