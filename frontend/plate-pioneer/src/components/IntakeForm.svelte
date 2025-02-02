<script lang="ts">
    
    import {
    	CuisineType,
    	DietaryPreferenceType,
    	IntakeFormQuestions,

    	MealType,

    	MeatStatus,

    	TimeCookType
    } from '../assets/IntakeFormType';

	import { clientAPIInstance } from '$lib/stores/clientAPIStore';
	import IntakeDropdown from './IntakeDropdown.svelte';
	import IntakeMultiString from './IntakeMultiString.svelte';
	import IntakeSlider from './IntakeSlider.svelte';

    let allergies: string = "";
    let meatStatus: string[] = [];
    let dietaryPreferences: string[] = [];
    let avoidFoods: string = "";
    let cuisinePreferences: string[] = [];
    let spiceTolerance: string = "0";
    let mealTypes: string[] = [];
    let budget: string = "";
    let alcoholAllowed: string[] = [];
    let timeToCook: string[] = [];

    function numbersRemoved(list: string[]) {
        return list.filter((item) => !/^\d+$/.test(item));
    }

    function submitForm() {
        const data = {
            allergies,
            meatStatus,
            dietaryPreferences,
            avoidFoods,
            cuisinePreferences,
            spiceTolerance,
            mealTypes,
            budget,
            alcoholAllowed,
            timeToCook
        };

        // Make suure all fields are filled out before submitting
        if (Object.values(data).some((value) => value === "")) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        if ($clientAPIInstance) {
            $clientAPIInstance.updateIntakeForm(data);
        }
    }
</script>

<div class="my-4 bg-stone-800 p-3 rounded-md shadow-lg">
    <p>To get a better understanding of your eating habits, please fill out this intake form.</p>
    <p>Your answers can be changed later.</p>

    <div class="card mt-4 flex justify-center place-items-center">
        <IntakeMultiString bind:responses={allergies} question={IntakeFormQuestions.allergies} />
        <IntakeDropdown isMulti={false} bind:responses={meatStatus} question={IntakeFormQuestions.meatStatus} choices={numbersRemoved(Object.keys(MeatStatus))} />
        <IntakeDropdown isMulti={true} bind:responses={dietaryPreferences} question={IntakeFormQuestions.dietaryPreferences} choices={numbersRemoved(Object.keys(DietaryPreferenceType))} />
        <IntakeMultiString bind:responses={avoidFoods} question={IntakeFormQuestions.avoidFoods} />
        <IntakeDropdown isMulti={true} bind:responses={cuisinePreferences} question={IntakeFormQuestions.cuisinePreferences} choices={numbersRemoved(Object.keys(CuisineType))} />
        <IntakeSlider bind:response={spiceTolerance} question={IntakeFormQuestions.spiceTolerance} choices={["0", "1", "2", "3", "4", "5"]} />
        <IntakeDropdown isMulti={true} bind:responses={mealTypes} question={IntakeFormQuestions.mealTypes} choices={numbersRemoved(Object.keys(MealType))} />
        <IntakeSlider bind:response={budget} question={IntakeFormQuestions.budget} choices={["$", "$$", "$$$", "$$$$"]} />
        <IntakeDropdown isMulti={false} bind:responses={alcoholAllowed} question={IntakeFormQuestions.alcoholAllowed} choices={["Yes", "No"]} />
        <IntakeDropdown isMulti={false} bind:responses={timeToCook} question={IntakeFormQuestions.timeToCook} choices={numbersRemoved(Object.keys(TimeCookType))} />
    </div>

    <div class="mt-4 flex justify-center">
        <button class="btn btn-primary" on:click={submitForm}>Submit</button>
    </div>
</div>
