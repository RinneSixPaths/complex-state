import { store } from '../redux/store';

export default function seekCategory(category) {
        let arr = store.getState(), result = null;
        function seek(arr) {
            for (var i = 0; i < arr.categories.length; i++) {

                        if (arr.categories[i].categories) {
                            seek(arr.categories[i]);
                        }
                        if (arr.categories[i].categoryName == category) {
                            result = arr.categories[i];
                            break;
                        }
                    }
        }
        seek(arr);
    
        return result;
}
