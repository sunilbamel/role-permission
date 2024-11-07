import { useDispatch } from "react-redux";
import { getuserApi } from "../reducers/adminuser";

const { useEffect, useCallback } = require("react");
const { useNavigate } = require("react-router-dom");


const Routemiddleware = (props) => {

    const { Component, shortcode, type } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userdata = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }

        if (token) {
            const data = await dispatch(getuserApi())
            if (data.payload?.status === false) {
                localStorage.removeItem("token")
                navigate('/login');
            }
            if (data.payload.status === true) {
                if (shortcode !== "home") {
                    const route = data.payload?.data?.route
                    if (route) {
                        let count = 0;
                        route.forEach((element) => {
                            if (element.PermissionGroup.short_code === shortcode && element[type] === 1) {
                                count++
                            }
                        })
                        if (count === 0) {
                            navigate('/')
                        }

                    }
                }
            }
        }
    }, [navigate, dispatch, shortcode, type])

    useEffect(() => {
        userdata()
    }, [userdata])

    return Component

}

export default Routemiddleware;