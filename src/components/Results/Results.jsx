import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { GoMarkGithub } from 'react-icons/go';
import QuizContext from '../../contexts/QuizContext';
import questionList from '../../utils/questions';
import Spinner from '../Spinner/Spinner';
import './Results.css';

function Results() {
  const {
    name, answer1, answer2, answer3,
  } = useContext(QuizContext);
  const [loading, setLoading] = useState(true);
  const [showResults] = useState(true);
  const resultsRef = useRef(null);
  const seconds = JSON.parse(window.localStorage.getItem('second'));
  const minutes = JSON.parse(window.localStorage.getItem('minute'));

  // animation
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      resultsRef?.current?.classList.add('visible');
    }, 1000);
  }, []);

  return (
    <>
      { loading && <Spinner value="Loading Results..." /> }
      { showResults
    && (
    <div ref={resultsRef} className="results myCard card text-center m-4">
      <div className="card-header d-flex justify-content-center align-items-center flex-row">
        Results
      </div>
      <div className="questionsDiv text-start card-body bg-light bg-gradient d-flex  align-items-center flex-column">

        <h4 className="mb-3 text-center" style={{ fontWeight: '600' }}>
          Thank you for your participation
          {` ${name}`}
        </h4>
        <h4 className="mb-4">Here are your answers:</h4>

        <p className="align-self-start">
          {questionList[0][1].title}
          {' '}
          <span style={{ fontWeight: '600' }}>{answer1}</span>
        </p>

        <p className="align-self-start">
          {questionList[0][2].title}
          {' '}
          <span style={{ fontWeight: '600' }}>{answer2}</span>
        </p>

        <p className="align-self-start">
          {questionList[0][3].title}
          {' '}
          <span style={{ fontWeight: '600' }}>
            {answer3.map((answer) => (`${answer}, `))}
            {!answer3.length && 'No Answer'}
          </span>
        </p>

        <p className="align-self-start align-items-center">
          Time Remaining:
          {'  '}
          <span style={{ fontWeight: '600' }}>
            {`${minutes}:${seconds === '01' ? '00' : seconds}`}
          </span>
        </p>

      </div>
      <div className="card-footer d-flex justify-content-between align-items-center">
        <p className="text-muted d-flex flex-row align-items-center" style={{ margin: '0', fontSize: '15px' }}>
          Developed By Ali
          <a href="https://github.com/Alijeyrad/quiz-app-react" target="_blank" className="ms-2 mb-1" rel="noreferrer">
            <GoMarkGithub />
          </a>
        </p>
        <Button variant="outline-dark">
          <Link to="/quiz-app-react">
            Go Back
          </Link>
        </Button>
      </div>
    </div>
    )}
    </>
  );
}

export default Results;
