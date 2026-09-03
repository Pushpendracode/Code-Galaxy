import { useEffect, useState } from "react";

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
        display: "inline-block",
        transition: "all 0.25s ease",
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
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 5px 20px ${color}40`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
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
        const loadProjects = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }

                const data = await response.json();

                console.log("Projects API response:", data);

                if (Array.isArray(data)) {
                    setProjects(data);
                } else if (Array.isArray(data.projects)) {
                    setProjects(data.projects);
                } else {
                    console.error("Unexpected projects response:", data);
                    setProjects([]);
                }
            } catch (err) {
                console.error("Could not load projects:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const getSafeValue = (value) => {
        if (value === null || value === undefined) {
            return "";
        }

        if (
            typeof value === "string" ||
            typeof value === "number"
        ) {
            return value;
        }

        if (typeof value === "boolean") {
            return value ? "Yes" : "No";
        }

        if (Array.isArray(value)) {
            return value
                .map((item) => {
                    if (
                        item !== null &&
                        typeof item === "object"
                    ) {
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
                {/* PAGE HEADER */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "60px",
                        animation: "projectsFadeDown 0.8s ease forwards",
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
                </div>

                {/* LOADING */}
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

                {/* ERROR */}
                {error && (
                    <p
                        style={{
                            textAlign: "center",
                            color: "#ff6584",
                        }}
                    >
                        Couldn't load projects right now. Please try
                        again shortly.
                    </p>
                )}

                {/* EMPTY */}
                {!loading &&
                    !error &&
                    projects.length === 0 && (
                        <p
                            style={{
                                textAlign: "center",
                                color: "#aaa",
                            }}
                        >
                            No projects found yet — check back soon!
                        </p>
                    )}

                {/* PROJECT GRID */}
                {!loading &&
                    !error &&
                    projects.length > 0 && (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: "25px",
                            }}
                        >
                            {projects.map((project, i) => {
                                const color =
                                    COLORS[i % COLORS.length];

                                const icon =
                                    ICONS[i % ICONS.length];

                                const status = getSafeValue(
                                    project.status
                                );

                                const title = getSafeValue(
                                    project.title
                                );

                                const description =
                                    getSafeValue(
                                        project.description
                                    );

                                const isCompleted =
                                    !status ||
                                    status === "Completed";

                                const techStack =
                                    Array.isArray(
                                        project.techStack
                                    )
                                        ? project.techStack
                                        : [];

                                return (
                                    <div
                                        key={
                                            project._id ||
                                            project.id ||
                                            i
                                        }
                                        style={{
                                            background:
                                                "rgba(255,255,255,0.03)",
                                            border: `1px solid ${color}40`,
                                            borderRadius: "16px",
                                            padding: "25px",
                                            cursor: "pointer",
                                            transition:
                                                "all 0.3s ease",
                                            animation: `projectFadeUp 0.7s ease ${
                                                i * 0.1
                                            }s both`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(-10px) scale(1.02)";

                                            e.currentTarget.style.boxShadow = `0 0 30px ${color}30`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(0) scale(1)";

                                            e.currentTarget.style.boxShadow =
                                                "none";
                                        }}
                                    >
                                        {/* TOP SECTION */}
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "center",
                                                marginBottom:
                                                    "15px",
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
                                                    padding:
                                                        "4px 12px",
                                                    borderRadius:
                                                        "20px",
                                                    fontSize:
                                                        "12px",
                                                    background:
                                                        isCompleted
                                                            ? "rgba(77, 179, 61, 0.2)"
                                                            : "rgba(108, 99, 255, 0.2)",
                                                    color:
                                                        isCompleted
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
                                                {status ||
                                                    "Completed"}
                                            </span>
                                        </div>

                                        {/* TITLE */}
                                        <h3
                                            style={{
                                                color,
                                                marginBottom:
                                                    "10px",
                                                fontSize:
                                                    "1.2rem",
                                            }}
                                        >
                                            {title}
                                        </h3>

                                        {/* DESCRIPTION */}
                                        <p
                                            style={{
                                                color: "#aaa",
                                                fontSize: "14px",
                                                lineHeight: "1.6",
                                                marginBottom:
                                                    "20px",
                                            }}
                                        >
                                            {description}
                                        </p>

                                        {/* TECH STACK */}
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap:
                                                    "wrap",
                                                gap: "8px",
                                                marginBottom:
                                                    project.liveLink ||
                                                    project.frontendGithubLink ||
                                                    project.backendGithubLink
                                                        ? "20px"
                                                        : "0",
                                            }}
                                        >
                                            {techStack.map(
                                                (tech, j) => {
                                                    let techName;

                                                    if (
                                                        tech !==
                                                            null &&
                                                        typeof tech ===
                                                            "object"
                                                    ) {
                                                        techName =
                                                            tech.name ||
                                                            tech.title ||
                                                            tech.label ||
                                                            tech.value ||
                                                            "";
                                                    } else {
                                                        techName =
                                                            tech;
                                                    }

                                                    if (
                                                        !techName
                                                    ) {
                                                        return null;
                                                    }

                                                    return (
                                                        <span
                                                            key={
                                                                j
                                                            }
                                                            style={{
                                                                padding:
                                                                    "4px 10px",
                                                                background: `${color}15`,
                                                                border: `1px solid ${color}40`,
                                                                borderRadius:
                                                                    "10px",
                                                                fontSize:
                                                                    "12px",
                                                                color,
                                                            }}
                                                        >
                                                            {String(
                                                                techName
                                                            )}
                                                        </span>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {/* LINKS */}
                                        {(project.liveLink ||
                                            project.frontendGithubLink ||
                                            project.backendGithubLink) && (
                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    gap: "12px",
                                                    flexWrap:
                                                        "wrap",
                                                }}
                                            >
                                                {project.liveLink && (
                                                    <ProjectLink
                                                        url={String(
                                                            project.liveLink
                                                        )}
                                                        label="Live Demo ↗"
                                                        color={
                                                            color
                                                        }
                                                        filled
                                                    />
                                                )}

                                                {project.frontendGithubLink && (
                                                    <ProjectLink
                                                        url={String(
                                                            project.frontendGithubLink
                                                        )}
                                                        label="Source Code ↗"
                                                        color={
                                                            color
                                                        }
                                                    />
                                                )}

                                                {project.backendGithubLink &&
                                                    project.backendGithubLink !==
                                                        project.frontendGithubLink && (
                                                        <ProjectLink
                                                            url={String(
                                                                project.backendGithubLink
                                                            )}
                                                            label="Backend ↗"
                                                            color={
                                                                color
                                                            }
                                                        />
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
            </div>

            {/* CSS ANIMATIONS */}
            <style>
                {`
                    @keyframes projectsFadeDown {
                        from {
                            opacity: 0;
                            transform: translateY(-30px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes projectFadeUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Projects;