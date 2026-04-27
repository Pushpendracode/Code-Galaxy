import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("Initializing Galaxy...");

    const loadingTexts = [
        "Initializing Galaxy...",
        "Loading Stars...",
        "Placing Planets...",
        "Launching Rockets...",
        "Welcome to Code Galaxy!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if(prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const index = Math.floor(progress / 25);
        setText(loadingTexts[Math.min(index, loadingTexts.length - 1)]);
    }, [progress]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: "fixed",
                        top: 0, left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "#0a0a0f",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 99999
                    }}
                >
                    {/* Stars background */}
                    {[...Array(50)].map((_, i) => (
                        <div key={i} style={{
                            position: "absolute",
                            width: Math.random() * 3 + "px",
                            height: Math.random() * 3 + "px",
                            background: "white",
                            borderRadius: "50%",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                            opacity: Math.random(),
                            animation: `twinkle ${Math.random() * 3 + 2}s infinite`
                        }} />
                    ))}

                    {/* Logo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: "80px", marginBottom: "20px" }}
                    >
                        🌌
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            fontSize: "2.5rem",
                            background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "10px"
                        }}
                    >
                        Code Galaxy
                    </motion.h1>

                    {/* Loading text */}
                    <motion.p
                        key={text}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            color: "#00d4ff",
                            marginBottom: "30px",
                            fontSize: "14px"
                        }}
                    >
                        {text}
                    </motion.p>

                    {/* Progress bar */}
                    <div style={{
                        width: "300px",
                        height: "6px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "3px",
                        overflow: "hidden",
                        marginBottom: "10px"
                    }}>
                        <motion.div
                            style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "linear-gradient(90deg, #6c63ff, #00d4ff)",
                                borderRadius: "3px",
                                boxShadow: "0 0 10px #6c63ff"
                            }}
                        />
                    </div>

                    {/* Percentage */}
                    <p style={{ color: "#aaa", fontSize: "14px" }}>
                        {progress}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoadingScreen;