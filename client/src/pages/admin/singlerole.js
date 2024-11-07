import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form, Spinner, Table } from 'react-bootstrap';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getpermissionApi, getrolepermissionApi, updateroleApi } from '../../reducers/adminuser';
import Header from '../../layouts/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';


function SingleRole() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const params = useParams()

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [name, setName] = useState(null);
    const [option, setOption] = useState(null);
    const [permissionids, setPermissionids] = useState(null)


    const PermissionList = useCallback(async () => {
        try {
            const returnValue = await dispatch(getrolepermissionApi({ id: params.id }))
            const { payload } = await dispatch(getpermissionApi());
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            const ids = []
            returnValue.payload.data.data.forEach(element => {
                ids.push(element.permission_id)
            })
            setPermissionids(ids)
            const options = []
            payload?.data.forEach((data) => {
                let count = 0;
                returnValue.payload?.data.data.forEach((element) => {
                    if (element.permission_id === data.id) {
                        options.push({
                            name: data.name,
                            id: data.id,
                            all: element.edit === 1 && element.add === 1 && element.view === 1 && element.delete === 1 ? 1 : 0,
                            edit: element.edit,
                            view: element.view,
                            add: element.add,
                            delete: element.delete
                        });
                        count++
                    }
                })
                if (count === 0) {
                    options.push({ name: data.name, id: data.id, all: 0, edit: 0, view: 0, add: 0, delete: 0 });
                }
            })
            setOption(options);
            setStatus(returnValue.payload?.data?.role.status);
            setName(returnValue.payload?.data?.role.role)
        } catch (err) {
            toast.error(err.message)
        }
    }, [dispatch, params.id])

    useEffect(() => {
        PermissionList()
    }, [PermissionList])

    const changeValue = (e) => {
        const modifiedValue = option.map(obj => {
            if (obj.id === e.id) {
                const params = {};
                if (e.type === "all" && e.value === true) {
                    params.all = 1
                    params.edit = 1
                    params.view = 1
                    params.add = 1
                    params.delete = 1
                }
                if (e.type === "all" && e.value === false) {
                    params.all = 0
                    params.edit = 0
                    params.view = 0
                    params.add = 0
                    params.delete = 0
                }
                if (e.type === "view") {
                    if (e.value === true) {
                        params.view = 1
                    } else {
                        params.view = 0
                    }
                    params.all = 0
                }
                if (e.type === "edit") {
                    if (e.value === true) {
                        params.edit = 1
                    } else {
                        params.edit = 0
                    }
                    params.all = 0
                }
                if (e.type === "add") {
                    if (e.value === true) {
                        params.add = 1
                    } else {
                        params.add = 0
                    }
                    params.all = 0
                }
                if (e.type === "delete") {
                    if (e.value === true) {
                        params.delete = 1
                    } else {
                        params.delete = 0
                    }
                    params.all = 0
                }
                return { ...obj, ...params };
            }
            return obj;
        });
        setOption(modifiedValue)
    }

    const updaterole = async (e) => {
        e.preventDefault()
        try {
            const permission = []
            option.forEach((data) => {
                if (permissionids.includes(data.id)) {
                    permission.push({ permissionId: data.id, edit: data.edit, add: data.add, view: data.view, delete: data.delete })
                } else if (data.edit === 1 || data.add === 1 || data.view === 1 || data.delete === 1) {
                    permission.push({ permissionId: data.id, edit: data.edit, add: data.add, view: data.view, delete: data.delete })
                }
            })
            setLoading(true)
            const { payload } = await dispatch(updateroleApi({ permissions: permission, status: status,roleId:params.id }))
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            if (payload.status === true) {
                toast.success(payload.msg)
                navigate('/admin/roles')
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <React.Fragment>
            <Header />
            <ToastContainer />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className='d-flex'>
                        <Link to={'/admin/roles'}>
                            <i className="fa-solid fa-arrow-left me-2 mt-1 fs-5"></i>
                        </Link>
                        <h4>Edit Role</h4>
                    </div>
                    <h4 className='pe-1'>
                        {name && name}
                    </h4>
                </div>
                <Card className="border-0 shadow">
                    <Card.Body>
                        <Form method="post" onSubmit={updaterole}>
                            <Table responsive className="mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col"><h4>Permission</h4></th>
                                        <th scope="col" style={{ minWidth: 100 }}></th>
                                        <th scope="col" style={{ minWidth: 100 }}></th>
                                        <th scope="col" style={{ minWidth: 100 }}></th>
                                        <th scope="col" style={{ minWidth: 100 }}></th>
                                        <th scope="col" style={{ minWidth: 100 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        option && option.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{data.name}</th>
                                                    <td>
                                                        <div className='d-flex'>
                                                            All <Form.Check type="checkbox" checked={data.all === 1 ? true : false} onChange={(e) => changeValue({ id: data.id, type: "all", value: e.target.checked })} className='ms-2' />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            Index <Form.Check type="checkbox" checked={data.view === 1 ? true : false} onChange={(e) => changeValue({ id: data.id, type: "view", value: e.target.checked })} className='ms-2' />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            Edit <Form.Check type="checkbox" checked={data.edit === 1 ? true : false} onChange={(e) => changeValue({ id: data.id, type: "edit", value: e.target.checked })} className='ms-2' />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            Add <Form.Check type="checkbox" checked={data.add === 1 ? true : false} onChange={(e) => changeValue({ id: data.id, type: "add", value: e.target.checked })} className='ms-2' />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            Delete <Form.Check type="checkbox" checked={data.delete === 1 ? true : false} onChange={(e) => changeValue({ id: data.id, type: "delete", value: e.target.checked })} className='ms-2' />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>

                            <div className='d-flex justify-content-between align-items-center' >
                                <Form.Check type='switch' className='fs-4' checked={status === 1 ? true : false} onChange={(e) => setStatus(e.target.checked === true ? 1 : 0)} />
                                {
                                    loading ?
                                        <Button variant="primary" className="btn-sign mt-3">
                                            <Spinner animation="border" variant="light" />
                                        </Button>
                                        :
                                        <Button type="submit" variant="primary" className="btn-sign mt-3">Save Changes</Button>
                                }
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </React.Fragment>

    );
}

export default SingleRole;