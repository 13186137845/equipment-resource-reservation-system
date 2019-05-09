import request from "@/plugin/axios";

export function GetMenuList(data) {
    return request({
        url: "/test",
        // url:'http://192.168.0.188:8088/buxiangqumingzile/test',
        method: "post",
        data
    });
}
