import { Dlool, HomeworkError } from 'src';
import { notAuthenticated } from 'src/errors/auth';
import { UpdateHomework } from 'src/types/homework';
import { isCustomDate } from 'src/utils/iscustomDate';

export const updateHomework = (dlool: Dlool, id: string, data: UpdateHomework) => {
    const token = dlool.token as string | undefined;
    if (!token) throw notAuthenticated;

    const { from, assignments } = data;
    if (!isCustomDate(from)) throw new Error('The from field is not a valid date');
    if (assignments.length === 0) throw new Error('The assignments field is empty');

    const url = `${dlool.baseUrl}/homework/${id}`;
    const response = fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch(() => {
            throw new Error('Something went wrong');
        });

    return response.then((res) => {
        const invalidIdTemplate = 'invalid homework id';
        const homeworkNotFoundTemplate = 'homework not found';
        const internalServerErrorTemplate = 'internal server error';
        const successTemplate = 'homework updated';

        const message: string = res.error || res.message;

        switch (message.toLocaleLowerCase()) {
            case invalidIdTemplate:
                throw new HomeworkError('The homework id is invalid');
            case homeworkNotFoundTemplate:
                throw new HomeworkError('The homework does not exist');
            case internalServerErrorTemplate:
                throw new Error('Something went wrong');
            case successTemplate:
                return {
                    classId: res.data.class as string,
                    creatorId: res.data.creator as string,
                    createdAt: new Date(res.data.createdAt as number),
                } as const;
        }
    });
};
