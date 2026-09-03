import { useState, useEffect } from "react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const links = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Certifications", id: "certifications" },
        { name: "Contact", id: "contact" }
    ];

    const resumeUrl = "https://drive.google.com/file/d/1Oupy_gJgsclsdTibSWh1okuQL1AgTsq2/view?usp=sharing";

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );

        links.forEach((link) => {
            const el = document.getElementById(link.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

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
            <a href="#home">
                <h2 style={{
                    color: "#6c63ff",
                    fontSize: "1.5rem",
                    cursor: "pointer"
                }}>
                    🌌 Code Galaxy
                </h2>
            </a>

            {/* Desktop Links + Resume Button */}
            <div style={{
                display: "flex",
                gap: "30px",
                alignItems: "center"
            }}
            className="desktop-nav"
            >
                {links.map(link => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        style={{
                            color: activeSection === link.id ? "#6c63ff" : "#ffffff",
                            fontSize: "16px",
                            fontWeight: activeSection === link.id ? "bold" : "normal",
                            borderBottom: activeSection === link.id ? "2px solid #6c63ff" : "none",
                            paddingBottom: "4px",
                            transition: "color 0.3s"
                        }}
                    >
                        {link.name}
                    </a>
                ))}

                <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: "8px 18px",
                        background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        boxShadow: "0 0 12px rgba(108, 99, 255, 0.4)"
                    }}
                >
                    📄 Resume
                </a>
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
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                color: activeSection === link.id ? "#6c63ff" : "#ffffff",
                                fontSize: "18px",
                                fontWeight: activeSection === link.id ? "bold" : "normal",
                                padding: "10px 0",
                                borderBottom: "1px solid rgba(108, 99, 255, 0.1)"
                            }}
                        >
                            {link.name}
                        </a>
                    ))}

                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        style={{
                            padding: "10px 0",
                            color: "#00d4ff",
                            fontSize: "18px",
                            fontWeight: "bold",
                            textDecoration: "none"
                        }}
                    >
                        📄 Resume
                    </a>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
