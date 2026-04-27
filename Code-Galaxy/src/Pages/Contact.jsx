import { motion } from "framer-motion";
import { useState } from "react";

function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.name || !form.email || !form.message) {
            alert("Please fill all fields!");
            return;
        }
        setSent(true);
    };

    return (
        <div style={{
            minHeight: "100vh",
            padding: "120px 20px 60px",
            background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={{ maxWidth: "600px", width: "100%" }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: "center", marginBottom: "50px" }}
                >
                    <h1 style={{
                        fontSize: "3rem",
                        background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "10px"
                    }}>
                        Contact Me 📡
                    </h1>
                    <p style={{ color: "#aaa" }}>
                        Send a transmission to my space station!
                    </p>
                </motion.div>

                {sent ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            textAlign: "center",
                            padding: "40px",
                            background: "rgba(108, 99, 255, 0.1)",
                            border: "1px solid #6c63ff",
                            borderRadius: "16px"
                        }}
                    >
                        <h2 style={{ fontSize: "4rem" }}>🚀</h2>
                        <h3 style={{ color: "#6c63ff", marginBottom: "10px" }}>
                            Transmission Sent!
                        </h3>
                        <p style={{ color: "#aaa" }}>
                            Thank you {form.name}! I will get back to you soon!
                        </p>
                        <button
                            onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                            style={{
                                marginTop: "20px",
                                padding: "10px 25px",
                                background: "#6c63ff",
                                color: "white",
                                borderRadius: "20px",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Send Another
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSubmit}
                        style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(108, 99, 255, 0.3)",
                            borderRadius: "16px",
                            padding: "40px"
                        }}
                    >
                        {/* Name */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ color: "#aaa", fontSize: "14px", display: "block", marginBottom: "8px" }}>
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Pushpendra Singh"
                                style={{
                                    width: "100%",
                                    padding: "12px 15px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(108, 99, 255, 0.3)",
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ color: "#aaa", fontSize: "14px", display: "block", marginBottom: "8px" }}>
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                style={{
                                    width: "100%",
                                    padding: "12px 15px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(108, 99, 255, 0.3)",
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        {/* Message */}
                        <div style={{ marginBottom: "30px" }}>
                            <label style={{ color: "#aaa", fontSize: "14px", display: "block", marginBottom: "8px" }}>
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Hello Pushpendra! I want to work with you..."
                                rows={5}
                                style={{
                                    width: "100%",
                                    padding: "12px 15px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(108, 99, 255, 0.3)",
                                    borderRadius: "8px",
                                    color: "white",
                                    fontSize: "16px",
                                    outline: "none",
                                    resize: "vertical",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "14px",
                                background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                                color: "white",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                border: "none",
                                transition: "opacity 0.3s"
                            }}
                            onMouseEnter={e => e.target.style.opacity = "0.9"}
                            onMouseLeave={e => e.target.style.opacity = "1"}
                        >
                            🚀 Send Transmission
                        </button>
                    </motion.form>
                )}

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        marginTop: "30px"
                    }}
                >
                    {[
                        { label: "GitHub", icon: "💻" },
                        { label: "LinkedIn", icon: "🔗" },
                        { label: "Twitter", icon: "🐦" }
                    ].map((social, i) => (
                        <button key={i} style={{
                            padding: "10px 20px",
                            background: "rgba(108, 99, 255, 0.1)",
                            border: "1px solid rgba(108, 99, 255, 0.3)",
                            borderRadius: "20px",
                            color: "#aaa",
                            cursor: "pointer",
                            transition: "all 0.3s"
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = "rgba(108, 99, 255, 0.3)";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = "rgba(108, 99, 255, 0.1)";
                            e.target.style.color = "#aaa";
                        }}
                        >
                            {social.icon} {social.label}
                        </button>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;