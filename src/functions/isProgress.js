import { store } from '../redux/store';

export default function isProgress() {
        let arr = store.getState() ? store.getState() : [], result = 0;
        function iterator(arr) {
                let item = 0;
                for (var i = 0; i < arr.categories.length; i++) {
                    if (arr.categories[i].categories) {
                        iterator(arr.categories[i]);
                    }
                    if (arr.categories[i].done) {
                        result++;
                    }
                }
            }
        
        if (arr.categories) iterator(arr);
        return result;
}