import React, { useEffect, useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { ResendOtpApi, verifyotpApi } from "../../reducers/auth";
import Timer from "../../components/countdown";

export default function VerifyOtp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(null);
    const [email, setEmail] = useState(null)
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const [showdiv, setShowdiv] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem('email')
        if (!email) {
            navigate('/login')
        } else {
            setEmail(email)
        }
    }, [navigate])

    const callback = () => {
        setShowdiv(false)
    }

    const Verifyotp = async (e) => {
        e.preventDefault();
        try {
            if (!otp) {
                throw new Error("Please enter your otp.");
            }
            setLoading(true)
            const { payload } = await dispatch(verifyotpApi({ otp, email: localStorage.getItem('email') }))
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            if (payload.status === true) {
                toast.success(payload.msg)
                localStorage.removeItem("email", payload.data.email);
                localStorage.setItem("token", payload.data.token)
                navigate('/')
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false)
        }
    }

    const resendotp = async (e) => {
        try {
            setLoading(true)
            const { payload } = await dispatch(ResendOtpApi({ email: email }))
            if (payload.status === false) {
                throw new Error(payload.msg)
            }
            if (payload.status === true) {
                toast.success(payload.msg)
                setMinutes(2)
                setSeconds(0)
                setShowdiv(true)
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
                    <Card.Header className="d-flex flex-column align-items-center">
                        <Link to="/" className="header-logo mb-4">Simplydesi</Link>
                        <Card.Title className="text-center">Verify OTP</Card.Title>
                        <Card.Text className="text-center">Please enter the 6 digit code sent to <span className="fw-bold">{email ? email : ""}</span></Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Form method="post" onSubmit={Verifyotp}>
                            <div className="mb-4">
                                <Form.Label >OTP</Form.Label>
                                <Form.Control type="text" placeholder="Enter your OTP" onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            {
                                loading ?
                                    <Button variant="primary" className="btn-sign">
                                        <Spinner animation="border" variant="light" />
                                    </Button>
                                    :
                                    <Button type="submit" variant="primary" className="btn-sign">Verify</Button>
                            }
                        </Form>
                        <div className="text-center mt-3">
                            {
                                showdiv === true ?
                                    <p id='timer' style={{ display: 'block' }} className="text-muted mb-0">Didn't receive an email ? <span
                                        className="text-primary fw-semibold"> Resend in <Timer initialMinute={minutes} initialSeconds={seconds} callback={callback} /> minutes.</span> </p>
                                    :
                                    <p id='resend' className="text-muted mb-0">Didn't receive an email ? <Link onClick={resendotp}
                                        className="text-primary fw-semibold"> Resend </Link> </p>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}