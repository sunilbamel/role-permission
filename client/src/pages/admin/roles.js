import React, { useState } from "react";
import { Badge, Button, Card, Table } from "react-bootstrap";
import Header from "../../layouts/Header";
import { useCallback } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getroleApi } from "../../reducers/adminuser";
import { Link, useNavigate } from "react-router-dom";


export default function Roles() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [roledata, setRoledata] = useState(null)
    function openmodal() {
        navigate('/admin/create-roles')
    }

    const userlist = useCallback(async () => {
        try {
            const { payload } = await dispatch(getroleApi())
            setRoledata(payload.data)
        } catch (err) {
            toast.error(err.message)
        }
    }, [dispatch]);
    useEffect(() => {
        userlist()
    }, [userlist])
    return (
        <React.Fragment>
            <Header />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <h4>Roles</h4>
                    </div>
                    <Button className="btn-sign" onClick={openmodal}>Create Role</Button>
                </div>
                <Card className="border-0 shadow">
                    <Card.Body>
                        <Table hover bordered responsive>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ textAlign: "center" }}>Name</th>
                                    <th scope="col" style={{ textAlign: "center" }}>Status</th>
                                    <th scope="col" style={{ textAlign: "center" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    roledata && roledata.length > 0 ? roledata.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="text-center">{data.role}</td>
                                                <td className="text-center">{data.status === 1 ? <Badge bg="primary" pill>Active</Badge> : <Badge bg="danger" pill>Unactive</Badge>}</td>
                                                <td className="text-center"><Link to={`/admin/roles/${data.id}`} className="text-primary"><i className="fa-solid fa-pen-to-square"></i></Link></td>
                                            </tr>
                                        )
                                    })
                                        :
                                        <tr>
                                            <td colSpan={3} className="text-center py-4">Empty</td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>
    )
}