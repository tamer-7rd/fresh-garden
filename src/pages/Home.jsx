import SEO from '../components/SEO';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Mission from '../sections/Mission';
import Products from '../sections/Products';
import Gallery from '../sections/Gallery';
import Contact from '../sections/Contact';

const Home = () => {
    return (
        <>
            <SEO page="home" />
            <main>
                <Hero />
                <About />
                <Mission />
                <Products />
                <Gallery />
                <Contact />
            </main>
        </>
    );
};

export default Home;

