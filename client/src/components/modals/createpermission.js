import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createpermissionApi } from '../../reducers/adminuser';

function CreatePermission({ showmodal, closemodal, callback }) {
    const dispatch = useDispatch()

    const [formdata, setFormdata] = useState({
        name: null,
        shortcode: null
    })
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        closemodal(false);
        setFormdata({
            name: null,
            shortcode: null
        })
    }

    const createpermission = async (e) => {
        e.preventDefault()
        try {
            if (!formdata.name) {
                throw new Error('Please enter name.')
            }
            if (!formdata.shortcode) {
                throw new Error('Please enter short code.')
            }
            setLoading(true)
            const { payload } = await dispatch(createpermissionApi(formdata))
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
                    <h5 className="fw-semibold m-0">Create Permission</h5>
                </Modal.Header>
                <Modal.Body>
                    <Form method="post" onSubmit={createpermission}>
                        <div className='mb-3'>
                            <Form.Label >Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Role Name" onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <Form.Label >Short Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Role Name" onChange={(e) => setFormdata({ ...formdata, shortcode: e.target.value })} />
                        </div>

                        {
                            loading ?
                                <Button variant="primary" className="btn-sign">
                                    <Spinner animation="border" variant="light" />
                                </Button>
                                :
                                <Button type="submit" variant="primary" className="btn-sign">Create Permission</Button>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreatePermission;