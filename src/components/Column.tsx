import React  from 'react';
import { useDispatch } from 'react-redux';
import { ColumnType } from '../store/types';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const AddButton = styled(Chip)`
    background-color: #fff !important;
    padding: 16px 10px !important;
    .MuiChip-label {
        color: #80919f;
        font-size: 18px;
    }
    .MuiTouchRipple-root {
        border: 1px solid #eceff1;
    }
`;

AddButton.displayName = "AddButton";

interface Props {
    column: ColumnType;
    children: React.ReactNode;
}

function Column(props: Props) {

    const dispatch = useDispatch();
    const newTodo = () => {
        const action = 'ADD_NEW_TODO';
        const columnId = props.column.id;
        dispatch({
            type: action,
            payload: {
                id: columnId,
                newTodo: {
                    id: 'id-' + Math.random() * 100,
                    title: '',
                    text: '',
                    status: props.column.items[0].status
                }
            }
        });
    }

    return (
        <div className="column">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
                <div>
                    {props.column.title}<span>&nbsp;&nbsp;</span>
                    <span style={{ color: '#8495a3', fontWeight: 600, fontSize: 20 }}>
                        ({props.column.items.length + props.column.newItems.length})
                    </span>
                </div>
                <AddButton
                    label="Dodaj"
                    onDelete={newTodo}
                    deleteIcon={<AddIcon />}
                    clickable
                    variant='outlined'
                    onClick={newTodo}
                    disabled={props.column.newItems.length === 0 ? false : true}
                />
            </div>
            {props.children}
        </div>
    );
}

export default Column;