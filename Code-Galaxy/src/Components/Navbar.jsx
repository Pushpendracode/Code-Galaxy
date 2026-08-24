import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Skills", path: "/skills" },
        { name: "Projects", path: "/projects" },
        { name: "Contact", path: "/contact" },
        { name: "Certifications", path: "/certifications" },
    ];

    return (
        <nav style={{
            position: "fixed",
            top: 0,
            width: "100%",
            padding: "15px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(10, 10, 15, 0.95)",
            backdropFilter: "blur(10px)",
            zIndex: 1000,
            borderBottom: "1px solid rgba(108, 99, 255, 0.2)",
            boxSizing: "border-box"
        }}>
            {/* Logo */}
            <Link to="/">
                <h2 style={{
                    color: "#6c63ff",
                    fontSize: "1.5rem",
                    cursor: "pointer"
                }}>
                    🌌 Code Galaxy
                </h2>
            </Link>

            {/* Desktop Links */}
            <div style={{
                display: "flex",
                gap: "30px",
                alignItems: "center"
            }}
            className="desktop-nav"
            >
                {links.map(link => (
                    <Link
                        key={link.name}
                        to={link.path}
                        style={{
                            color: location.pathname === link.path ? "#6c63ff" : "#ffffff",
                            fontSize: "16px",
                            fontWeight: location.pathname === link.path ? "bold" : "normal",
                            borderBottom: location.pathname === link.path ? "2px solid #6c63ff" : "none",
                            paddingBottom: "4px",
                            transition: "color 0.3s"
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Hamburger Button */}
            <div
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    display: "none",
                    flexDirection: "column",
                    gap: "5px",
                    cursor: "pointer",
                    zIndex: 1001
                }}
            >
                <div style={{
                    width: "25px",
                    height: "3px",
                    background: menuOpen ? "#6c63ff" : "white",
                    borderRadius: "3px",
                    transition: "all 0.3s",
                    transform: menuOpen ? "rotate(45deg) translate(5px, 6px)" : "none"
                }} />
                <div style={{
                    width: "25px",
                    height: "3px",
                    background: menuOpen ? "#6c63ff" : "white",
                    borderRadius: "3px",
                    transition: "all 0.3s",
                    opacity: menuOpen ? 0 : 1
                }} />
                <div style={{
                    width: "25px",
                    height: "3px",
                    background: menuOpen ? "#6c63ff" : "white",
                    borderRadius: "3px",
                    transition: "all 0.3s",
                    transform: menuOpen ? "rotate(-45deg) translate(5px, -6px)" : "none"
                }} />
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    position: "fixed",
                    top: "60px",
                    left: 0,
                    width: "100%",
                    background: "rgba(10, 10, 15, 0.98)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    borderBottom: "1px solid rgba(108, 99, 255, 0.2)",
                    zIndex: 1000
                }}>
                    {links.map(link => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                color: location.pathname === link.path ? "#6c63ff" : "#ffffff",
                                fontSize: "18px",
                                fontWeight: location.pathname === link.path ? "bold" : "normal",
                                padding: "10px 0",
                                borderBottom: "1px solid rgba(108, 99, 255, 0.1)"
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;