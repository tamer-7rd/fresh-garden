import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { content } from '../content/content';

// Import Swiper styles
import 'swiper/css';

const Gallery = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-text)]" style={{ marginBottom: '20px' }}>
                        {content.gallery.title}
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-[var(--color-text-light)]">
                        Bağlarımızdan görüntülər
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.2,
                            centeredSlides: false,
                        },
                        768: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                        1280: {
                            slidesPerView: 5,
                            centeredSlides: false,
                        },
                    }}
                    className="gallery-swiper px-4"
                >
                    {content.gallery.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
                            >
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    style={{ height: '512px' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <span className="text-sm font-medium">Fresh Garden</span>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </section>
    );
};

export default Gallery;
