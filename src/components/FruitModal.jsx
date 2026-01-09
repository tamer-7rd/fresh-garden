import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../content/translations';
import { getVarietiesByKey, productIndexToFruitKey } from '../data/fruitVarieties';

const FruitModal = ({ isOpen, onClose, fruitIndex, fruitName }) => {
    const { language } = useLanguage();
    const t = translations[language];
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    // Get varieties based on fruit index
    const fruitKey = productIndexToFruitKey[fruitIndex];
    const varieties = getVarietiesByKey(fruitKey);

    // Handle escape key
    const handleEscapeKey = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // Handle click outside
    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    // Body scroll lock and event listeners
    useEffect(() => {
        if (isOpen) {
            // Lock body scroll
            document.body.style.overflow = 'hidden';

            // Add escape key listener
            document.addEventListener('keydown', handleEscapeKey);

            // Focus on modal for accessibility
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 100);
        } else {
            // Restore body scroll
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, handleEscapeKey]);

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
                        className="modal-content"
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
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.03 }}
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
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FruitModal;
