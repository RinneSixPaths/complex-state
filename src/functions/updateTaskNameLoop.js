import { store } from '../redux/store';

export default function updateTaskNameIterator(action, posParam, searchParam, keyValue, field) {
        let arr = store.getState();
    
        function updateTaskNameLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        updateTaskNameLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action[posParam]) {
                        let indx = arr.categories[i].tasks.indexOf(action[searchParam]);
                        arr.categories[i].tasks[indx][field] = action[keyValue];
                        return;
                    }
                }
            }
    
        updateTaskNameLoop(arr);
        action.list = arr.categories;
        return action;
}