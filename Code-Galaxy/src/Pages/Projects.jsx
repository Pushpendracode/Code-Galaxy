import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "https://code-galaxy-9czh.onrender.com/api/projects";

const ICONS = ["🌌", "📝", "🔌", "✅", "🤖", "🚀", "🛠️", "🌠"];
const COLORS = ["#6c63ff", "#ff6584", "#f7df1e", "#4db33d", "#00d4ff"];

function ProjectLink({ url, label, color, filled }) {
    const baseStyle = {
        padding: "6px 14px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: 600,
        textDecoration: "none",
    };

    const filledStyle = {
        ...baseStyle,
        background: color,
        color: "#0a0a0f",
    };

    const outlineStyle = {
        ...baseStyle,
        border: `1px solid ${color}80`,
        color,
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={filled ? filledStyle : outlineStyle}
        >
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
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }

                return res.json();
            })
            .then((data) => {
                console.log("Projects API response:", data);

                // Make sure we always store an array
                if (Array.isArray(data)) {
                    setProjects(data);
                } else if (Array.isArray(data.projects)) {
                    setProjects(data.projects);
                } else {
                    console.error("Unexpected API response:", data);
                    setProjects([]);
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Could not load projects:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Safely convert any value into something React can render
    const renderValue = (value) => {
        if (value === null || value === undefined) {
            return "";
        }

        if (typeof value === "string" || typeof value === "number") {
            return value;
        }

        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        if (Array.isArray(value)) {
            return value
                .map((item) => {
                    if (typeof item === "object" && item !== null) {
                        return (
                            item.name ||
                            item.title ||
                            item.label ||
                            item.value ||
                            ""
                        );
                    }

                    return item;
                })
                .filter(Boolean)
                .join(", ");
        }

        if (typeof value === "object") {
            return (
                value.name ||
                value.title ||
                value.label ||
                value.value ||
                ""
            );
        }

        return String(value);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "120px 20px 60px",
                background:
                    "radial-gradient(ellipse at bottom, #1a1a2e 0%, #0a0a0f 70%)",
            }}
        >
            <div
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                }}
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        textAlign: "center",
                        marginBottom: "60px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "3rem",
                            background:
                                "linear-gradient(135deg, #6c63ff, #ff6584)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "10px",
                        }}
                    >
                        My Projects 🚀
                    </h1>

                    <p
                        style={{
                            color: "#aaa",
                            fontSize: "16px",
                        }}
                    >
                        Missions completed on my developer journey!
                    </p>
                </motion.div>

                {/* Loading */}
                {loading && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "#aaa",
                        }}
                    >
                        Loading projects from orbit...
                    </p>
                )}

                {/* Error */}
                {error && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "#ff6584",
                        }}
                    >
                        Couldn't load projects right now. Please try again
                        shortly.
                    </p>
                )}

                {/* Empty */}
                {!loading && !error && projects.length === 0 && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "#aaa",
                        }}
                    >
                        No projects found yet — check back soon!
                    </p>
                )}

                {/* Projects */}
                {!loading && !error && projects.length > 0 && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "25px",
                        }}
                    >
                        {projects.map((project, i) => {
                            const color = COLORS[i % COLORS.length];
                            const icon = ICONS[i % ICONS.length];

                            const status = renderValue(project.status);

                            const isCompleted =
                                !status || status === "Completed";

                            /*
                             * Safely handle techStack whether the API
                             * returns:
                             *
                             * ["React", "Node.js"]
                             *
                             * OR
                             *
                             * [{ name: "React" }, { name: "Node.js" }]
                             */
                            const techStack = Array.isArray(project.techStack)
                                ? project.techStack
                                : [];

                            return (
                                <motion.div
                                    key={project._id || i}
                                    initial={{
                                        opacity: 0,
                                        y: 30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: i * 0.15,
                                    }}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                    }}
                                    style={{
                                        background:
                                            "rgba(255,255,255,0.03)",
                                        border: `1px solid ${color}40`,
                                        borderRadius: "16px",
                                        padding: "25px",
                                        cursor: "pointer",
                                        transition:
                                            "box-shadow 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = `0 0 30px ${color}30`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow =
                                            "none";
                                    }}
                                >
                                    {/* Top Section */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems: "center",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "40px",
                                            }}
                                        >
                                            {icon}
                                        </span>

                                        <span
                                            style={{
                                                padding: "4px 12px",
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                background:
                                                    isCompleted
                                                        ? "rgba(77, 179, 61, 0.2)"
                                                        : "rgba(108, 99, 255, 0.2)",
                                                color: isCompleted
                                                    ? "#4db33d"
                                                    : "#6c63ff",
                                                border: `1px solid ${
                                                    isCompleted
                                                        ? "#4db33d"
                                                        : "#6c63ff"
                                                }40`,
                                            }}
                                        >
                                            {isCompleted
                                                ? "✅"
                                                : "🔧"}{" "}
                                            {status || "Completed"}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        style={{
                                            color,
                                            marginBottom: "10px",
                                            fontSize: "1.2rem",
                                        }}
                                    >
                                        {renderValue(project.title)}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        style={{
                                            color: "#aaa",
                                            fontSize: "14px",
                                            lineHeight: "1.6",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {renderValue(project.description)}
                                    </p>

                                    {/* Tech Stack */}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "8px",
                                            marginBottom:
                                                project.liveLink ||
                                                project.frontendGithubLink ||
                                                project.backendGithubLink
                                                    ? "20px"
                                                    : "0",
                                        }}
                                    >
                                        {techStack.map((tech, j) => {
                                            const techName =
                                                typeof tech === "object" &&
                                                tech !== null
                                                    ? tech.name ||
                                                      tech.title ||
                                                      tech.label ||
                                                      tech.value ||
                                                      ""
                                                    : tech;

                                            if (!techName) {
                                                return null;
                                            }

                                            return (
                                                <span
                                                    key={j}
                                                    style={{
                                                        padding:
                                                            "4px 10px",
                                                        background: `${color}15`,
                                                        border: `1px solid ${color}40`,
                                                        borderRadius:
                                                            "10px",
                                                        fontSize: "12px",
                                                        color,
                                                    }}
                                                >
                                                    {String(techName)}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* Links */}
                                    {(project.liveLink ||
                                        project.frontendGithubLink ||
                                        project.backendGithubLink) && (
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "12px",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {/* Live Demo */}
                                            {project.liveLink && (
                                                <ProjectLink
                                                    url={String(
                                                        project.liveLink
                                                    )}
                                                    label="Live Demo ↗"
                                                    color={color}
                                                    filled
                                                />
                                            )}

                                            {/* Frontend */}
                                            {project.frontendGithubLink && (
                                                <ProjectLink
                                                    url={String(
                                                        project.frontendGithubLink
                                                    )}
                                                    label="Frontend ↗"
                                                    color={color}
                                                />
                                            )}

                                            {/* Backend */}
                                            {project.backendGithubLink &&
                                                project.backendGithubLink !==
                                                    project.frontendGithubLink && (
                                                    <ProjectLink
                                                        url={String(
                                                            project.backendGithubLink
                                                        )}
                                                        label="Backend ↗"
                                                        color={color}
                                                    />
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