import { Homework } from '../../src/types/homework';
import { isCustomDate } from '../../src/utils/iscustomDate';
import { expect } from 'vitest';

export const isHomework = (homework: Homework[]) => {
    homework.forEach((hw) => {
        expect(isCustomDate(hw.from)).toBeTruthy();
        hw.assignments.forEach((assignment) => {
            expect(isCustomDate(assignment.due)).toBeTruthy();
            expect(assignment.subject).toBeTypeOf('string');
            expect(assignment.description).toBeTypeOf('string');
        });
        expect(hw.class).toBeTypeOf('string');
        expect(hw.creator).toBeTypeOf('string');
        expect(hw.createdAt).toBeInstanceOf(Date);
        // @ts-expect-error
        expect(hw.id).toBeTypeOf('string');
    });
};
