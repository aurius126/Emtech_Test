'use strict'

import { createRouter, createWebHistory} from 'vue-router'

import dashboard from './dashboard';
import students from './students';
import data from './data';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...dashboard,
        ...students,
        ...data
    ]
})

export default router;