const routes = [
    { path: "/", component: Login },
    { path: "/Main", component: Main },
    { path: "/Tool1", component: ToolOne },
    { path: "/Tool2", component: ToolTwo},
    { path: "/Tool3", component: ToolThree },
    { path: "/Tool4", component: ToolFour },
    { path: "/Tool5", component: ToolFive },
    { path: "/Tool6", component: ToolSix },
    { path: "/Tool7", component: ToolSeven },
    { path: "/Tool8", component: ToolEight },
    { path: "/Tool9", component: ToolNine },
    { path: "/Tool10", component: ToolTen },
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


// const routes = [
//     { path: "/", component: Login },
//     { path: "/Main", component: Main },
//     { path: "/Tool1", component: Tool1 },
//     { path: "/Tool2", component: Tool2 }, // <- if you have Tool2 component
//     { path: "/Tool3", component: Tool3 },
//     { path: "/Tool4", component: Tool4 },
//     { path: "/Tool5", component: Tool5 },
//     { path: "/Tool6", component: Tool6 },
//     { path: "/Tool7", component: Tool7 },
//     { path: "/Tool8", component: Tool8 },
//     { path: "/Tool9", component: Tool9 },
//     { path: "/Tool10", component: Tool10 },
// ];

// const router = new VueRouter({
//     mode: "hash",
//     routes
// });

// router.beforeEach((to, from, next) => {
//     const user = localStorage.getItem("user");

//     // Always allow landing page
//     if (to.path === "/") {
//         next();
//         return;
//     }

//     // Allow tool pages without login (if that's desired)
//     // If you want tools to require login, remove this block.
//     if (to.path.startsWith("/Tool")) {
//         next();
//         return;
//     }

//     // All other pages require auth
//     if (!user) {
//         next("/");
//     } else {
//         next();
//     }
// });
