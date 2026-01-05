import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, light = false, center = true, underline = true }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
        >
            <h2
                className={`text-3xl md:text-4xl font-extrabold mb-4 tracking-tight ${light ? 'text-white' : 'text-[var(--color-text)]'
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`text-lg md:text-xl font-medium max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/90' : 'text-[var(--color-text-light)]'
                        }`}
                >
                    {subtitle}
                </p>
            )}

            {/* Underline */}
            {underline && (
                <div
                    className={`section-underline ${center ? 'centered' : ''}`}
                    style={{
                        backgroundColor: light ? '#ffffff' : 'var(--color-primary)'
                    }}
                ></div>
            )}
        </motion.div>
    );
};

export default SectionTitle;
