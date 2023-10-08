import { CustomDate } from './types';

type Assignment = {
    subject: string;
    description: string;
    due: CustomDate;
};

<<<<<<< HEAD
export type Homework = {
=======
type Homework = {
>>>>>>> edb86318ae734bb4a98a54a3df8b60f3d6f0dedd
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
