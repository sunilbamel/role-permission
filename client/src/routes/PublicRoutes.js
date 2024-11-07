import Login from "../pages/auth/login";
import VerifyOtp from "../pages/auth/verifyotp";


const publicRoutes = [
    { path: "login", element: <Login /> },
    { path: "verify-otp", element: <VerifyOtp /> }
];

export default publicRoutes;