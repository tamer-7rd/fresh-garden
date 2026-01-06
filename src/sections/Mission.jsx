import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import OptimizedImage from '../components/OptimizedImage';
import { content } from '../content/content';

const Mission = () => {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-[var(--color-primary-light)]/10 rounded-full blur-3xl -z-10"></div>

            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image - Order 2 on mobile, 1 on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1 relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <OptimizedImage
                                src={content.mission.image}
                                alt="Fresh Garden missiyası"
                                className=""
                                style={{ height: '400px' }}
                                objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="text-xl font-bold">🌱 Təbiətdən gələn saflıq</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content - Order 1 on mobile, 2 on desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <SectionTitle
                            title={content.mission.title}
                            center={false}
                        />

                        <div className="text-[var(--color-text-light)] text-lg leading-relaxed whitespace-pre-line font-medium">
                            <p className="mb-6 border-l-4 border-[var(--color-primary)] pl-6 italic text-gray-600">
                                "Biz yalnız meyvə istehsal etmirik – biz insanlara təmiz təbiətin dadını çatdırırıq."
                            </p>
                            {content.mission.text}
                        </div>

                        <div className="grid grid-cols-2 gap-6" style={{ marginTop: '40px' }}>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-extrabold text-[var(--color-primary)]">100%</span>
                                <span className="font-bold text-gray-600">Təbii Məhsul</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl font-extrabold text-[var(--color-primary)]">200+</span>
                                <span className="font-bold text-gray-600">Hektar Sahə</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
