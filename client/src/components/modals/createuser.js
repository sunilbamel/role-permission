import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { Button, Form,Spinner } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createuserApi, getroleApi } from '../../reducers/adminuser';
import Select from 'react-select';


function CreateUser({ showmodal, closemodal, callback }) {
    const dispatch = useDispatch()

    const [roledata, setRoledata] = useState(null);
    const [loading, setLoading] = useState(false)

    const [formdata, setFormdata] = useState({
        name: null,
        email: null,
        password: null,
        roleId: null
    });
    const handleClose = () => {
        closemodal(false);
        setFormdata({
            name: null,
            email: null,
            password: null,
            roleId: null
        })
    }
    const rolelist = useCallback(async () => {
        try {
            const { payload } = await dispatch(getroleApi())
            const options = payload.data.map(data => {
                return { value: data.id, label: data.role }
            })
            setRoledata(options)
        } catch (err) {
            toast.error(err.message)
        }
    }, [dispatch]);

    useEffect(() => {
        rolelist()
    }, [rolelist])

    const createuser = async (e) => {
        e.preventDefault()
        try {
            if (!formdata.name) {
                throw new Error('Please enter name.')
            }
            if (!formdata.email) {
                throw new Error('Please enter email.')
            }
            if (!formdata.password) {
                throw new Error('Please enter password.')
            }
            if (!formdata.roleId) {
                throw new Error('Please select a role.')
            }
            setLoading(true)
            const { payload } = await dispatch(createuserApi(formdata))
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            if (payload.status === true) {
                toast.success(payload.msg)
                handleClose()
                callback()
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastContainer />
            <Modal show={showmodal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <h5 className="fw-semibold m-0">Create User</h5>
                </Modal.Header>
                <Modal.Body>
                    <Form method="post" onSubmit={createuser}>
                        <div className='mb-3'>
                            <Form.Label >Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter Email" onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <Form.Label >Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter Password" onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <Form.Label >Role</Form.Label>
                            <Select
                                defaultValue={formdata.roleId}
                                onChange={(e) => setFormdata({ ...formdata, roleId: e?.value })}
                                options={roledata && roledata}
                                isSearchable={true}
                                isClearable
                            />
                        </div>
                        {
                            loading ?
                                <Button variant="primary" className="btn-sign">
                                    <Spinner animation="border" variant="light" />
                                </Button>
                                :
                                <Button type="submit" variant="primary" className="btn-sign">Create User</Button>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateUser;