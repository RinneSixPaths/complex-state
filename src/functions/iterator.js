import { store } from '../redux/store';

export default function subItemIterator(action) {
        let arr = store.getState();
        
        function iterator(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        iterator(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == action.clickedCategory && arr.categories[action.position].categories) {
                        arr.categories[i].categories.push(...action.list);
                        return;
                    }
                    if (arr.categories[i].categoryName == action.clickedCategory) {
                        arr.categories[action.position].categories = action.list;
                        return;
                    }
                }
            }
        
        iterator(arr);
        action.list = arr.categories;
        return action;
}
