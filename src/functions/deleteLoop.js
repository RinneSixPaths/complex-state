import { store } from '../redux/store';

export default function deletingIterator(action) {
        let arr = store.getState();
        
        function deleteLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        deleteLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action.clickedCategory) {
                        arr.categories.splice(i, 1);
                        return;
                    }
                }
            }
        deleteLoop(arr);
        action.list = arr.categories;
        return action;
}