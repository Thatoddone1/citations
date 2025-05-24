<script>
  // Import external logic module
  import { createPageState, handleGenerate, copyToClipboard, citationTypes } from '$lib/page.svelte.js';

  // Import Svelte components
  import CitationTypeSelect from '$lib/components/CitationTypeSelect.svelte';
  import FormatGuide from '$lib/components/FormatGuide.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import GeneratedCitation from '$lib/components/GeneratedCitation.svelte';

  // Create page state
  const pageState = createPageState();

  // Create bound functions
  const handleGenerateClick = handleGenerate(pageState);
  const handleCopyClick = () => copyToClipboard(pageState.generatedCitation);
</script>

<div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
  <header class="mb-6 text-center">
    <h1 class="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">Joshua's Citation Generation</h1>
    <p class="text-xs text-slate-500 mt-1 dark:text-slate-400">MLA 8 Citations, Simplified</p>
  </header>

  <section class="mb-4 p-3 border rounded-md bg-white dark:bg-slate-300 shadow-sm">
    <CitationTypeSelect {citationTypes} selectedType={pageState.selectedType} on:change={(e) => pageState.selectedType = e.detail} />
    <FormatGuide currentQuote={pageState.currentQuote} currentDescription={pageState.currentDescription} currentExample={pageState.currentExample} />
  </section>

  <section class="mb-4 p-3 border rounded-md bg-white dark:bg-slate-300 shadow-sm">
    <h2 class="text-base font-semibold text-slate-700 mb-2">Details:</h2>
    <form onsubmit={handleGenerateClick} class="space-y-2.5">
      {#each pageState.currentFields as field (field.id + pageState.selectedType)} 
        {#if !field.showIf || field.showIf(pageState.formData)}
          <FormField field={field} formData={pageState.formData} />
        {/if}
      {/each}
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md text-xs font-medium mt-2">
        Generate Citation
      </button>
    </form>
  </section>

  {#if pageState.generatedCitation}
    <GeneratedCitation generatedCitation={pageState.generatedCitation} onCopy={handleCopyClick} />
  {/if}

  <section class="mb-4 p-3 border rounded-md bg-white shadow-sm dark:bg-slate-300">
    <h2 class="text-base font-semibold text-slate-700 mb-2">More Information</h2>
    <p class="text-sm text-slate-600">MLA 8 Citation format is based on this basic citaition for all types of sources:
    <br><span class="italic text-xs">Author. Title. Title of container (self contained if book), Other contributors (translators or
editors), Version (edition), Number (vol. and/or no.), Publisher, Publication Date,
Location (pages, paragraphs URL or DOI). 2nd container's title, Other contributors,
Version, Number, Publisher, Publication date, Location, Date of Access (if applicable).
    </span>
    <br> This format can be adpated to almost any type of source, as you can generate at the top. 
  </p>
  </section>

  <footer class="mt-8 text-center text-xs text-slate-400">
    <p>Always verify citations for professional use.</p>
    <p>©2025 Joshua K. Made by <a href="https://www.joshuarocks.me" class="font-bold text-blue-500 underline">Joshua K.</a></p>
    <p>Help with the <a href="https://www.github.com/Thatoddone1/citations" class="font-bold text-blue-500 underline">source code</a>, <a href="https://www.github.com/Thatoddone1/citations/issues" class="font-bold text-blue-500 underline">issue reporting</a>, and <a href="https://www.github.com/Thatoddone1/citations/releases" class="font-bold text-blue-500 underline">changelog</a></p>
  </footer>
</div>

<!-- Styles moved to GeneratedCitation.svelte component -->
