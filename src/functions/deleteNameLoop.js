import { store } from '../redux/store';

export default function deletingNameIterator(action) {
        let arr = store.getState(), isSubcategory = false;
            
        function deleteNameLoop(arr, isSubcategory) {
            let item = 0;
            for (var i = 0; i < arr.categories.length; i++) {
                if (arr.categories[i].categoryName == action.item || isSubcategory) {
                    action.list.splice(action.list.indexOf(arr.categories[i].categoryName), 1);
                    console.log('deleted - '+arr.categories[i].categoryName + ' from names in use');
                    if (arr.categories[i].categories) deleteNameLoop(arr.categories[i], true);
                } else {
                    if (arr.categories[i].categories) deleteNameLoop(arr.categories[i], false);
                }
            }
        }
            
        deleteNameLoop(arr);
        return action;
}