import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import QuizContext from '../../contexts/QuizContext';

// Because I need this function to go through a forewordRef
// eslint-disable-next-line func-names
const myFunc = function ({ q2 }, ref) {
  const { dispatch } = useContext(QuizContext);

  // set answer for question 2
  const handleInputChange = (event) => {
    dispatch({
      type: 'SET-Q2',
      q2: event.target.value,
    });
  };

  return (
    <div ref={ref} className="question">
      <h5 className="card-title mb-3">{q2.title}</h5>
      <div className="card-text d-flex align-items-start flex-column">
        <div className="mb-3 w-100">
          <Form.Control onChange={handleInputChange} className="w-100" as="textarea" rows={3} placeholder="Type your answer here" />
        </div>
      </div>
    </div>
  );
};

// this is where the component will go through forwardRef
const FullAnswerQuestion = forwardRef(myFunc);

FullAnswerQuestion.propTypes = {
  q2: PropTypes.shape().isRequired,
};

export default FullAnswerQuestion;
