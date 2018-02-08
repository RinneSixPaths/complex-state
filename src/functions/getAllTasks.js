import { store } from '../redux/store';

export default function getAllTasksIterator(categoryName) {
        let arr = store.getState(), result = [];
        
        function getAllTasksLoop(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        getAllTasksLoop(arr.categories[i]);
                    }
                    if (arr.categories[i].categoryName == categoryName) {
                        result = arr.categories[i].tasks;
                        return;
                    }
                }
            }
        
        getAllTasksLoop(arr);
        return result;
}