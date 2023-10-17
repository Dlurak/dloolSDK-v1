import { Dlool } from 'src';

export const user = (dlool: Dlool, id: string) => {
    if (id.trim() === '') throw new Error('User ID cannot be empty');
    if (id.includes('/')) throw new Error('User ID cannot contain a slash');

    const url = `${dlool.baseUrl}/auth/${id}`;

    const response = fetch(url).then((res) => res.json());

    return response.then((data) => {
        const message = (data.message as string).toLowerCase();

        switch (message) {
            case 'invalid user id':
                throw new Error('Invalid user ID');
            case 'user not found':
                throw new Error(`User ${id} not found`);
            default:
                const user = data.data.user;
                user.id = user._id;
                delete user._id;

                return user as User;
        }
    });
};
