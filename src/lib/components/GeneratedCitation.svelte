<script>
  // Extract props in runes mode
  const { generatedCitation, onCopy } = $props();
</script>

<section class="p-3 mb-4 border rounded-md bg-white dark:bg-slate-300 shadow-sm">
  <h2 class="text-base font-semibold text-slate-700 mb-1.5">Your Citation:</h2>
  <div class="p-2.5 bg-slate-200 rounded-md border border-slate-200 text-xs">
    <p class="citation-text leading-relaxed">{@html generatedCitation}</p>
  </div>
  <button onclick={onCopy} class="mt-2 bg-slate-200 hover:bg-slate-300 text-slate-700 py-1 px-2.5 rounded-md text-xs font-medium inline-flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
    Copy
  </button>
  <p class="text-xs text-slate-500 mt-1.5">Review and adjust if needed.</p>
</section>

<style>
  :global(.citation-text) {
    font-family: 'Times New Roman', Times, serif;
  }
  
  :global(.citation-text em) {
    font-style: italic;
  }
</style>
