import axios from "axios";

function delay(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        },1000)
    })
}

export async function login(loginInfo){
    await delay();
    // post http://study.yuanjin.tech/api/user/login
    let resp = await axios.post('/api/user/login',loginInfo);

    let token = resp.headers.authorization;  // 拿到服务器令牌
    if(token){
        // 把令牌保存下来
        localStorage.setItem("token",token);
    }
    return resp.data;
}
// 使用保存的令牌从服务器换取登陆信息 
export async function whoAmI(){
    await delay();
    // post http://study.yuanjin.tech/api/user/whoami
    // authorization: bearer tokenxxxxx
    let token = localStorage.getItem("token"); 
    if(!token){
        return null;
    }
    let resp = await axios.get("/api/user/whoami",{
        headers: {
            authorization: `bearer ${token}`
        }
    });
    // console.log(resp);
    return resp.data.data;
}

// 注销
export function loginOut(){
    localStorage.removeItem('token');
}

// 注册
export async function reg(userInfo){
    // post http://study.yuanjin.tech/api/user/reg
    let resp = await axios.post("/api/user/reg",userInfo);
    return resp.data; 
}