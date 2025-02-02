export type IntakeFormType = {
    allergies: [string];
    meatStatus: [MeatStatus];
    dietaryPreferences: [DietaryPreferenceType];
    avoidFoods: [string];
    cuisinePreferences: [CuisineType];
    spiceTolerance: 0 | 1 | 2 | 3 | 4 | 5;
    mealTypes: [MealType];
    budget: "$" | "$$" | "$$$" | "$$$$";
    alcoholAllowed: boolean;
    timeToCook:[TimeCookType];
}

export enum MeatStatus {
    VEGAN,
    VEGETARIAN,
    PESCATARIAN,
    MEAT_OK
}

export enum DietaryPreferenceType {
    KOSHER,
    HALAL,
    KETO,
    GLUTEN_FREE,
    DAIRY_FREE,
    NUT_FREE,
}

export enum CuisineType {
    AMERICAN,
    MEXICAN,
    ITALIAN,
    CHINESE,
    JAPANESE,
    KOREAN,
    INDIAN,
    THAI,
    GREEK,
    FRENCH,
    SPANISH,
    VIETNAMESE,
    MEDITERRANEAN,
    CARIBBEAN,
    AFRICAN,
    MIDDLE_EASTERN,
    SOUTHERN,
    CAJUN,
    BBQ
}

export enum MealType {
    LOW_FAT,
    LOW_CARB,
    HIGH_PROTEIN,
    HIGH_FIBER,
    LOW_SUGAR,
    LOW_SODIUM,
    LOW_CHOLESTEROL,
    LOW_CALORIE,
    HIGH_CALORIE
}

export enum TimeCookType {
    SHORT_MEALS_ONLY,
    HIGH_EFFORT,
    MULTI_DAY,
    NO_PREFERENCE
}

export const IntakeFormEnumMapping: { [key: string]: any } = {
    meatStatus: MeatStatus,
    dietaryPreferences: DietaryPreferenceType,
    cuisinePreferences: CuisineType,
    mealTypes: MealType,
    timeToCook: TimeCookType,
};

export const IntakeFormPreviewType = {
    allergies: [""],
    meatStatus: [MeatStatus.MEAT_OK],
    dietaryPreferences: [DietaryPreferenceType.KOSHER],
    avoidFoods: [""],
    cuisinePreferences: [CuisineType.AMERICAN],
    spiceTolerance: 3,
    mealTypes: [MealType.LOW_FAT],
    budget: "$",
    alcoholAllowed: false,
    timeToCook: [TimeCookType.NO_PREFERENCE]
}

export const IntakeFormQuestions = {
    allergies: "What allergies do you have? List them separated by commas.",
    meatStatus: "What meat do you eat, if any?",
    dietaryPreferences: "What dietary preferences do you have?",
    avoidFoods: "What foods do you want to avoid?",
    cuisinePreferences: "What cuisines do you prefer?",
    spiceTolerance: "What is your spice tolerance?",
    mealTypes: "What types of meals do you prefer?",
    budget: "What is your budget for meals?",
    alcoholAllowed: "Is alcohol allowed in your meals (i.e. for wine pairings)?",
    timeToCook: "How much time do you have to cook?"
}