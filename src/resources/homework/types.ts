type CustomDate = {
    year: number;
    month: number;
    day: number;
};

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

export enum HomeworkStatus {
    'SUCCESS' = 'success',
    'INVALID_CLASS' = 'Invalid class',
    'INVALID_SCHOOL' = 'Invalid school',
}

type positiveGetAllHomeworkResponse = {
    status: HomeworkStatus.SUCCESS;
    message: 'Homework found';
    data: Homework[];
};

type negativeGetAllHomeworkResponse = {
    status: HomeworkStatus.INVALID_CLASS | HomeworkStatus.INVALID_SCHOOL;
    message: 'Invalid class' | 'Invalid school';
};

export type getAllHomeworkResponse = positiveGetAllHomeworkResponse | negativeGetAllHomeworkResponse;
