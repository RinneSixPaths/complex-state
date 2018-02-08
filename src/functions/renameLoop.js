import { store } from '../redux/store';

export default function renameIterator(action) {
        let arr = store.getState();
        
        function renameLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        renameLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action.clickedCategory) {
                        arr.categories[i].categoryName = action.newName;
                        return;
                    }
                }
            }
        
        renameLoop(arr);
        action.list = arr.categories;
        return action;
}