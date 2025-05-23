<script>
  // Extract props in runes mode
  const { field, formData } = $props();

  let value = $state(formData[field.id] || '');

  $effect(() => {
    formData[field.id] = value;
  });

  // Ensure reactivity if formData is reassigned externally for the field
  $effect(() => {
    if (formData[field.id] !== value) {
      value = formData[field.id] || '';
    }
  });

  // Determine if the field is required based on its configuration
  let isRequired = $derived(
    field.required === true || 
    (typeof field.required === 'function' && field.required(formData))
  );
</script>

<div>
  <label for={field.id} class="block text-xs font-medium text-slate-700 mb-0.5">
    {field.label}
    {#if isRequired}<span class="text-red-500 ml-0.5">*</span>{/if}
  </label>
  {#if field.type === 'select'}
    <select id={field.id} bind:value class="w-full p-1 border-slate-300 rounded-md shadow-sm text-xs focus:ring-blue-500 focus:border-blue-500" required={isRequired}>
      {#if field.placeholder}
        <option value="" disabled selected>{field.placeholder}</option>
      {/if}
      {#each field.options as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  {:else}
    <input type={field.type || 'text'} id={field.id} bind:value placeholder={field.placeholder || ''} class="w-full p-1 border-slate-300 rounded-md shadow-sm text-xs focus:ring-blue-500 focus:border-blue-500" required={isRequired} />
  {/if}
  {#if field.note}
    <p class="mt-0.5 text-xs text-slate-500">{field.note}</p>
  {/if}
</div>
