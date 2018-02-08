export default function purger(obj) {
    for (var key in obj) {
        if (obj[key]) obj[key] = (key == 'type') ? obj[key] : (obj[key].push) ? [] : null;
    }
}