import { store } from '../redux/store';
import { isComp } from '../redux/actions';
import purger from './purger';

export default function isAllDone() {
        let tasks = store.getState(), result = 0, buff = [];
    if (!tasks.categories) return; 
    
    function iterator(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        iterator(arr.categories[i]);
                    }
                    if (!arr.categories[i].tasks.length) {
                        arr.categories[i].done = true;
                        return;
                    }
                    if (!arr.categories[i].hasOwnProperty("done")) {
                        return;
                    } else {
                        buff = arr.categories[i].tasks;
                    }
                    for (var y = 0; y < buff.length; y++) {
                        if (buff[y].done) {
                            result++;
                        }
                    }
                    arr.categories[arr.categories.indexOf(arr.categories[i])].done = result == arr.categories[i].tasks.length ? true : false;
                    
                    
                    result = 0;
                    buff = [];
                }
            }
        
        iterator(tasks);
    
        isComp.list = tasks;
        store.dispatch(isComp);
        purger(isComp);
}