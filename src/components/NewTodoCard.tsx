import React, { useState } from 'react';
import { TodoType } from '../store/types';
import { useDispatch } from 'react-redux';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
  todo: TodoType;
}

function NewTodoCard(props: Props) {
    const todo = props.todo;
    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');
    const [ showButton, setShowButton ] = useState(false);
    const dispatch = useDispatch();

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value); setShowButton(true)}
    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const addTodo = () => {
        const columnStatus = props.todo.status;
        dispatch({
            type: 'ADD_TODO',
            payload: {
                status: columnStatus,
                newTodo: {
                    id: 'id-' + Math.random() * 100,
                    title: title,
                    text: text,
                    status: props.todo.status
                }
            }
        });
        removeTodo();
    }

    const removeTodo = () => {
        const selectColumnStatus = props.todo.status;
        dispatch({
            type: 'REMOVE_NEW_TODO',
            payload: selectColumnStatus
        })
    }

    return (
        <div className="todoCard">
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <span style={{ fontSize: 20, marginBottom: 20, color: '#6a7d8e' }}>
                    <TextField
                        style={{ margin: 8 }}
                        placeholder="Wpisz tytuł..."
                        fullWidth
                        onChange={changeTitle}
                    />
                    <TextField
                        style={{ margin: 8 }}
                        placeholder="Tutaj wpisz opis..."
                        fullWidth
                        onChange={changeText}
                    />
                </span>
                {todo.status === 'to do' && <span style={{ color: '#e6eaed' }}> <RadioButtonUncheckedIcon fontSize='small' /> </span>}
                {todo.status === 'in progress' && <span style={{ color: '#e7d5a3' }}> <EditIcon fontSize='small' /> </span>}
                {todo.status === 'done' && <span style={{ color: '#63d090' }}> <CheckCircleIcon fontSize='small' /> </span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {showButton &&
                    <IconButton disabled={title === ''} onClick={addTodo} color="primary">
                        <DoneIcon />
                    </IconButton>
                }
                    <IconButton onClick={removeTodo} color="secondary">
                        <ClearIcon />
                    </IconButton>
            </div>
        </div>
    );
}

export default NewTodoCard;