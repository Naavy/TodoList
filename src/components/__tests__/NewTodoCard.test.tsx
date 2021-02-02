import React from 'react';
import { shallow } from 'enzyme';
import { Status } from '../../store/types';
import IconButton from '@material-ui/core/IconButton';
import NewTodoCard from '../NewTodoCard';

const state = {
    todo: {
        id: '1',
        title: 'test title',
        text: 'test text',
        status: 'to do' as Status
    }
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('NewTodoCard', () => {
    it('should call dispatch function, when click close button', () => {
    // given
    const wrapper = shallow(<NewTodoCard {...state} />);

    // when
    wrapper.find(IconButton).at(0).simulate('click');

    // then
    expect(mockDispatch).toHaveBeenCalled();
    });
});