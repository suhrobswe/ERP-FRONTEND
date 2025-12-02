import type React from "react";
import { Link, useLocation } from "react-router-dom";

export const ActiveLink = ({
    href,
    children,
    className = "", 
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            to={href}
            className={`
                flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                ${
                    isActive
                        ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg"
                        : "text-gray-400 hover:text-blue-400 hover:bg-gray-800"
                }
                ${className}  {/* qo‘shimcha class qo‘shildi */}
            `}
        >
            {children}
        </Link>
    );
};
