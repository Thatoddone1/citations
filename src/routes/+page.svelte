<script>
  // Svelte 5 Runes for reactivity
  let selectedType = $state('book_single_author');

  // Import data and functions from separate modules
  import { citationTypes, getEmptyFormData } from '$lib/data/citationTypes.js';
  import { formatCitation } from '$lib/formatters/citationFormatter.js';

  // Import Svelte components
  import CitationTypeSelect from '$lib/components/CitationTypeSelect.svelte';
  import FormatGuide from '$lib/components/FormatGuide.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import GeneratedCitation from '$lib/components/GeneratedCitation.svelte';

  let formData = $state(getInitialFormData());
  let generatedCitation = $state('');

  // Effect to reset formData when citation type changes
  $effect(() => {
    // When selectedType changes, re-initialize formData using the imported getEmptyFormData
    formData = getEmptyFormData(selectedType, citationTypes); 
    generatedCitation = ''; // Clear previous citation when type changes
  });

  // Function to get initial empty form data based on selected type
  function getInitialFormData() {
    // Use the imported getEmptyFormData and pass citationTypes to it
    return getEmptyFormData(selectedType, citationTypes);
  }
  
  function handleGenerate(event) {
    event.preventDefault(); // Prevent default form submission
    generatedCitation = formatCitation(selectedType, formData);
  }

  async function copyToClipboard() {
    if (!generatedCitation) return;
    
    try {
      // Try to copy as rich text (HTML) to preserve formatting in compatible applications
      if (navigator.clipboard && navigator.clipboard.write) {
        const htmlBlob = new Blob([generatedCitation], { type: 'text/html' });
        const plainTextWithFormatting = convertHtmlToFormattedText(generatedCitation);
        const textBlob = new Blob([plainTextWithFormatting], { type: 'text/plain' });
        
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob
          })
        ]);
        alert('Citation copied to clipboard with formatting!');
        return;
      }
    } catch (err) {
      console.log('Rich text copy failed, trying plain text:', err);
    }

    try {
      // Fallback: Copy as formatted plain text (with underscores for italics)
      const formattedText = convertHtmlToFormattedText(generatedCitation);
      await navigator.clipboard.writeText(formattedText);
      alert('Citation copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Unable to copy automatically. Please manually copy the citation text above.');
    }
  }

  function convertHtmlToFormattedText(html) {
    // Convert <em> tags to underscores to indicate italics in plain text
    return html
      .replace(/<em>/g, '_')
      .replace(/<\/em>/g, '_')
      .replace(/<[^>]*>/g, '') // Remove any other HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  // Reactive computations for current fields, quote, description, and example
  let currentFields = $derived(citationTypes[selectedType]?.fields || []);
  let currentQuote = $derived(citationTypes[selectedType]?.quoteText || 'Select a type to see format guide.');
  let currentExample = $derived(citationTypes[selectedType]?.example || '');
  let currentDescription = $derived(citationTypes[selectedType]?.description || '');

</script>

<div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
  <header class="mb-6 text-center">
    <h1 class="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">Joshua's Citation Generation</h1>
    <p class="text-xs text-slate-500 mt-1 dark:text-slate-400">MLA 8 Citations, Simplified</p>
  </header>

  <section class="mb-4 p-3 border rounded-md bg-white dark:bg-slate-300 shadow-sm">
    <CitationTypeSelect {citationTypes} selectedType={selectedType} on:change={(e) => selectedType = e.detail} />
    <FormatGuide {currentQuote} {currentDescription} {currentExample} />
  </section>

  <section class="mb-4 p-3 border rounded-md bg-white dark:bg-slate-300 shadow-sm">
    <h2 class="text-base font-semibold text-slate-700 mb-2">Details:</h2>
    <form onsubmit={handleGenerate} class="space-y-2.5">
      {#each currentFields as field (field.id + selectedType)} 
        {#if !field.showIf || field.showIf(formData)}
          <FormField field={field} formData={formData} />
        {/if}
      {/each}
      <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md text-xs font-medium mt-2">
        Generate Citation
      </button>
    </form>
  </section>

  {#if generatedCitation}
    <GeneratedCitation {generatedCitation} onCopy={copyToClipboard} />
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

  <footer class="mt-8 text-center text-xs text-slate-300">
    <p>Always verify citations for professional use.</p>
    <p>©2025 Joshua K. Made by <a href="https://www.joshuarocks.me" class="font-bold text-blue-500 underline">Joshua K.</a></p>
    <p>Contribute with the <a href="https://www.github.com/Thatoddone1/citations" class="font-bold text-blue-500 underline">source code</a></p>
  </footer>
</div>

<!-- Styles moved to GeneratedCitation.svelte component -->
