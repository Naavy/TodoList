import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DroppableProvided,
    DraggableProvided,
    DropResult,
    ResponderProvided
} from 'react-beautiful-dnd';
import Column from './Column';
import { AppState } from '../store/types';
import TodoCard from './TodoCard';
import NewTodoCard from './NewTodoCard';

function Columns() {
    const todos = useSelector((state: AppState) => state.todos);
    const dispatch = useDispatch();

    const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
        if (!result.destination) return;

        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            dispatch({
                type: 'CHANGE_STATUS',
                payload: {
                    sourceId: source.droppableId,
                    destinationId: destination.droppableId,
                    todoId: result.draggableId,
                    index: result.destination.index
                }
            })
        };
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {todos.map((item, index) => {
                    return (
                        <Droppable droppableId={item.id} key={index}>
                            {(provided: DroppableProvided) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <Column column={item}>
                                        {item.newItems.map((newTodo, index) => {
                                                return (
                                                    <NewTodoCard todo={newTodo} key={index} />
                                                )
                                            })}
                                            {item.items.map((todo, index) => {
                                                return (
                                                    <Draggable
                                                        key={todo.id}
                                                        draggableId={todo.id}
                                                        index={index}
                                                    >
                                                        {(provided: DraggableProvided) => {
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <TodoCard todo={todo} />
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </Column>
                                    </div>
                                )
                            }}
                        </Droppable>
                    )
                })}
            </DragDropContext>
        </>
    );
}

export default Columns
