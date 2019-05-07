const routes = [
  {
    path: "/",
    name: "index",
    meta: { title: "首页" },
    component: () => import("@/components/index.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("@/components/LoginAndRegister/Login.vue")
  }
];
export default routes;
