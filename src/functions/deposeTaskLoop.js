import { store } from '../redux/store';

export default function deposeTaskIterator(action) {
        let arr = store.getState();
        
        function deposeTaskLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        deposeTaskLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action.clickedCategory) {
                        arr.categories[i].tasks.push(action.task);
                    }
                    if (arr.categories[i].categoryName == action.currentCategory) {
                        let indx = arr.categories[i].tasks.indexOf(action.task);
                        arr.categories[i].tasks.splice(indx, 1);
                    }
                }
            }
        
        deposeTaskLoop(arr);
        action.list = arr.categories;
        return action;
}