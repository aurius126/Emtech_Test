'use strict'

import { view } from '@/functions';

const prefix = '/';

export default [
    {
        path: `${prefix}`,
        name: 'dashboard',
        component: () => view('dashboard/index')
    }
];