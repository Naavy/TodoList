import React from 'react';
import { shallow } from 'enzyme';
import { Status } from '../../store/types';
import Column from '../Column';

const state = {
    column: {
        id: '1-1',
        title: 'Title test',
        status: 'to do' as Status,
        newItems: [],
        items: [
            {
                id: '2',
                title: 'test title',
                text: 'test text',
                status: 'to do' as Status
            }
        ],
    },
    children: null
};

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));

describe('Column', () => {
    it('should have button active, when newItems in state is empty', () => {
        // when
        const wrapper = shallow(<Column {...state} />);

        // then
        expect(wrapper.find('AddButton').props().disabled).toEqual(false)
    });

    it('should have button disabled, when newItems in state is not empty', () => {
        // given
        const newState = {
            column: {
                ...state.column,
                newItems: [
                    {
                        id: '1',
                        title: 'test title',
                        text: 'test text',
                        status: 'done' as Status
                    }
                ]
            },
            children: null
        }

        // when
        const wrapper = shallow(<Column {...newState} />);

        // then
        expect(wrapper.find('AddButton').props().disabled).toEqual(true)
    });
});
