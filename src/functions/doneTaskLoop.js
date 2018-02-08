import { store } from '../redux/store';

export default function doneTaskIterator(action) {
        let arr = store.getState();
        
        function doneTaskLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        doneTaskLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action.currentCategory) {
                        let indx = arr.categories[i].tasks.indexOf(action.task);
                        
                        arr.categories[i].tasks[indx].done = arr.categories[i].tasks[indx].done ? false : true;
                        return;
                    }
                }
            }
        
        doneTaskLoop(arr);
        action.list = arr.categories;
        return action;
}