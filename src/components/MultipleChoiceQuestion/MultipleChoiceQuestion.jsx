import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import QuizContext from '../../contexts/QuizContext';

// Because I need this function to go through a forewordRef
// eslint-disable-next-line func-names
const myFunc = function ({ q1 }, ref) {
  const { dispatch } = useContext(QuizContext);

  // set answer for question 1
  const handleInputChange = (event) => {
    dispatch({
      type: 'SET-Q1',
      q1: event.target.value,
    });
  };

  return (
    <div ref={ref} className="question">
      <h5 className="card-title mb-3">{q1.title}</h5>
      <div className="card-text d-flex justify-content-center align-items-start flex-column">
        <div className="form-check">
          <input onChange={handleInputChange} className="form-check-input" type="radio" name="firstQuestion" id="q1" value={q1.answers[1]} />
          <label className="form-check-label" htmlFor="q1">
            {q1.answers[1]}
          </label>
        </div>

        <div className="form-check">
          <input onChange={handleInputChange} className="form-check-input" type="radio" name="firstQuestion" id="q2" value={q1.answers[2]} />
          <label className="form-check-label" htmlFor="q2">
            {q1.answers[2]}
          </label>
        </div>

        <div className="form-check">
          <input onChange={handleInputChange} className="form-check-input" type="radio" name="firstQuestion" id="q3" value={q1.answers[3]} />
          <label className="form-check-label" htmlFor="q3">
            {q1.answers[3]}
          </label>
        </div>

        <div className="form-check">
          <input onChange={handleInputChange} className="form-check-input" type="radio" name="firstQuestion" id="q4" value={q1.answers[4]} />
          <label className="form-check-label" htmlFor="q4">
            {q1.answers[4]}
          </label>
        </div>
      </div>
    </div>
  );
};

const MultipleChoiceQuestion = forwardRef(myFunc);

MultipleChoiceQuestion.propTypes = {
  q1: PropTypes.shape().isRequired,
};

export default MultipleChoiceQuestion;
