import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
            }}
        >
            <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>
            <p style={{ fontSize: "24px", marginBottom: "20px" }}>
                Page Not Found
            </p>

            <Link
                to="/app"
                style={{
                    padding: "10px 20px",
                    background: "#4f46e5",
                    color: "white",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "18px",
                    transition: "0.3s",
                }}
            >
                ⬅ Back to Home
            </Link>
        </div>
    );
}
