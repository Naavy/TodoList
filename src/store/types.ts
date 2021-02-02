export type Status =  'to do' | 'in progress' | 'done';

export interface TodoType {
    id: string,
    title: string,
    text: string,
    status: Status
};

export interface ColumnType {
    id: string,
    title: string,
    status: Status,
    newItems: TodoType[],
    items: TodoType[]
};

export interface AppState {
    todos: ColumnType[]
};