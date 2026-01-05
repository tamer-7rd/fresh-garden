import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
    children,
    to,
    href,
    variant = 'primary',
    className = '',
    ...props
}) => {
    // Determine class based on variant
    const variantClass = `btn-${variant}`;

    // Combine all classes
    const combinedStyles = `btn ${variantClass} ${className}`;

    const MotionComponent = motion.create ? motion.create('span') : motion.span;

    if (to) {
        return (
            <Link to={to} className={combinedStyles} {...props}>
                <span className="flex items-center gap-2 whitespace-nowrap">
                    {children}
                </span>
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={combinedStyles} {...props}>
                <span className="flex items-center gap-2 whitespace-nowrap">
                    {children}
                </span>
            </a>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={combinedStyles}
            {...props}
        >
            <span className="flex items-center gap-2 whitespace-nowrap">
                {children}
            </span>
        </motion.button>
    );
};

export default Button;
