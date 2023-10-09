import { notAuthenticated } from 'src/errors/auth';
import { HomeworkError } from 'src/errors/homework';

export const deleteHomework = (dlool, homeworkId: string): Promise<true> => {
    const token = dlool.token as string | undefined;
    if (!token) throw notAuthenticated;

    const url = `${dlool.baseUrl}/homework/${homeworkId}`;

    const response = fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => {
            throw new Error(err);
        });

    return response.then((res) => {
        const message: string = res.error || res.message;

        switch (message) {
            case 'Invalid token':
                throw notAuthenticated;
            case 'Invalid homework id':
                throw new HomeworkError('The homework id is invalid');
            case 'Homework not found':
                throw new HomeworkError('The homework does not exist');
            case 'Homework deleted successfully':
                return true;
        }
    });
};
