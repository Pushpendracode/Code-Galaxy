import { motion } from "framer-motion";

const projects = [
    {
        title: "Code Galaxy Portfolio",
        description: "A space themed interactive portfolio showing my developer journey!",
        tech: ["React", "Framer Motion", "CSS"],
        icon: "🌌",
        color: "#6c63ff",
        status: "In Progress"
    },
    {
        title: "Nova AI",
        description: "A human-like AI assistant with memory, personality and emotions!",
        tech: ["React", "Node.js", "Claude API"],
        icon: "🤖",
        color: "#00d4ff",
        status: "In Progress"
    },
    {
        title: "Full Stack Blog App",
        description: "Complete blog with authentication, JWT, and MongoDB database!",
        tech: ["React", "Express", "MongoDB", "JWT"],
        icon: "📝",
        color: "#ff6584",
        status: "Completed"
    },
    {
        title: "Todo App",
        description: "Feature rich todo app with local storage and filter system!",
        tech: ["JavaScript", "DOM", "LocalStorage"],
        icon: "✅",
        color: "#4db33d",
        status: "Completed"
    },
    {
        title: "REST API",
        description: "Complete REST API with Express and MongoDB — full CRUD operations!",
        tech: ["Node.js", "Express", "MongoDB"],
        icon: "🔌",
        color: "#f7df1e",
        status: "Completed"
    }
];

function Projects() {
    return (
        <div style={{
            minHeight: "100vh",
            padding: "120px 20px 60px",
            background: "radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 70%)"
        }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: "center", marginBottom: "60px" }}
                >
                    <h1 style={{
                        fontSize: "3rem",
                        background: "linear-gradient(135deg, #6c63ff, #ff6584)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "10px"
                    }}>
                        My Projects 🚀
                    </h1>
                    <p style={{ color: "#aaa", fontSize: "16px" }}>
                        Missions completed on my developer journey!
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "25px"
                }}>
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: `1px solid ${project.color}40`,
                                borderRadius: "16px",
                                padding: "25px",
                                cursor: "pointer",
                                transition: "box-shadow 0.3s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${project.color}30`}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                        >
                            {/* Icon + Status */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "15px"
                            }}>
                                <span style={{ fontSize: "40px" }}>{project.icon}</span>
                                <span style={{
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    background: project.status === "Completed"
                                        ? "rgba(77, 179, 61, 0.2)"
                                        : "rgba(108, 99, 255, 0.2)",
                                    color: project.status === "Completed"
                                        ? "#4db33d"
                                        : "#6c63ff",
                                    border: `1px solid ${project.status === "Completed" ? "#4db33d" : "#6c63ff"}40`
                                }}>
                                    {project.status === "Completed" ? "✅" : "🔧"} {project.status}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 style={{
                                color: project.color,
                                marginBottom: "10px",
                                fontSize: "1.2rem"
                            }}>
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                color: "#aaa",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                marginBottom: "20px"
                            }}>
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px"
                            }}>
                                {project.tech.map((tech, j) => (
                                    <span key={j} style={{
                                        padding: "4px 10px",
                                        background: `${project.color}15`,
                                        border: `1px solid ${project.color}40`,
                                        borderRadius: "10px",
                                        fontSize: "12px",
                                        color: project.color
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Projects;