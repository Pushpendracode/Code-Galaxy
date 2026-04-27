
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={{
            position: "fixed",
            top: 0,
            width: "100%",
            padding: "20px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(10, 10, 15, 0.9)",
            backdropFilter: "blur(10px)",
            zIndex: 1000,
            borderBottom: "1px solid rgba(108, 99, 255, 0.2)"
        }}>
            {/* Logo */}
            <h2 style={{ color: "#6c63ff" }}>
                🌌 Code Galaxy
            </h2>

            {/* Links */}
            <div style={{ display: "flex", gap: "30px" }}>
                {["Home", "About", "Skills", "Projects", "Contact"].map(link => (
                    <Link
                        key={link}
                        to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                        style={{
                            color: "#ffffff",
                            fontSize: "16px",
                            transition: "color 0.3s"
                        }}
                        onMouseEnter={e => e.target.style.color = "#6c63ff"}
                        onMouseLeave={e => e.target.style.color = "#ffffff"}
                    >
                        {link}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;