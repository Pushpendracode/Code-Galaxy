import { motion } from "framer-motion";

function About() {
    return (
        <div style={{
            minHeight: "100vh",
            padding: "120px 20px 60px",
            background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0a0a0f 70%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{
                maxWidth: "900px",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "center"
            }}>
                {/* Left — Avatar */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center" }}
                >
                    <div style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "80px",
                        margin: "0 auto 20px",
                        boxShadow: "0 0 40px rgba(108, 99, 255, 0.5)"
                    }}>
                        👨‍💻
                    </div>
                    <h2 style={{ color: "#6c63ff" }}>Pushpendra Singh</h2>
                    <p style={{ color: "#00d4ff" }}>Full Stack Developer</p>
                </motion.div>

                {/* Right — Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{
                        fontSize: "2.5rem",
                        marginBottom: "20px",
                        background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}>
                        About Me 🚀
                    </h1>

                    <p style={{
                        color: "#ccc",
                        lineHeight: "1.8",
                        marginBottom: "20px",
                        fontSize: "16px"
                    }}>
                        Hey! I'm Pushpendra Singh, a passionate Full Stack Developer
                        from India. I love building web applications and exploring
                        new technologies every day!
                    </p>

                    <p style={{
                        color: "#ccc",
                        lineHeight: "1.8",
                        marginBottom: "30px",
                        fontSize: "16px"
                    }}>
                        I am the creator of <span style={{ color: "#00d4ff" }}>Nova AI</span> —
                        a human-like AI assistant. My goal is to become the
                        world's best developer and build products that impact millions!
                    </p>

                    {/* Stats */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "15px"
                    }}>
                        {[
                            { label: "Projects Built", value: "5+" },
                            { label: "Days of Learning", value: "15+" },
                            { label: "Technologies", value: "10+" },
                            { label: "Goal", value: "🌟 Best Dev" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                style={{
                                    background: "rgba(108, 99, 255, 0.1)",
                                    border: "1px solid rgba(108, 99, 255, 0.3)",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    textAlign: "center"
                                }}
                            >
                                <h3 style={{ color: "#6c63ff", fontSize: "1.5rem" }}>
                                    {stat.value}
                                </h3>
                                <p style={{ color: "#aaa", fontSize: "14px" }}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default About;