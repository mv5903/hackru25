export function formatOption(option: string): string {
    // Convert e.g. "MEAL_TYPE" -> "Meal type"
    let str = option.split('_').join(' ').toLowerCase();
    for (let i = 0; i < str.length; i++) {
        if (i === 0 || str[i - 1] === ' ') {
            str = str.substring(0, i) + str[i].toUpperCase() + str.substring(i + 1);
        }
    }
    return str;
}
