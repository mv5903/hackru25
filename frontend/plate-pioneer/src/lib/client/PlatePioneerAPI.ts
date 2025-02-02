const BASE_URL = "https://zsdrecfkre.execute-api.us-east-1.amazonaws.com/prod/";

const endpoints = {
    signup: "signup",
    intakeFormComplete: "intake-form-complete",
    updateIntakeForm: "update-intake-form",
}

export class PlatePioneerAPI {

    private auth0id: string;

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
     * Check if the user has completed the intake form
     * @returns true if the user has completed the intake form
     */
    async intakeFormComplete(): Promise<boolean> {
        const res = await fetch(BASE_URL + endpoints.intakeFormComplete);
        const data = await res.json();
        return data.status === "true";
    }

    /**
     * Update the user's intake form, on creation or update
     * @param formData Data from the intake form
     * @returns true if the intake form was successfully updated
     */
    async updateIntakeForm(formData: any): Promise<boolean> {
        const res = await fetch(BASE_URL + endpoints.intakeFormComplete, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "authID": this.auth0id,
                ...formData,
            }),
        });

        return res.status === 200;
    }
}