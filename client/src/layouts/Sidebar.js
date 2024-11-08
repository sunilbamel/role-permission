import React, { Component, useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
// import userAvatar from "../assets/img/img1.jpg";
import {
    AdminUser
} from "../data/Menu";
import { useSelector } from "react-redux";

export default class Sidebar extends Component {
    toggleFooterMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest(".sidebar");
        parent.classList.toggle("footer-menu-show");
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">Simplydesi</Link>
                </div>
                <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref}>
                    <SidebarMenu onUpdateSize={() => this._scrollBarRef.updateScroll()} />
                </PerfectScrollbar>
                {/* <div className="sidebar-footer">
                    <div className="sidebar-footer-top">
                        <div className="sidebar-footer-thumb">
                            <img src={userAvatar} alt="" />
                        </div>
                        <div className="sidebar-footer-body">
                            <h6><Link to="../pages/profile.html">Shaira Diaz</Link></h6>
                            <p>Premium Member</p>
                        </div>
                        <Link onClick={this.toggleFooterMenu} to="" className="dropdown-link"><i className="ri-arrow-down-s-line"></i></Link>
                    </div>
                    <div className="sidebar-footer-menu">
                        <nav className="nav">
                            <Link to=""><i className="ri-edit-2-line"></i> Edit Profile</Link>
                            <Link to=""><i className="ri-profile-line"></i> View Profile</Link>
                        </nav>
                        <hr />
                        <nav className="nav">
                            <Link to=""><i className="ri-question-line"></i> Help Center</Link>
                            <Link to=""><i className="ri-lock-line"></i> Privacy Settings</Link>
                            <Link to=""><i className="ri-user-settings-line"></i> Account Settings</Link>
                            <Link to=""><i className="ri-logout-box-r-line"></i> Log Out</Link>
                        </nav>
                    </div>
                </div> */}
            </div>
        )
    }
}

const SidebarMenu = () => {
    const state = useSelector((state) => state.user?.route);

    const [adminuserRoute, setAdminUserroute] = useState(null)
    // const [permissionsRoute, setPermissionsroute] = useState(null)

    const checkroute = ({ route, filterarray }) => {
        let newdata = []
        route.forEach((element) => {
            const check = filterarray.includes(element.short_code)
            if (check) {
                newdata.push(element)
            }
        })
        return newdata
    }
    const callroute = useCallback(() => {
        const filterarray = state && state.map((data) => {
            return data.PermissionGroup.short_code
        })
        if (filterarray) {
            setAdminUserroute(checkroute({ route: AdminUser, filterarray }));
        }
    }, [state])
    useEffect(() => {
        callroute()
    }, [callroute])
    const populateMenu = (m) => {
        const menu = m.map((m, key) => {
            let sm;
            if (m.submenu) {
                sm = m.submenu.map((sm, key) => {
                    return (
                        <NavLink to={sm.link} className="nav-sub-link" key={key}>{sm.label}</NavLink>
                    )
                })
            }

            return (
                <li key={key} className="nav-item">
                    {(!sm) ? (
                        <NavLink to={m.link} className="nav-link"><i className={m.icon}></i> <span>{m.label}</span></NavLink>
                    ) : (
                        <div onClick={toggleSubMenu} className="nav-link has-sub"><i className={m.icon}></i> <span>{m.label}</span></div>
                    )}
                    {m.submenu && <nav className="nav nav-sub">{sm}</nav>}
                </li>
            )
        });

        return (
            <ul className="nav nav-sidebar">
                {menu}
            </ul>
        );
    }

    // Toggle menu group
    const toggleMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-group');
        parent.classList.toggle('show');

    }

    // Toggle submenu while closing siblings' submenu
    const toggleSubMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-item');
        let node = parent.parentNode.firstChild;

        while (node) {
            if (node !== parent && node.nodeType === Node.ELEMENT_NODE)
                node.classList.remove('show');
            node = node.nextElementSibling || node.nextSibling;
        }

        parent.classList.toggle('show');

    }

    return (
        <React.Fragment>
            <div className="nav-group show">
                <ul className="nav nav-sidebar pb-0">
                    <li className="nav-item">
                        <NavLink to={"/"} className="nav-link"><span>Dashboard</span></NavLink>
                    </li>
                </ul>
            </div>
            {
                adminuserRoute && <div className="nav-group">
                    <div className="nav-label" onClick={toggleMenu}>AdminUser</div>
                    {populateMenu(adminuserRoute)}
                </div>
            }
            {/* {
                permissionsRoute && <div className="nav-group">
                    <div className="nav-label" onClick={toggleMenu}>Permissions</div>
                    {populateMenu(permissionsRoute)}
                </div>
            } */}
            {/* <div className="nav-group">
                    <div className="nav-label" onClick={this.toggleMenu}>Roles</div>
                    {this.populateMenu(Roles)}
                </div> */}
        </React.Fragment>
    )
}

window.addEventListener("click", function (e) {
    // Close sidebar footer menu when clicked outside of it
    let tar = e.target;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

    // Hide sidebar offset when clicked outside of sidebar
    if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
        document.querySelector("body").classList.remove("sidebar-show");
    }
});

window.addEventListener("load", function () {
    let skinMode = localStorage.getItem("sidebar-skin");
    let HTMLTag = document.querySelector("html");

    if (skinMode) {
        HTMLTag.setAttribute("data-sidebar", skinMode);
    }
});