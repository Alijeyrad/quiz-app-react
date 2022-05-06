const quizReducer = (state, action) => {
  const q3Arr = state.q3;

  switch (action.type) {
    case 'SET-NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET-Q1':
      return {
        ...state,
        q1: action.q1,
      };
    case 'SET-Q2':
      if (!action.q2) {
        return {
          ...state,
          q2: 'No Answer',
        };
      }
      return {
        ...state,
        q2: action.q2,
      };

    case 'SET-Q3':
      if (state.q3.includes(action.q3)) {
        q3Arr.splice(q3Arr.indexOf(action.q3), 1);
        return {
          ...state,
          q3: [...q3Arr],
        };
      }
      return {
        ...state,
        q3: [...state.q3, action.q3],
      };

    case 'SUBMITTED':
      window.localStorage.setItem('submitted', JSON.stringify(true));
      return {
        ...state,
        submitted: true,
      };

    case 'SUBMITTED-FALSE':
      return {
        ...state,
        submitted: false,
      };

    default:
      return { ...state };
  }
};

export default quizReducer;
