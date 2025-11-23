const routes = [
    { path: "/", component: Login },
    { path: "/Main", component: Main },
    { path: "/Tool1", component: Tool1 },
];

const router = new VueRouter({
    mode: "hash",
    routes
});

router.beforeEach((to, from, next) => {
    const user = localStorage.getItem("user");

    if (to.path === "/") {
        next();
        return;
    }

    if (!user) {
        next("/");
    } else {
        next();
    }
});
