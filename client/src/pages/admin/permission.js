import React, { useState } from "react";
import { Badge, Button, Card, Table } from "react-bootstrap";
import Header from "../../layouts/Header";
import { Showmodal } from "../../common/showmodal";
import { useCallback } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getpermissionApi, updatepermissionApi } from "../../reducers/adminuser";


export default function Permission() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user?.route)

    const [showmodal, setShowmodal] = useState(false);
    const [modaltype, setModaltype] = useState("");
    const [permissiondata, setPermissiondata] = useState(null)
    function openmodal() {
        let count = 0;
        if (state) {
            state.forEach((element) => {
                if (element.PermissionGroup.short_code === 'permissions' && element.add === 1) {
                    count++
                }
            })
        }
        if (count > 0) {
            setModaltype("create-permission")
            setShowmodal(true)
        } else {
            toast.error("You don't have this permission.")
        }

    }

    const userlist = useCallback(async () => {
        try {
            const { payload } = await dispatch(getpermissionApi())
            setPermissiondata(payload.data)
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

    const updatepermission = async (e) => {
        try {
            const { payload } = await dispatch(updatepermissionApi(e))
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
                        <h4>Permissions</h4>
                    </div>
                    <Button className="btn-sign" onClick={openmodal}>Create Permission</Button>
                </div>
                <Card className="border-0 shadow">
                    <Card.Body>
                        <Table hover bordered responsive>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Short Code</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    permissiondata && permissiondata.length > 0 ? permissiondata.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.short_code}</td>
                                                <td>{data.status === 1 ? <Badge bg="primary" pill>Active</Badge> : <Badge bg="danger" pill>Unactive</Badge>}</td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" onChange={(e) => updatepermission({ id: data.id, status: e.target.checked })} defaultChecked={data.status === 1 ? true : false} type="checkbox" role="switch" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <tr>
                                            <td colSpan={2} className="text-center py-4">Empty</td>
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