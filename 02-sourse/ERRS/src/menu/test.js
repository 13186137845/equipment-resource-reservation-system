import { GetMenuList } from "@/api/news/list";
var data = [];
console.log("success1")
GetMenuList({}).then(res=>{
    console.log(res);
    data.push(res.MU_POWER)
})
console.log(data);
export default data
// export default {
//     mounted() {
//         GetMenuList({
//             name: ""
//         })
//             .then(res => {
//                 // 返回数据
//                 console.log(res);
//                 return res.MU_POWER;
//             })
//             .catch(err => {
//                 //console.log(err)
//                 // 异常情况
//             });
//     }
// };

// import {GetMenuList} from '@/api/news/list'
// var data;
// GetMenuList({
//     name:''
//   }).then(res => {
//       // 返回数据
//       console.log(1);
//       console.log(res.MU_POWER)
//       data=res;
//     })
//     .catch(err =>{
//       //console.log(err)
//       // 异常情况
//     })

// // var data=[ { "path": "/index", "TWO_MR_ID_PARAME": 1, "children": [ { "path": "/index", "icon": "home", "title": "主页" } ], "icon": "home", "MP_FATHER_ID_PARMER": 1, "title": "主页" }, { "TWO_MR_ID_PARAME": 1, "children": [ { "icon": "calendar-minus-o", "title": "设备预约" }, { "path": "/bookingSystem", "title": "设备预约" }, { "path": "/bookingInfo", "icon": "", "title": "预约信息" } ], "icon": "calendar-minus-o", "MP_FATHER_ID_PARMER": 2, "title": "设备预约" }, { "TWO_MR_ID_PARAME": 1, "children": [ { "icon": "calendar-minus-o", "title": "设备信息" } ], "icon": "calendar-minus-o", "MP_FATHER_ID_PARMER": 3, "title": "设备信息" } ] ;
// export {data};
