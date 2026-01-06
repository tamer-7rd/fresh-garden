import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * OptimizedImage Component
 * Provides lazy loading, blur placeholder, and smooth transitions
 * 
 * @param {string} src - Image source
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 * @param {boolean} priority - If true, loads immediately (for above-the-fold images)
 * @param {string} aspectRatio - CSS aspect ratio (e.g., '16/9', '4/3')
 * @param {function} onClick - Click handler
 */
const OptimizedImage = ({
    src,
    alt = '',
    className = '',
    style = {},
    priority = false,
    aspectRatio = 'auto',
    onClick = null,
    objectFit = 'cover'
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const imgRef = useRef(null);

    useEffect(() => {
        if (priority) {
            // Priority images load immediately
            return;
        }

        // Intersection Observer for lazy loading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before image enters viewport
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [priority]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return (
        <div
            ref={imgRef}
            className={`optimized-image-wrapper ${className}`}
            style={{
                position: 'relative',
                overflow: 'hidden',
                aspectRatio: aspectRatio,
                ...style
            }}
            onClick={onClick}
        >
            {/* Blur placeholder */}
            {!isLoaded && (
                <div
                    className="optimized-image-placeholder"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        opacity: 0.1,
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                />
            )}

            {/* Actual image */}
            {isInView && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    onLoad={handleLoad}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: objectFit,
                        display: 'block'
                    }}
                />
            )}
        </div>
    );
};

export default OptimizedImage;
