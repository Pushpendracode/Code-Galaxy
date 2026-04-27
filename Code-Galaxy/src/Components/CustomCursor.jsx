import { useState, useEffect } from "react";

function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setTrail(prev => [
                { x: e.clientX, y: e.clientY, id: Date.now() },
                ...prev.slice(0, 8)
            ]);
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <>
            {/* Main cursor */}
            <div style={{
                position: "fixed",
                left: position.x - 10,
                top: position.y - 10,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(108, 99, 255, 0.8)",
                pointerEvents: "none",
                zIndex: 9999,
                boxShadow: "0 0 10px #6c63ff",
                transition: "transform 0.1s"
            }} />

            {/* Star trail */}
            {trail.map((point, i) => (
                <div
                    key={point.id}
                    style={{
                        position: "fixed",
                        left: point.x - 4,
                        top: point.y - 4,
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: i % 2 === 0 ? "#6c63ff" : "#00d4ff",
                        pointerEvents: "none",
                        zIndex: 9998,
                        opacity: 1 - (i * 0.12),
                        transform: `scale(${1 - i * 0.1})`,
                        boxShadow: `0 0 4px ${i % 2 === 0 ? "#6c63ff" : "#00d4ff"}`
                    }}
                />
            ))}
        </>
    );
}

export default CustomCursor;