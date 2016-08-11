import {getStore} from '../app/rootStore';
import {userLogOut} from './userActions';

const store = getStore();

export function logOut() {
   store.dispatch(userLogOut());
}
