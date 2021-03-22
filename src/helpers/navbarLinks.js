exports.helpers = [
    { name: "Home", slug: "/", guest: true, logged: true, isAdmin: true },
    {
        name: "Categories",
        slug: "/categories",
        guest: false,
        logged: true,
        isAdmin: false
    },
    {
        name: "GitHub",
        slug: "https://github.com/ArthurMaciel95",
        guest: true,
        logged: true,
        isAdmin: false
    },
    {
        name: "Login",
        slug: "/login",
        guest: true,
        logged: false,
        isAdmin: false
    },
    {
        name: "Painel Control",
        slug: "/admin/painel-control",
        guest: false,
        logged: true,
        isAdmin: true
    },
    {
        name: "Users",
        slug: "/admin/users",
        guest: false,
        logged: true,
        isAdmin: true
    }
];
