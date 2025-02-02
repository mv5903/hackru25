const BASE_URL = "https://zsdrecfkre.execute-api.us-east-1.amazonaws.com/prod/";

const endpoints = {
    signup: "signup",
    intakeFormComplete: "intake-form-complete",
    foodQuestionnaire: "food-questionnaire",
    foodSuggestions: "food-suggestions",
    addToFoodSelection: "food-selection",
}

export class PlatePioneerAPI {

    private auth0id: string;

    /**
     * Create a new PlatePioneerAPI instance
     * @param auth0id The user's auth0 id
     */
    constructor(auth0id: string) {  
        this.auth0id = auth0id;
    }

    /**
     * Executed the first time a user signs up
     * 
     * @returns true if the user was successfully signed up
     */
    async signup(): Promise<boolean> {
        const res = await fetch(BASE_URL + endpoints.signup, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "authID": this.auth0id,
            }),
        });

        return res.status === 200;
    }

    /**
     * Update the user's intake form, on creation or update
     * @param formData Data from the intake form
     * @returns true if the intake form was successfully updated
     */
    async updateIntakeForm(formData: any): Promise<boolean> {
        const res = await fetch(BASE_URL + endpoints.foodQuestionnaire, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "authID": this.auth0id,
                "intake_form": formData,
            }),
        });

        return res.status === 200;
    }

    /**
     * Get the user's intake form
     * @returns the user's intake form
     */
    async getIntakeForm(): Promise<any> {
        const res = await fetch(BASE_URL + endpoints.foodQuestionnaire + "?authID=" + encodeURIComponent(this.auth0id));
        return res.json();
    }

    /**
     * Get the user's recipe recommendations
     * @returns the user's recipe recommendations
     */
    async getRecipeRecommendations(): Promise<any> {
        const res = await fetch(BASE_URL + endpoints.foodSuggestions + "?authID=" + encodeURIComponent(this.auth0id));
        return res.json();
    }

    /**
     * Add a meal to the user's food selection
     * @param selected_meal The meal to add to the user's food selection
     * @returns true if the meal was successfully added to the user's food selection
     */
    async addToFoodSelection(selected_meal: any): Promise<any> {
        const res = await fetch(BASE_URL + endpoints.addToFoodSelection, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "authID": this.auth0id,
                "selected_meal": selected_meal,
            }),
        });

        return res.status === 200;
    }
}