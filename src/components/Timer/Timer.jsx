/* eslint-disable prefer-const */
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import QuizContext from '../../contexts/QuizContext';

function Timer() {
  // get second and minute from localStorage if exist
  let [minute, setMinute] = useState(
    window.localStorage.getItem('minute') ? JSON.parse(window.localStorage.getItem('minute')) : '02',
  );
  let [second, setSecond] = useState(
    window.localStorage.getItem('second') ? JSON.parse(window.localStorage.getItem('second')) : '00',
  );
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const timerDiv = useRef(null);
  const { dispatch } = useContext(QuizContext);

  // start the timer
  useEffect(() => {
    setStart(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (parseInt(second, 10) === 0) {
        setSecond('59');
        setMinute((parseInt(minute, 10) - 1).toString().padStart(2, 0));
      } else {
        setSecond((parseInt(second, 10) - 1).toString().padStart(2, 0));
      }
      if (parseInt(second, 10) === 1 && parseInt(minute, 10) === 0) {
        setCount(count);
        // end of timer logic goes here
        dispatch({
          type: 'SUBMITTED',
        });
      } else {
        setCount(count + 1);
      }
    }, 1000);
  }, [start, count]);

  // turn timer red when less than 10 seconds remain
  // and set time to localStorage
  useEffect(() => {
    if (parseInt(second, 10) < 10 && parseInt(minute, 10) < 1) {
      timerDiv.current.classList.add('text-danger');
    }
    window.localStorage.setItem('second', JSON.stringify(second));
    window.localStorage.setItem('minute', JSON.stringify(minute));
  }, [count]);

  return (
    <div ref={timerDiv} className="timer">
      {`${minute}:${second}`}
    </div>
  );
}

export default Timer;
