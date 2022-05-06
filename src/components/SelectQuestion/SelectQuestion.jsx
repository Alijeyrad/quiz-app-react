import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import QuizContext from '../../contexts/QuizContext';

// Because I need this function to go through a forewordRef
// eslint-disable-next-line func-names
const myFunc = function ({ q3 }, ref) {
  const { dispatch } = useContext(QuizContext);

  const handleInputChange = (event) => {
    dispatch({
      type: 'SET-Q3',
      q3: event.target.getAttribute('data-label'),
    });
  };

  return (
    <div ref={ref} className="question">
      <h5 className="card-title mb-3">{q3.title}</h5>
      <div className="card-text d-flex align-items-start flex-column">
        <Form.Check onClick={handleInputChange} type="checkbox" id="a1" label={q3.answers[0]} data-label={q3.answers[0]} />
        <Form.Check onClick={handleInputChange} type="checkbox" id="a2" label={q3.answers[1]} data-label={q3.answers[1]} />
        <Form.Check onClick={handleInputChange} type="checkbox" id="a3" label={q3.answers[2]} data-label={q3.answers[2]} />
        <Form.Check onClick={handleInputChange} type="checkbox" id="a4" label={q3.answers[3]} data-label={q3.answers[3]} />
        <Form.Check onClick={handleInputChange} type="checkbox" id="a5" label={q3.answers[4]} data-label={q3.answers[4]} />
      </div>
    </div>
  );
};

const SelectQuestion = forwardRef(myFunc);

SelectQuestion.propTypes = {
  q3: PropTypes.shape().isRequired,
};

export default SelectQuestion;
