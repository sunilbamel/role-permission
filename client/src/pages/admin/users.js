import React, { useState } from "react";
import { Badge, Button, Card, Table } from "react-bootstrap";
import Header from "../../layouts/Header";
import { Showmodal } from "../../common/showmodal";
import { useCallback } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getusersApi, updateuserApi } from "../../reducers/adminuser";


export default function Users() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user?.route)

    const [showmodal, setShowmodal] = useState(false);
    const [modaltype, setModaltype] = useState("");
    const [userdata, setUserdata] = useState(null)
    function openmodal() {
        let count = 0;
        if (state) {
            state.forEach((element) => {
                if (element.PermissionGroup.short_code === 'adminuser' && element.add === 1) {
                    count++
                }
            })
        }
        if (count > 0) {
            setModaltype("create-user")
            setShowmodal(true)
        }else{
            toast.error("You don't have this permission.")
        }
    }

    const userlist = useCallback(async () => {
        try {
            const { payload } = await dispatch(getusersApi())
            setUserdata(payload.data)
        } catch (err) {
            toast.error(err.message)
        }
    }, [dispatch]);
    useEffect(() => {
        userlist()
    }, [userlist])
    const callback = () => {
        userlist()
    }

    const updateuser = async (e) => {
        try {
            const { payload } = await dispatch(updateuserApi(e))
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            toast.success(payload.msg)
            userlist();
        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <Header />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h4>Users</h4>
                    </div>
                    <Button className="btn-sign" onClick={openmodal}>Create User</Button>
                </div>
                <Card className="border-0 shadow">
                    <Card.Body>
                        <Table hover bordered responsive>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userdata && userdata.length > 0 ? userdata.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.status === 1 ? <Badge bg="primary" pill>Active</Badge> : <Badge bg="danger" pill>Unactive</Badge>}</td>
                                                <td>{data?.Role?.role}</td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" checked={data.status === 1 ? true : false} onChange={(e) => updateuser({ id: data.id, status: e.target.checked })} type="checkbox" role="switch" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <tr>
                                            <td colSpan={5} className="text-center py-4">Empty</td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
            <Showmodal type={modaltype} showmodal={showmodal} closemodal={setShowmodal} callback={callback} />
        </React.Fragment>
    )
}