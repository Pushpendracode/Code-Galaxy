import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
import Certifications from "./Pages/Certifications";
import Contact from "./Pages/Contact";
import CustomCursor from "./Components/CustomCursor";
import ClickEffect from "./Components/ClickEffect";
import LoadingScreen from "./Components/LoadingScreen";
import "./Styles/Globle.css";

function App() {
    return (
        <>
            <CustomCursor />
            <ClickEffect />
            <LoadingScreen />
            <Navbar />

            <section id="home">
                <Home />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="skills">
                <Skills />
            </section>

            <section id="projects">
                <Projects />
            </section>

            <section id="certifications">
                <Certifications />
            </section>

            <section id="contact">
                <Contact />
            </section>
        </>
    );
}

export default App;