import React, {
  useEffect,
  useState,
  useReducer,
  useMemo,
} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import WelcomeCard from '../WelcomeCard/WelcomeCard';
import Spinner from '../Spinner/Spinner';
import Questions from '../Questions/Questions';
import quizReducer from '../../reducers/quiz.reducer';
import QuizContext from '../../contexts/QuizContext';

function App() {
  let localName = '';
  let localSubmitted = false;
  const [loaded, setLoaded] = useState(false);
  const [goToQuestions, setGoToQuestions] = useState(
    !!window.localStorage?.getItem('name'),
  );
  const [state, dispatch] = useReducer(quizReducer, {
    // reducer initial state
    name: localName,
    q1: 'No Answer',
    q2: 'No Answer',
    q3: [],
    submitted: localSubmitted,
  });

  // get values { name, submitted } from localStorage
  useEffect(() => {
    if (window.localStorage?.getItem('name')) {
      localName = JSON.parse(window.localStorage.getItem('name'));
      dispatch({
        type: 'SET-NAME',
        name: localName,
      });
    }
    if (window.localStorage?.getItem('submitted')) {
      localSubmitted = true;
    }
  }, []);

  // memo to send values through context
  const value = useMemo(() => ({
    name: state.name,
    answer1: state.q1,
    answer2: state.q2,
    answer3: state.q3,
    dispatch,
    submitted: state.submitted,
    goToQuestions,
    setGoToQuestions,
  }), [state.name, state.q1, state.q2,
    state.q3, state.submitted, localName,
    localSubmitted, goToQuestions]);

  // just to show off the loader :)
  useEffect(() => {
    setTimeout(() => (setLoaded(true)), 2000);
  }, []);

  return (
    <div className="App text-center d-flex justify-content-center align-items-center flex-column">

      {loaded
        && (
        <QuizContext.Provider value={value}>
          <BrowserRouter>
            <Switch>

              <Route exact path="/quiz-app-react">
                <WelcomeCard />
              </Route>

              <Route path="/questions">
                <Questions />
              </Route>

            </Switch>
          </BrowserRouter>
        </QuizContext.Provider>
        )}

      {!loaded
        && (
        <Spinner />
        )}

    </div>
  );
}

export default App;
