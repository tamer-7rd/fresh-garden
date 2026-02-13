import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';
import { getVarietiesByKey, getVarietyImageUrl, productIndexToFruitKey } from '../data/fruitVarieties';

const FruitModal = ({ isOpen, onClose, fruitIndex, fruitName }) => {
    const { language } = useLanguage();
    const t = translations[language];
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);
    const [selectedVariety, setSelectedVariety] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const pendingVariety = useRef(null);
    const hasAnimatedChips = useRef(false);

    // Get varieties based on fruit index
    const fruitKey = productIndexToFruitKey[fruitIndex];
    const varieties = getVarietiesByKey(fruitKey);

    // Reset selected variety and chip animation flag when modal opens/closes or fruit changes
    useEffect(() => {
        setSelectedVariety(null);
        hasAnimatedChips.current = false;
    }, [isOpen, fruitIndex]);

    // Smooth crossfade between views
    const switchView = useCallback((variety) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setImageLoaded(false);
        pendingVariety.current = variety;
        // After fade-out completes, swap content
        setTimeout(() => {
            setSelectedVariety(variety);
            // Next frame: start fade-in
            requestAnimationFrame(() => {
                setIsTransitioning(false);
            });
        }, 80);
    }, [isTransitioning]);

    // Preload image on hover for faster loading
    const preloadImage = useCallback((variety) => {
        const url = getVarietyImageUrl(fruitKey, variety);
        if (url) {
            const img = new Image();
            img.src = url;
        }
    }, [fruitKey]);

    // Handle escape key
    const handleEscapeKey = useCallback((e) => {
        if (e.key === 'Escape') {
            if (selectedVariety) {
                switchView(null);
            } else {
                onClose();
            }
        }
    }, [onClose, selectedVariety, switchView]);

    // Handle click outside
    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Body scroll lock and event listeners
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscapeKey);
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 100);
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, handleEscapeKey]);

    // Get image URL for selected variety
    const varietyImageUrl = selectedVariety ? getVarietyImageUrl(fruitKey, selectedVariety) : null;

    // Animation variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: {
                duration: 0.2
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.25, ease: 'easeOut' }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.15 }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleOverlayClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <motion.div
                        ref={modalRef}
                        className={`modal-content ${selectedVariety ? 'modal-content-detail' : ''}`}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            ref={closeButtonRef}
                            className="modal-close-btn"
                            onClick={onClose}
                            aria-label={t.modal?.close || 'Close'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {/* Crossfade wrapper */}
                        <div
                            style={{
                                opacity: isTransitioning ? 0 : 1,
                                transition: 'opacity 0.15s ease'
                            }}
                        >
                            {selectedVariety ? (
                                /* ── Detail View ── */
                                <div className="variety-detail-container">
                                    <h2 className="variety-detail-name">{selectedVariety}</h2>

                                    {varietyImageUrl && (
                                        <div className="variety-detail-image-wrapper">
                                            {!imageLoaded && (
                                                <div className="variety-image-loader">
                                                    <div className="variety-image-spinner" />
                                                </div>
                                            )}
                                            <img
                                                src={varietyImageUrl}
                                                alt={selectedVariety}
                                                className="variety-detail-image"
                                                style={{ opacity: imageLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
                                                onLoad={() => setImageLoaded(true)}
                                            />
                                        </div>
                                    )}

                                    <button
                                        className="variety-return-btn"
                                        onClick={() => switchView(null)}
                                    >
                                        <span className="variety-return-arrow">←</span>
                                        {t.modal?.returnToList || 'Return to varieties'}
                                    </button>
                                </div>
                            ) : (
                                /* ── List View ── */
                                <div>
                                    {/* Modal Header */}
                                    <h2 id="modal-title" className="modal-title">
                                        {fruitName}
                                    </h2>

                                    {/* Varieties Section */}
                                    <div className="modal-section">
                                        <h3 className="modal-section-title">
                                            {t.modal?.varietiesTitle || 'Çeşid'}
                                        </h3>

                                        {varieties.length > 0 ? (
                                            <div className="variety-chips-container">
                                                {varieties.map((variety, index) => (
                                                    <motion.span
                                                        key={index}
                                                        className="variety-chip"
                                                        initial={hasAnimatedChips.current ? false : { opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={hasAnimatedChips.current ? { duration: 0 } : { delay: index * 0.03 }}
                                                        onAnimationComplete={() => {
                                                            if (index === varieties.length - 1) {
                                                                hasAnimatedChips.current = true;
                                                            }
                                                        }}
                                                        onClick={() => switchView(variety)}
                                                        onMouseEnter={() => preloadImage(variety)}
                                                        role="button"
                                                        tabIndex={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                switchView(variety);
                                                            }
                                                        }}
                                                    >
                                                        {variety}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="modal-no-data">
                                                {t.modal?.noData || 'Məlumat yoxdur'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FruitModal;
