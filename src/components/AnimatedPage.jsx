import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const animations = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

AnimatedPage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AnimatedPage;
