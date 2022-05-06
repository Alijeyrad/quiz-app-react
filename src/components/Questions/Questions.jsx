import React, {
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import './Questions.css';
import Button from 'react-bootstrap/Button';
import Timer from '../Timer/Timer';
import Results from '../Results/Results';
import Spinner from '../Spinner/Spinner';
import SingleQuestion from '../SingleQuestion/SingleQuestion';
import QuizContext from '../../contexts/QuizContext';

function Questions() {
  const questionsDiv = useRef(null);
  const [loading, setLoading] = useState(true);
  const [qNumber, setQNumber] = useState(1); // number of the question to load
  const [btn, setBtn] = useState(1); // pagination buttons
  const {
    dispatch, submitted, answer1, answer2, answer3,
  } = useContext(QuizContext);
  // submitted (bool) is used to figure out if we show the questions or results
  const localSubmitted = window.localStorage?.getItem('submitted');

  // animation effect
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      questionsDiv?.current?.classList.add('active');
    }, 1000);
  }, []);

  const handleNumberButton = (event) => {
    setBtn(parseInt(event.target.innerHTML, 10));
    setQNumber(parseInt(event.target.innerHTML, 10));
  };

  const handleSubmit = () => {
    dispatch({
      type: 'SUBMITTED',
    });
    window.localStorage.setItem('q1', JSON.stringify(answer1));
    window.localStorage.setItem('q2', JSON.stringify(answer2));
    window.localStorage.setItem('q3', JSON.stringify(answer3));
    window.localStorage.setItem('submitted', JSON.stringify(true));
    // if submitted is not false from here => the start again button won't work
    dispatch({
      type: 'SUBMITTED-FALSE',
    });
  };

  return (
    <>
      {loading
      && (
      <Spinner value="Preparing the questions..." />
      )}

      {(submitted || localSubmitted) && !loading && <Results />}

      {!(submitted || localSubmitted) && (
      <div ref={questionsDiv} className="questions">
        <div className="myCard card text-center m-4">
          <div className="card-header d-flex justify-content-between align-items-center flex-row">
            <Timer />
            <Button onClick={handleSubmit} variant="success">
              Submit
            </Button>
          </div>
          <div className="questionsDiv text-start card-body bg-light bg-gradient d-flex justify-content-center align-items-center flex-column">

            <SingleQuestion
              number={qNumber}
            />

          </div>
          <div className="card-footer d-flex justify-content-center">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group" role="group">
                <Button onClick={handleNumberButton} variant="outline-dark" active={btn === 1}>1</Button>
                <Button onClick={handleNumberButton} variant="outline-dark" active={btn === 2}>2</Button>
                <Button onClick={handleNumberButton} variant="outline-dark" active={btn === 3}>3</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Questions;
