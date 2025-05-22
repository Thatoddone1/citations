<script>
  // Extract props in runes mode
  const { currentQuote, currentDescription } = $props();
</script>

<div class="mt-2 p-2 bg-blue-50 rounded-md text-xs text-blue-600">
  <p class="font-medium">Format:</p>
  <p class="italic">{@html currentQuote}</p>
  {#if currentDescription}
    <p class="mt-1 text-blue-500">{currentDescription}</p>
  {/if}
</div>
