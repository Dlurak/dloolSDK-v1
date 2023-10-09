import { CustomDate } from './types';

type Assignment = {
    subject: string;
    description: string;
    due: CustomDate;
};

export type Homework = {
    _id: string;
    from: CustomDate;
    assignments: Assignment[];
    class: string;
    creator: string;
    createdAt: number;
};

export type getAllHomeworkAPIPositiveResponse = {
    status: 'success';
    message: 'Homework found';
    data: Homework[];
};

type getAllHomeworkAPINegativeResponse = {
    status: 'error';
    message: string;
};

export type getAllHomeworkAPIResponse = getAllHomeworkAPIPositiveResponse | getAllHomeworkAPINegativeResponse;

export type NewHomework = {
    from: CustomDate;
    className: string;
    assignments: Assignment[];
};
