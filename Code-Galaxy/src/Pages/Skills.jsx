import { motion } from "framer-motion";

const skills = [
    { name: "JavaScript (ES6+)", level: 85, icon: "⚡", color: "#f7df1e" },
    { name: "React.js", level: 80, icon: "⚛️", color: "#61dafb" },
    { name: "Redux Toolkit", level: 70, icon: "🧩", color: "#764abc" },
    { name: "Tailwind CSS", level: 75, icon: "💨", color: "#38bdf8" },
    { name: "Node.js", level: 75, icon: "🟢", color: "#68a063" },
    { name: "Express.js", level: 75, icon: "🚀", color: "#ffffff" },
    { name: "MongoDB / Mongoose", level: 70, icon: "🍃", color: "#4db33d" },
    { name: "JWT & Bearer Auth", level: 75, icon: "🔐", color: "#00d4ff" },
    { name: "RBAC", level: 70, icon: "🛡️", color: "#ff6584" },
    { name: "Razorpay Integration", level: 65, icon: "💳", color: "#528ff0" },
    { name: "REST APIs", level: 80, icon: "🔌", color: "#00d4ff" },
    { name: "Git & GitHub", level: 75, icon: "📦", color: "#f05032" },
    { name: "Postman", level: 75, icon: "📮", color: "#ff6c37" },
    { name: "HTML/CSS", level: 90, icon: "🎨", color: "#e34c26" },
];

function Skills() {
    return (
        <div style={{
            minHeight: "100vh",
            padding: "120px 20px 60px",
            background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)"
        }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>

                {/* Header */}
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
                        My Skills ⚡
                    </h1>
                    <p style={{ color: "#aaa", fontSize: "16px" }}>
                        Technologies I have mastered on my journey!
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: "20px"
                }}>
                    {skills.map((skill, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: "rgba(108, 99, 255, 0.05)",
                                border: "1px solid rgba(108, 99, 255, 0.2)",
                                borderRadius: "12px",
                                padding: "20px"
                            }}
                        >
                            {/* Skill header */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "12px"
                            }}>
                                <span style={{ fontSize: "16px", color: "#fff" }}>
                                    {skill.icon} {skill.name}
                                </span>
                                <span style={{ color: skill.color, fontWeight: "bold" }}>
                                    {skill.level}%
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div style={{
                                background: "rgba(255,255,255,0.1)",
                                borderRadius: "10px",
                                height: "8px",
                                overflow: "hidden"
                            }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ delay: i * 0.1 + 0.3, duration: 1 }}
                                    style={{
                                        height: "100%",
                                        background: `linear-gradient(90deg, #6c63ff, ${skill.color})`,
                                        borderRadius: "10px"
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Currently Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    style={{
                        marginTop: "50px",
                        textAlign: "center",
                        padding: "30px",
                        background: "rgba(0, 212, 255, 0.05)",
                        border: "1px solid rgba(0, 212, 255, 0.2)",
                        borderRadius: "12px"
                    }}
                >
                    <h3 style={{ color: "#00d4ff", marginBottom: "15px" }}>
                        🌱 Currently Exploring
                    </h3>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                        {["Three.js", "Framer Motion", "TypeScript", "Docker"].map((tech, i) => (
                            <span key={i} style={{
                                padding: "8px 16px",
                                background: "rgba(0, 212, 255, 0.1)",
                                border: "1px solid rgba(0, 212, 255, 0.3)",
                                borderRadius: "20px",
                                color: "#00d4ff",
                                fontSize: "14px"
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Skills;