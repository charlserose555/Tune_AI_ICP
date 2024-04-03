import { useSelector } from "../../store";
// import LoginModal from "../../components/Popups/LoginModal";
// import RegisterModal from "../../components/Popups/RegisterModal";

const AuthLayout = () => {
    const { page } = useSelector((state) => state.menu);

    return (
        <>
            {/* {page === 'login' && <LoginModal />}
            {page === 'register' && <RegisterModal />} */}
            {/* {page === 'cashier' && <Cashier />}
            {page === 'register' && <Register />}
            {page === 'forgot' && <Forgot />}
            {page === 'reset-password' && <ResetPassword />}
            {page === 'bets' && <Bets />} */}
        </>
    );
};

export default AuthLayout;