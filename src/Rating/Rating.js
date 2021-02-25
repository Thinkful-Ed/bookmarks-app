import React from 'react';
import './Rating.css';
import PropTypes from 'prop-types';

export default function Rating(props) {
  const stars = [0, 0, 0, 0, 0].map((_, i) =>
    (i < props.value)
      ? <span key={i}>&#9733; </span>
      : <span key={i}>&#9734; </span>
  );
  return (
    <div className="rating">
      {stars}
    </div>
  );
}

Rating.propTypes = {
  value: (props, propName, componentName) => {
    // first get the value of the prop
    const prop = props[propName];

    // since we want to make this required let us check that first
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }

    // the prop has a value let's check the type
    if (typeof prop != 'number') {
      return new Error(`Invalid prop, ${propName} is expected to be a number in ${componentName}. ${typeof prop} found.`);
    }

    // the prop is a number let us check the range
    if(prop < 1 || prop > 5) {
      return new Error(`Invalid prop, ${propName} should be in range 1 - 5 in ${componentName}. ${prop} found.`);
    }

  }
};

Rating.defaultProps = {
  value: 1
};