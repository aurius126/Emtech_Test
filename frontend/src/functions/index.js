'use strict'

const view = path => import(`@/views/${path.replace('.vue', '')}.vue`).then(_view => _view);

export{
    view
}