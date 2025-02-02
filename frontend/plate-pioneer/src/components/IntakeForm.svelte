<script lang="ts">
    import { clientAPIInstance } from '$lib/stores/clientAPIStore';
    import { IntakeFormPreviewType, IntakeFormQuestions } from '../assets/IntakeFormType';

    function onFormComplete() {
        if ($clientAPIInstance) {
            //$clientAPIInstance.updateIntakeForm();
        }
    } 
</script>

<div class="mt-4 bg-stone-800 p-3 rounded-md shadow-lg">
    <p>To get a better understanding of your eating habits, please fill out this intake form.</p>
    <p>Your answers can be changed later.</p>
    <div class="card mt-4 flex justify-center place-items-center">
        {#each Object.keys(IntakeFormPreviewType) as key}
            {@const field = key as keyof typeof IntakeFormPreviewType}
            {@const value = IntakeFormPreviewType[field]}
            {@const fieldType = typeof IntakeFormPreviewType[field]}
            <div class="card-body flex justify-center place-items-center">
                <h3 class="text-xl">{IntakeFormQuestions[field]}</h3>
                {#if Array.isArray(value)}
                    <p>{`${field} : ${value} : array`}</p>
                {:else if fieldType === 'number'}
                    <p>{`${field} : ${value} : number`}</p>
                {:else if fieldType === 'boolean'}
                    <select class="select select-bordered w-full max-w-xs">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                {:else if fieldType === 'string'}
                    <p>{`${field} : ${value} : string`}</p>
                {:else}
                    <p>{`${field} : ${value} : ${fieldType}`}</p>
                {/if}
            </div>

            
        {/each} 
    </div>
</div>