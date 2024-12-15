import { useState, useEffect } from "react";

// Custom hook to determine if the screen is mobile
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the screen width is mobile size
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640); // For mobile screens (max-width: 640px)
        };

        // Check on initial render
        checkMobile();

        // Event listener for window resize
        window.addEventListener("resize", checkMobile);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return isMobile;
};
