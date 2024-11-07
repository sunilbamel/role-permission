import CreateRole from "../pages/admin/createrole";
import Permission from "../pages/admin/permission";
import Roles from "../pages/admin/roles";
import SingleRole from "../pages/admin/singlerole";
import Users from "../pages/admin/users";
import Home from "../pages/home";


const protectedRoutes = [
    { short_code: "home", path: "/", element: <Home /> },
    { short_code: "adminuser", type: 'view', path: "/admin/users", element: <Users /> },
    { short_code: "roles", type: 'view', path: "/admin/roles", element: <Roles /> },
    { short_code: "roles", type: 'add', path: "/admin/create-roles", element: <CreateRole /> },
    { short_code: "roles", type: 'edit', path: "/admin/roles/:id", element: <SingleRole /> },
    { short_code: "permissions",type: 'view', path: "/admin/permissions", element: <Permission /> },
]

export default protectedRoutes;