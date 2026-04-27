import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const stars = [...Array(80)].map((_, i) => ({
    id: i,
    width: Math.random() * 3,
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: Math.random(),
    duration: Math.random() * 3 + 2
}));

const meteors = [...Array(10)].map((_, i) => ({
    id: i,
    startX: Math.random() * 1500,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 6,
    height: Math.random() * 80 + 40
}));

function Home() {
    return (
        <div style={{
            background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
        }}>

            {/* Hero Section */}
            <div id="hero" style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: "0 20px",
                position: "relative",
                overflow: "hidden"
            }}>

                {/* Stars */}
                {stars.map(star => (
                    <div key={star.id} style={{
                        position: "absolute",
                        width: star.width + "px",
                        height: star.width + "px",
                        background: "white",
                        borderRadius: "50%",
                        top: star.top + "%",
                        left: star.left + "%",
                        opacity: star.opacity,
                        animation: `twinkle ${star.duration}s infinite`
                    }} />
                ))}

                {/* Meteors */}
                {meteors.map(meteor => (
                    <motion.div
                        key={meteor.id}
                        initial={{ x: meteor.startX, y: -100, opacity: 1 }}
                        animate={{ x: meteor.startX - 600, y: 1000, opacity: 0 }}
                        transition={{
                            duration: meteor.duration,
                            repeat: Infinity,
                            delay: meteor.delay,
                            ease: "linear"
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "3px",
                            height: meteor.height + "px",
                            background: "linear-gradient(180deg, #ffffff, #6c63ff, transparent)",
                            borderRadius: "2px",
                            zIndex: 0,
                            boxShadow: "0 0 6px #ffffff"
                        }}
                    />
                ))}

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ zIndex: 1 }}
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ color: "#00d4ff", marginBottom: "10px", fontSize: "18px" }}
                    >
                        👋 Hello World! I am
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        style={{
                            fontSize: "clamp(2rem, 6vw, 5rem)",
                            fontWeight: "bold",
                            marginBottom: "20px",
                            background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        Pushpendra Singh
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        style={{
                            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                            color: "#aaa",
                            marginBottom: "50px"
                        }}
                    >
                        🚀 Full Stack Developer | Creator of Nova AI
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        style={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "center",
                            flexWrap: "wrap"
                        }}
                    >
                        <Link to="/projects">
                            <button style={{
                                padding: "14px 35px",
                                background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                                color: "white",
                                borderRadius: "30px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 0 20px rgba(108, 99, 255, 0.4)"
                            }}>
                                🎮 Explore My Galaxy
                            </button>
                        </Link>

                        <Link to="/contact">
                            <button style={{
                                padding: "14px 35px",
                                background: "transparent",
                                color: "white",
                                borderRadius: "30px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                border: "2px solid #6c63ff",
                                cursor: "pointer"
                            }}>
                                📡 Contact Me
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    onClick={() => document.getElementById("preview").scrollIntoView({ behavior: "smooth" })}
                    style={{
                        position: "absolute",
                        bottom: "30px",
                        color: "#aaa",
                        fontSize: "14px",
                        zIndex: 1,
                        cursor: "pointer"
                    }}
                >
                    ↓ Scroll to explore
                </motion.div>
            </div>

            {/* Preview Section */}
            <div id="preview" style={{
                padding: "80px 20px",
                maxWidth: "1000px",
                margin: "0 auto"
            }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        textAlign: "center",
                        fontSize: "2.5rem",
                        marginBottom: "50px",
                        background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    What I Do 🌌
                </motion.h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "25px"
                }}>
                    {[
                        { icon: "⚡", title: "Frontend", desc: "Building beautiful UIs with React and modern CSS" },
                        { icon: "🔧", title: "Backend", desc: "Creating powerful APIs with Node.js and Express" },
                        { icon: "🗄️", title: "Database", desc: "Managing data with MongoDB and Mongoose" },
                        { icon: "🤖", title: "AI", desc: "Building Nova AI — a human-like AI assistant" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            style={{
                                background: "rgba(108, 99, 255, 0.05)",
                                border: "1px solid rgba(108, 99, 255, 0.2)",
                                borderRadius: "16px",
                                padding: "30px",
                                textAlign: "center"
                            }}
                        >
                            <div style={{ fontSize: "40px", marginBottom: "15px" }}>
                                {item.icon}
                            </div>
                            <h3 style={{ color: "#6c63ff", marginBottom: "10px" }}>
                                {item.title}
                            </h3>
                            <p style={{ color: "#aaa", lineHeight: "1.6" }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: "center", marginTop: "60px" }}
                >
                    <Link to="/about">
                        <button style={{
                            padding: "14px 35px",
                            background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                            color: "white",
                            borderRadius: "30px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            border: "none",
                            cursor: "pointer"
                        }}>
                            Learn More About Me 🚀
                        </button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

export default Home;