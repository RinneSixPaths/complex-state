import { store } from '../redux/store';

export default function isComplited() {
        let tasks = store.getState().current, result = 0, temp;
    
        if (!tasks) return;
        if (!tasks.tasks.length) {
            tasks.done = true;
            return;
        }
        if (!tasks.hasOwnProperty("done")) {
            return;
        } else {
            temp = tasks;
            tasks = tasks.tasks;
        }
    
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].done) {
                result++;
            }
        }
        //KOSTIIIL!!!
        temp.done = result == tasks.length ? true : false;
}
