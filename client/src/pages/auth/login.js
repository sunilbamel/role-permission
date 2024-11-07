import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { loginApi } from "../../reducers/auth";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({
        email: null,
        password: null
    })
    const [loading, setLoading] = useState(false)
    const login = async (e) => {
        e.preventDefault();
        try {
            if (!formdata.email) {
                throw new Error("Please enter your email.");
            }
            if (!formdata.password) {
                throw new Error("Please enter your password.");
            }
            setLoading(true)
            const { payload } = await dispatch(loginApi(formdata))
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            if (payload.status === true) {
                toast.success(payload.msg)
                localStorage.setItem("email", payload.data.email)
                navigate('/verify-otp')
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="page-sign">
                <Card className="card-sign">
                    <Card.Header>
                        <Link to="/" className="header-logo mb-4">Simplydesi</Link>
                        <Card.Title>Sign In</Card.Title>
                        <Card.Text>Welcome back! Please signin to continue.</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={login}>
                            <div className="mb-4">
                                <Form.Label >Email address</Form.Label>
                                <Form.Control type="text" placeholder="Enter your email address" onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <Form.Label className="d-flex justify-content-between">Password <Link to="">Forgot password?</Link></Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setFormdata({ ...formdata, password: e.target.value })} />
                            </div>
                            {
                                loading ?
                                    <Button variant="primary" className="btn-sign">
                                        <Spinner animation="border" variant="light" />
                                    </Button>
                                    :
                                    <Button type="submit" variant="primary" className="btn-sign">Sign In</Button>
                            }
                        </Form>
                    </Card.Body>
                    {/* <Card.Footer>
                    Don't have an account? <Link to="/pages/signup">Create an Account</Link>
                </Card.Footer> */}
                </Card>
            </div>
        </>
    )
}