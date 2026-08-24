import { motion } from "framer-motion";

const certifications = [
    {
        name: "MERN Stack Development",
        issuer: "GUVI",
        credentialId: "nXBMnsMTS3q5PJiH",
        icon: "🏆",
    },
];

function Certifications() {
    return (
        <div style={{
            minHeight: "100vh",
            padding: "120px 20px 60px",
            background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)"
        }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "60px" }}
                >
                    <h1 style={{
                        fontSize: "3rem",
                        background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "10px"
                    }}>
                        Certifications 🏆
                    </h1>
                    <p style={{ color: "#aaa", fontSize: "16px" }}>
                        Milestones earned along the way!
                    </p>
                </motion.div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "20px"
                }}>
                    {certifications.map((cert, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            style={{
                                background: "rgba(108, 99, 255, 0.05)",
                                border: "1px solid rgba(108, 99, 255, 0.2)",
                                borderRadius: "16px",
                                padding: "25px",
                                display: "flex",
                                alignItems: "center",
                                gap: "18px"
                            }}
                        >
                            <div style={{ fontSize: "40px" }}>{cert.icon}</div>
                            <div>
                                <h3 style={{ color: "#6c63ff", marginBottom: "6px", fontSize: "1.1rem" }}>
                                    {cert.name}
                                </h3>
                                <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "4px" }}>
                                    {cert.issuer}
                                </p>
                                <p style={{ color: "#666", fontSize: "12px" }}>
                                    Credential ID: {cert.credentialId}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Certifications;