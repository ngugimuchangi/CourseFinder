import Header from "./header/Header";
import Features from "./features/Features";
import About from "./about/About";
import Contact from "./contact/Contact";
import Footer from './footer/Footer';


function Home() {
        return (
                <div className="container">
                        <Header />
                        <Features />
                        <About />
                        <Contact />
                        <Footer />
                </div>
        );
}

export default Home;