import React from 'react';
import { TodoType } from '../store/types';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
  todo: TodoType;
}

function TodoCard(props: Props) {
    const todo = props.todo;

    return (
        <div className="todoCard">
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <span style={{ fontSize: 20, marginBottom: 20 }}>
                    {todo.title}
                </span>
                {todo.status === 'to do' && <span style={{ color: '#e6eaed' }}> <RadioButtonUncheckedIcon fontSize='small' /> </span>}
                {todo.status === 'in progress' && <span style={{ color: '#e7d5a3' }}> <EditIcon fontSize='small' /> </span>}
                {todo.status === 'done' && <span style={{ color: '#63d090' }}> <CheckCircleIcon fontSize='small' /> </span>}
            </div>
            <div style={{ fontSize: 14 }}>
                {props.todo.text}
            </div>
        </div>
    );
}

export default TodoCard;