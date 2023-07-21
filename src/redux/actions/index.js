// import * as increment from './increment';
// import * as decrement from './decrement';
// import * as posts from './posts'
import * as myAction from './myAction';
import * as cartAction from './cartAction';
import * as favouriteAction from './favouriteAction'
import * as addressAction from './addressAction'

// export default {
//     ...increment,
//     ...decrement,
//     ...posts,
// }

export default {
    ...myAction,
    ...cartAction,
    ...favouriteAction,
    ...addressAction,
}
