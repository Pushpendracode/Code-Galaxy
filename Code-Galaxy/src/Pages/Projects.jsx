import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "https://code-galaxy-9czh.onrender.com/api/projects";

const ICONS = ["🌌", "📝", "🔌", "✅", "🤖", "🚀", "🛠️", "🌠"];
const COLORS = ["#6c63ff", "#ff6584", "#f7df1e", "#4db33d", "#00d4ff"];

// Separate small component for a project link button.
// Keeping this isolated avoids editor autocomplete issues when pasting <a> tags.
function ProjectLink({ url, label, color, filled }) {
    const baseStyle = {
        padding: "6px 14px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 600,
        textDecoration: "none",
    };

    const filledStyle = { ...baseStyle, background: color, color: "#0a0a0f" };
    const outlineStyle = { ...baseStyle, border: `1px solid ${color}80`, color };

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" style={filled ? filledStyle : outlineStyle}>
            {label}
        </a>
    );
}

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch projects");
                return res.json();
            })
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Could not load projects:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

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

                {/* Loading state */}
                {loading && (
                    <p style={{ textAlign: "center", color: "#aaa" }}>
                        Loading projects from orbit...
                    </p>
                )}

                {/* Error state */}
                {error && (
                    <p style={{ textAlign: "center", color: "#ff6584" }}>
                        Couldn't load projects right now. Please try again shortly.
                    </p>
                )}

                {/* Empty state */}
                {!loading && !error && projects.length === 0 && (
                    <p style={{ textAlign: "center", color: "#aaa" }}>
                        No projects found yet — check back soon!
                    </p>
                )}

                {/* Projects Grid */}
                {!loading && !error && projects.length > 0 && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "25px"
                    }}>
                        {projects.map((project, i) => {
                            const color = COLORS[i % COLORS.length];
                            const icon = ICONS[i % ICONS.length];
                            const isCompleted = !project.status || project.status === "Completed";

                            return (
                                <motion.div
                                    key={project._id || i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: `1px solid ${color}40`,
                                        borderRadius: "16px",
                                        padding: "25px",
                                        cursor: "pointer",
                                        transition: "box-shadow 0.3s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 30px ${color}30`}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                                >
                                    {/* Icon + Status */}
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "15px"
                                    }}>
                                        <span style={{ fontSize: "40px" }}>{icon}</span>
                                        <span style={{
                                            padding: "4px 12px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            background: isCompleted
                                                ? "rgba(77, 179, 61, 0.2)"
                                                : "rgba(108, 99, 255, 0.2)",
                                            color: isCompleted ? "#4db33d" : "#6c63ff",
                                            border: `1px solid ${isCompleted ? "#4db33d" : "#6c63ff"}40`
                                        }}>
                                            {isCompleted ? "✅" : "🔧"} {project.status || "Completed"}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 style={{
                                        color,
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
                                        gap: "8px",
                                        marginBottom: (project.liveLink || project.githubLink) ? "20px" : "0"
                                    }}>
                                        {(project.techStack || []).map((tech, j) => (
                                            <span key={j} style={{
                                                padding: "4px 10px",
                                                background: `${color}15`,
                                                border: `1px solid ${color}40`,
                                                borderRadius: "10px",
                                                fontSize: "12px",
                                                color
                                            }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links — using the ProjectLink component instead of inline <a> tags */}
                                    {(project.liveLink || project.githubLink) && (
                                        <div style={{
                                            display: "flex",
                                            gap: "12px",
                                            flexWrap: "wrap"
                                        }}>
                                            {project.liveLink && (
                                                <ProjectLink url={project.liveLink} label="Live Demo ↗" color={color} filled />
                                            )}
                                            {project.githubLink && (
                                                <ProjectLink url={project.githubLink} label="GitHub ↗" color={color} />
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Projects;