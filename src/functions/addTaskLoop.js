import { store } from '../redux/store';

export default function addTaskIterator(action) {
        let arr = store.getState();
        
        function addTaskLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        addTaskLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action.item.category) {
                        arr.categories[i].tasks.push(action.item);
                        return;
                    }
                }
            }
        addTaskLoop(arr);
        action.list = arr.categories;
        return action;
}