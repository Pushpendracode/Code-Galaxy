import { useState, useEffect } from "react";

function ClickEffect() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const distance = 60;
            const newParticles = [...Array(8)].map((_, i) => {
                const angle = (i * 45) * (Math.PI / 180);
                return {
                    id: Date.now() + i,
                    x: e.clientX,
                    y: e.clientY,
                    tx: Math.cos(angle) * distance,
                    ty: Math.sin(angle) * distance,
                    color: i % 2 === 0 ? "#6c63ff" : "#00d4ff"
                };
            });
            setParticles(prev => [...prev, ...newParticles]);
            setTimeout(() => {
                setParticles(prev =>
                    prev.filter(p => !newParticles.find(np => np.id === p.id))
                );
            }, 600);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            {particles.map(particle => (
                <div
                    key={particle.id}
                    style={{
                        position: "fixed",
                        left: particle.x,
                        top: particle.y,
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: particle.color,
                        pointerEvents: "none",
                        zIndex: 9999,
                        boxShadow: `0 0 6px ${particle.color}`,
                        "--tx": `${particle.tx}px`,
                        "--ty": `${particle.ty}px`,
                        animation: "explode 0.6s ease-out forwards"
                    }}
                />
            ))}
        </>
    );
}

export default ClickEffect;