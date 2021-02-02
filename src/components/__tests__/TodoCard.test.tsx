import React from 'react';
import { shallow } from 'enzyme';
import { Status } from '../../store/types';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import TodoCard from '../TodoCard';

describe("TodoCard", () => {
    it("should show to EditIcon, when status of todo is 'in progress'", () => {
        // given
        const state = {
            todo: {
                id: '1',
                title: 'test title',
                text: 'test text',
                status: 'in progress' as Status
            }
        };
        // when
        const wrapper = shallow(<TodoCard {...state} />);

        // then
        wrapper.find(EditIcon);
        expect(wrapper.find(EditIcon).length).toBe(1);
        expect(wrapper.find(RadioButtonUncheckedIcon).length).toBe(0);
        expect(wrapper.find(CheckCircleIcon).length).toBe(0);
    });
});