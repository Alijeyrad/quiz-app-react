const questionList = [{
  1: {
    type: 'multipleChoice',
    title: 'How much do you love React?',
    answers: {
      1: 'Very much',
      2: 'Moderate amount',
      3: "Don't care",
      4: 'Hate it',
    },
  },
  2: {
    type: 'fullAnswer',
    title: 'Explain why you love (or hate) React.',
  },
  3: {
    type: 'choices',
    title: 'Select the technologies you want to learn in the future.',
    answers: ['Vue.js', 'React Native', 'Tailwind CSS', 'TypeScript', 'GraphQL'],
  },
}];

export default questionList;
