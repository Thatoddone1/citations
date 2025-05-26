// Import data and functions from separate modules
import { citationTypes, getEmptyFormData } from '$lib/data/citationTypes.js';
import { formatCitation } from '$lib/formatters/citationFormatter.js';

// Function to create page state and logic
export function createPageState() {
  // Svelte 5 Runes for reactivity
  let selectedType = $state('book_single_author');
  let formData = $state(getInitialFormData());
  let generatedCitation = $state('');

  // Function to get initial empty form data based on selected type
  function getInitialFormData() {
    // Use the imported getEmptyFormData and pass citationTypes to it
    return getEmptyFormData(selectedType, citationTypes);
  }

  // Effect to reset formData when citation type changes
  $effect(() => {
    // When selectedType changes, re-initialize formData using the imported getEmptyFormData
    formData = getEmptyFormData(selectedType, citationTypes); 
    generatedCitation = ''; // Clear previous citation when type changes
  });

  // Reactive computations for current fields, quote, description, and example
  let currentFields = $derived(citationTypes[selectedType]?.fields || []);
  let currentQuote = $derived(citationTypes[selectedType]?.quoteText || 'Select a type to see format guide.');
  let currentExample = $derived(citationTypes[selectedType]?.example || '');
  let currentDescription = $derived(citationTypes[selectedType]?.description || '');

  return {
    // State getters and setters
    get selectedType() { return selectedType; },
    set selectedType(value) { selectedType = value; },
    
    get formData() { return formData; },
    set formData(value) { formData = value; },
    
    get generatedCitation() { return generatedCitation; },
    set generatedCitation(value) { generatedCitation = value; },
    
    // Derived value getters
    get currentFields() { return currentFields; },
    get currentQuote() { return currentQuote; },
    get currentExample() { return currentExample; },
    get currentDescription() { return currentDescription; },
    
    // Functions
    getInitialFormData
  };
}

export function handleGenerate(pageState) {
  return function(event) {
    event.preventDefault(); // Prevent default form submission
    pageState.generatedCitation = formatCitation(pageState.selectedType, pageState.formData);
  };
}

export async function copyToClipboard(generatedCitation) {
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

import sanitizeHtml from 'sanitize-html';

function convertHtmlToFormattedText(html) {
  // Sanitize HTML and convert <em> tags to underscores for italics
  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags: ['em'], // Allow only <em> tags
    allowedAttributes: {} // Disallow all attributes
  });
  return sanitizedHtml
    .replace(/<em>/g, '_')
    .replace(/<\/em>/g, '_')
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Export citationTypes for component use
export { citationTypes };