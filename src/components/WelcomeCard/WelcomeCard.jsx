import React, { useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './WelcomeCard.css';
import Button from 'react-bootstrap/Button';
import QuizContext from '../../contexts/QuizContext';

function WelcomeCard() {
  const startButton = useRef(null);
  const nameInput = useRef(null);
  const cardDivRef = useRef(null);
  // setGoToQuestions (bool) => decides whether continue shows
  // or whether to show start or start again button
  const {
    name, dispatch, goToQuestions, setGoToQuestions,
  } = useContext(QuizContext);

  // animation + disable start button when app starts
  useEffect(() => {
    startButton.current.disabled = true;
    setTimeout(() => {
      cardDivRef.current.classList.add('visible');
    }, 10);
  }, []);

  // enable the start button if name exists
  // set name to localStorage + dispath for reducer
  const handleNameInput = (event) => {
    window.localStorage.clear();
    if (event.target.value) {
      startButton.current.disabled = false;
    } else {
      startButton.current.disabled = true;
    }
    dispatch({
      type: 'SET-NAME',
      name: event.target.value,
    });
    window.localStorage.setItem('name', JSON.stringify(event.target.value));
  };

  // start again button
  const handleStartAgain = () => {
    window.localStorage.clear();
    window.localStorage.setItem('name', JSON.stringify(name));
  };

  // regular start button
  const handleStartButton = () => {
    localStorage.setItem('continue', JSON.stringify(true));
    setGoToQuestions(true);
  };

  return (
    <div ref={cardDivRef} className="welcomeCard myCard card text-center m-4">
      <div className="card-header">
        Welcome
        {` ${name}`}

        {goToQuestions
        && (
        <Button type="button" className="btn-sm btn-success ms-3">
          <Link to="/questions">
            Continue
          </Link>
        </Button>
        )}
      </div>
      <div className="card-body bg-light bg-gradient d-flex justify-content-center align-items-center flex-column">
        <h5 className="card-title mb-3">This quiz has 3 questions</h5>
        <p className="card-text">You&apos;ll have 2 minutes to answer them</p>
        <p className="card-text">Good Luck ;)</p>
        <input ref={nameInput} onChange={handleNameInput} className="nameInput form-control form-control-lg mb-3 " type="text" placeholder="Your Name" />
        <div className="d-flex flex-row">

          {!goToQuestions && (
          <Button onClick={handleStartButton} ref={startButton} type="button" className="btn-lg btn-danger">
            <Link to="/questions">
              Start
            </Link>
          </Button>
          )}

          {goToQuestions
          && (
          <Button onClick={handleStartAgain} ref={startButton} type="button" className="btn-lg btn-danger">
            <Link to="/questions">
              Start Again
            </Link>
          </Button>
          )}

        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
