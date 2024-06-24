import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user";
import {showFailToast} from "vant";


export const getCurrentUser = async () =>{
    //读缓存，在修改信息时，不会更新
    // const currentUser = getCurrentUserState();
    // if (currentUser){
    //     return currentUser;
    // }

    //不存在，则从远程获取
    const res =  await myAxios.get('/user/current');
    if (res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    showFailToast("获取用户信息失败")
    return null;

}