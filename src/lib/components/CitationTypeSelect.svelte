<script>
  import { createEventDispatcher } from 'svelte';
  export let citationTypes = {};
  export let selectedType = '';

  const dispatch = createEventDispatcher();
  function handleChange(event) {
    dispatch('change', event.target.value);
  }
</script>

<label for="citationType" class="block text-xs font-medium text-slate-700 mb-1">Citation Type:</label>
<select id="citationType" value={selectedType} on:change={handleChange} class="w-full p-1.5 border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs">
  {#each Object.entries(citationTypes) as [key, { label }]}
    <option value={key}>{label}</option>
  {/each}
</select>
