import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import questionList from '../../utils/questions';
import MultipleChoiceQuestion from '../MultipleChoiceQuestion/MultipleChoiceQuestion';
import FullAnswerQuestion from '../FullAnswerQuestion/FullAnswerQuestion';
import SelectQuestion from '../SelectQuestion/SelectQuestion';
import './SingleQuestion.css';

function QuestionTemplate({ number }) {
  // getting thequestions from the list
  const q1 = questionList[0][1];
  const q2 = questionList[0][2];
  const q3 = questionList[0][3];

  const q1Ref = createRef(null);
  const q2Ref = createRef(null);
  const q3Ref = createRef(null);

  // to find out which button shows which question
  const questionRefs = {
    1: q1Ref,
    2: q2Ref,
    3: q3Ref,
  };

  // flip through questions
  useEffect(() => {
    setTimeout(() => {
      Object.keys(questionRefs).forEach((num) => {
        if (parseInt(num, 10) === number) {
          questionRefs[num].current.classList.add('visible');
        } else {
          questionRefs[num].current.classList.remove('visible');
        }
      });
    }, 1);
  }, [number]);

  return (
    <>
      {/* question 1 */}
      <MultipleChoiceQuestion
        ref={q1Ref}
        q1={q1}
      />

      {/* question 2 */}
      <FullAnswerQuestion
        ref={q2Ref}
        q2={q2}
      />

      {/*  question 3 */}
      <SelectQuestion
        ref={q3Ref}
        q3={q3}
      />
    </>
  );
}

QuestionTemplate.propTypes = {
  number: PropTypes.number.isRequired,
};

export default QuestionTemplate;
