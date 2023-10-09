import { ClassError, Dlool } from 'src';
import { notAuthenticated } from 'src/errors/auth';
import { NewHomework } from 'src/types/homework';
import { isCustomDate } from 'src/utils/iscustomDate';

export const createHomework = (dlool: Dlool, data: NewHomework) => {
    const token = dlool.token as string | undefined;
    if (!token) throw notAuthenticated;

    const { from, assignments } = data;
    if (!isCustomDate(from)) throw new Error('The from field is not a valid date');
    if (assignments.length === 0) throw new Error('The assignments field is empty');

    const response = fetch(`${dlool.baseUrl}/homework`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => {
            throw new Error(err);
        });

    return response.then((res) => {
        const message: string = res.error || res.message;

        const invalidTokenTemplate = 'Invalid token';
        const invalidClassTemplate = 'Class not found';
        const internalErrorTemplate = 'Internal server error, homework could not be created';
        const successTemplate = 'Homework created';

        switch (message) {
            case invalidTokenTemplate:
                throw notAuthenticated;
            case invalidClassTemplate:
                throw new ClassError(`The class ${data.className} does not exist for your school`);
            case internalErrorTemplate:
                throw new Error(internalErrorTemplate);
            case successTemplate:
                return {
                    classId: res.data.class as string,
                    homeworkId: res.data._id as string,
                    createdAt: new Date(res.data.createdAt),
                    creatorId: res.data.creator as string,
                };
        }
    });
};
