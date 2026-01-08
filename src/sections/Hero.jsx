import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { content } from '../content/content';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={false}
                className="h-[65vh] md:h-[85vh] cursor-grab active:cursor-grabbing"
            >
                {t.hero.slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${content.hero.slides[index]?.image})` }}
                            >
                                {/* Overlay - Slightly darker for better text readability */}
                                <div className="absolute inset-0 bg-black/60"></div>
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex items-center">
                                <div className="container">
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 }}
                                        className="max-w-3xl"
                                    >
                                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-12 md:mb-16 leading-tight tracking-tight text-white drop-shadow-md">
                                            {slide.title}
                                        </h2>
                                        <p className="text-lg md:text-2xl text-white mb-16 md:mb-20 font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                                            {slide.subtitle}
                                        </p>

                                        <Button href="#about">
                                            {t.buttons.learnMore}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-white/90 text-sm font-semibold tracking-widest uppercase shadow-sm">{t.buttons.scrollDown}</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-8 h-12 border-2 border-white/80 rounded-full flex justify-center pt-2 backdrop-blur-sm"
                    >
                        <div className="w-1.5 h-3 bg-white rounded-full"></div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
