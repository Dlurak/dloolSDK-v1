import { CustomDate } from './types';

type Assignment = {
    subject: string;
    description: string;
    due: CustomDate;
};

type Homework = {
    _id: string;
    from: CustomDate;
    assignments: Assignment[];
    class: string;
    creator: string;
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
