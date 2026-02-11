import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const ProtectedRoute = ({ children }) => {
    const { token, navigate, isTokenLoaded, verifyTokenWithBackend } = useContext(ShopContext);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const checkAndVerify = async () => {
            if (isTokenLoaded && !token) {
                navigate('/signup');
                return;
            }

            if (token) {
                // Verify token with backend
                const isValid = await verifyTokenWithBackend(token);
                setIsVerified(isValid);
                if (!isValid) {
                    navigate('/signup');
                }
            }
        }

        checkAndVerify();
    }, [token, navigate, isTokenLoaded, verifyTokenWithBackend]);

    // Show nothing while checking authentication
    if (!isTokenLoaded || !isVerified) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
