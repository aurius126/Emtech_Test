'use strict'

import { view } from '@/functions';

const prefix = '/form-data';

export default [
    {
        path: `${prefix}`,
        name: 'forms',
        component: () => view('forms/index')
    },
    {
        path: `/table-data`,
        name: 'tables',
        component: () => view('data/index')
    }
];