import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2500);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    exit={{ opacity: 0 }}
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
                    <motion.h1
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            fontSize: "3rem",
                            background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                    >
                        🌌 Code Galaxy
                    </motion.h1>
                    <p style={{ color: "#aaa", marginTop: "20px" }}>
                        Loading your universe...
                    </p>
                    <div style={{
                        marginTop: "30px",
                        width: "200px",
                        height: "4px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "2px",
                        overflow: "hidden"
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5 }}
                            style={{
                                height: "100%",
                                background: "linear-gradient(90deg, #6c63ff, #00d4ff)",
                                borderRadius: "2px"
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LoadingScreen;