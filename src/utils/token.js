const KEY = 'zhifou-token'
const setToken= (token) =>{
    //把后端返回的token保存到浏览器的localStorage里面，这样页面刷新后token也不会丢失
    loclaStorage.setItem(KEY,token)
}
const getToken = () =>{
    //从浏览器的localStorage1读取KEY对应的token值
    return localStorage.getItem(KEY) || ''
}
const cklearToken = () =>{
    //从localStorage里面删除这个key,通常在用户退出登录的时候，清除token
    localStorage.rempoveItem(KEY)
}
export { setToken, getToken, clearToken }