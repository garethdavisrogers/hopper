import React from 'react';
import { shallow, mount, render } from '../../enzyme';
import QuestionsAndAnswers from './QuestionsAndAnswers';
import QuestionSearch from './QuestionSearch';
import PostQuestion from './PostQuestion';
import QuestionView from './QuestionView';
import AnswerQuestion from './AnswerQuestion';
import Question from '.Question.jsx';

describe('<QuestionsAndAnswers/>', () => {
  it('Renders QuestionSearch once', () => {
    const wrapper = shallow(<QuestionsAndAnswers />);
    expect(wrapper.find(QuestionSearch)).toHaveLength(1);
  });
});
describe('<QuestionView/>', () => {
  it('Renders 2 Questions on load', () => {
    const wrapper = shallow(<QuestionView />);
    expect(wrapper.find(Question)).toHaveLength(2);
  });
});
