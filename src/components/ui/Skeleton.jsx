import React from 'react';
import PropTypes from 'prop-types';

export const Skeleton = ({ className, ...props }) => {
    return (
        <div
            className={`animate-pulse bg-slate-200/60 rounded-md ${className}`}
            {...props}
        />
    );
};

Skeleton.propTypes = {
    className: PropTypes.string,
};

export default Skeleton;
