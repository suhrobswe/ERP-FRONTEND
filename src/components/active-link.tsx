import type React from "react";
import { Link, useLocation } from "react-router-dom";

export const ActiveLink = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            className={`${
                isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
            } transition-all duration-200 flex items-center gap-3 p-3 rounded-lg`}
            to={href}
        >
            {children}
        </Link>
    );
};
