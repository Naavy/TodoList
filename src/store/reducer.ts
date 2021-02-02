import { Reducer } from 'redux';
import { AppState, Status } from './types';

const initialState = {
    todos: [
        {
            id: '1-1',
            title: 'Do zrobienia',
            status: 'to do' as Status,
            newItems: [],
            items: [
                {
                    id: '1',
                    title: 'Poprawki karta',
                    text: 'Wprowadzenie poprawek na karcie',
                    status: 'to do' as Status
                },
                {
                    id: '2',
                    title: 'Komponenty dla Mobi',
                    text: 'Dodanie brakujących komponentów',
                    status: 'to do' as Status
                }
            ]
        },
        {
            id: '1-2',
            title: 'W trakcie',
            status: 'in progress' as Status,
            newItems: [],
            items: [
                {
                    id: '3',
                    title: 'Poprawki dokumenty',
                    text: 'Wprowadzenie optyalizacji w wyświetlaniu dokumentów',
                    status: 'in progress' as Status
                },
                {
                    id: '4',
                    title: 'Tablica dokumentów',
                    text: 'Zaprojektowanie tablicy dokumnetów',
                    status: 'in progress' as Status
                }
            ]
        },
        {
            id: '1-3',
            title: 'Zrobione',
            status: 'done' as Status,
            newItems: [],
            items: [
                {
                    id: '5',
                    title: 'Test A/B',
                    text: 'Przeprowadzenie testów A/B',
                    status: 'done' as Status
                }
            ]
        }
    ],
};

const reducer: Reducer<AppState> = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            const columnStatus = state.todos.find((item) => item.status === action.payload.status);
            if (columnStatus) {
                const index = state.todos.indexOf(columnStatus);
                state.todos[index].items.unshift(action.payload.newTodo);
            }
            return {
                ...state,
                todos: [...state.todos]
            };
        case 'ADD_NEW_TODO':
            const selectColumn = state.todos.find((item) => item.id === action.payload.id);
            if (selectColumn) {
                const index = state.todos.indexOf(selectColumn);
                state.todos[index].newItems.push(action.payload.newTodo);
            }
            return {
                ...state,
                todos: [...state.todos]
            };
        case 'REMOVE_NEW_TODO':
            const selectColumnStatus = state.todos.find((item) => item.status === action.payload);
            if (selectColumnStatus) {
                const index = state.todos.indexOf(selectColumnStatus);
                state.todos[index].newItems = [];
            }
            return {
                todos: [...state.todos]
            };
        case 'CHANGE_STATUS':
            const columnSource = state.todos.find((item) => item.id === action.payload.sourceId);
            const columnDestination = state.todos.find((item) => item.id === action.payload.destinationId);

            if (columnSource && columnDestination) {
                const indexSource = state.todos.indexOf(columnSource);
                const indexDestination = state.todos.indexOf(columnDestination);

                const selectedTodo = state.todos[indexSource].items.find((item) => item.id === action.payload.todoId);
                const selectedIndedx = action.payload.index;

                if (selectedTodo) {
                    state.todos[indexDestination].items.splice(selectedIndedx, 0, {
                        ...selectedTodo,
                        status: columnDestination.status
                    });
                    const newColumnSoure = state.todos[indexSource].items.filter((item) => item.id !== action.payload.todoId);
                    state.todos[indexSource].items = newColumnSoure;
                }
            }
            return {
                ...state,
                todos: [...state.todos]
            };
        default:
            return state;
    }
}

export default reducer;