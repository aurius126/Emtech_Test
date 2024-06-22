'use strict'

import { view } from '@/functions';

const prefix = '/students';

export default [
    {
        path: `${prefix}`,
        name: 'students',
        component: () => view('students/index')
    },
    {
        path: `${prefix}/info`,
        name: 'students-info',
        component: () => view('students/info')
    }
];