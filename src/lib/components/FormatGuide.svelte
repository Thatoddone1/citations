<script>
  // Extract props in runes mode
  const { currentQuote, currentDescription, currentExample } = $props();
</script>

<div class="mt-2 p-2 bg-blue-50 dark:bg-slate-300 dark:border border-black rounded-md text-xs text-blue-500">
  <p class="font-medium text-sm">Format {#if currentExample}and Example{/if}:</p>
  <p class="">{@html currentQuote}</p>
  
  {#if currentExample}
    <p class="text-blue-400">{@html currentExample}</p>
  {/if}
  {#if currentDescription}
  <div class="font-medium text-sm">Description:
    <span class="mt-1 text-blue-400 text-xs">{currentDescription}</span>
    </div>
  {/if}
</div>
