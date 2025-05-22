export const citationTypes = {
  book_single_author: {
    label: 'Book with One Author',
    description: 'For a book with a single author.',
    quoteText: 'Last Name, First Name. <em>Title of Book</em>. City of Publication, Publisher, Publication Date.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
      { id: 'cityOfPub', label: 'City of Publication (Optional)', 
        note: 'Only use if book published before 1900, publisher has offices in multiple countries, or publisher is unknown outside North America.' }
    ]
  },
  book_multiple_authors: {
    label: 'Book with 2+ Authors',
    description: 'For a book with two or more authors.',
    quoteText: 'First Author Last, First. For 2 authors: and Second Author First Last. For 3+ authors: et al. <em>Title of Book</em>. Publisher, Publication Year.',
    fields: [
      { id: 'authorCount', label: 'Number of Authors', type: 'select', options: ['2', '3 or more'], required: true },
      { id: 'firstAuthorLastName', label: "First Author's Last Name", required: true },
      { id: 'firstAuthorFirstName', label: "First Author's First Name", required: true },
      { id: 'secondAuthorFirstName', label: "Second Author's First Name", required: (data) => data.authorCount === '2', showIf: (data) => data.authorCount === '2' },
      { id: 'secondAuthorLastName', label: "Second Author's Last Name", required: (data) => data.authorCount === '2', showIf: (data) => data.authorCount === '2' },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true }
    ]
  },
  book_corporate_author: {
    label: 'Book by Corporate Author/Organization',
    description: 'For a book by a commission, committee, government agency, or group.',
    quoteText: 'Name of Corporate Author. <em>Title of Book</em>. Publisher, Publication Date.',
    fields: [
      { id: 'corporateAuthorName', label: 'Corporate Author Name', required: true },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
      { id: 'cityOfPub', label: 'City of Publication (Optional)', 
        note: 'Only use if book published before 1900, publisher has offices in multiple countries, or publisher is unknown outside North America.' }
    ]
  },
  book_no_author: {
    label: 'Book with No Author',
    description: 'For a book where no author is listed.',
    quoteText: '<em>Title of Book</em>. Publisher, Publication Date.',
    fields: [
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
      { id: 'cityOfPub', label: 'City of Publication (Optional)', 
        note: 'Only use if book published before 1900, publisher has offices in multiple countries, or publisher is unknown outside North America.' }
    ]
  },
  translated_book: {
    label: 'Translated Book',
    description: 'For a book that has been translated.',
    quoteText: 'Author Last, First. <em>Title of Book</em>. Translated by Translator First Last, Publisher, Year.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'translatorFirstName', label: "Translator's First Name", required: true },
      { id: 'translatorLastName', label: "Translator's Last Name", required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
    ]
  },
  edited_book: {
    label: 'Edited Book (Work Prepared by Editor)',
    description: 'For a book prepared by an editor other than the author.',
    quoteText: 'Author Last, First. <em>Title of Book</em>. Edited by Editor First Last, Publisher, Year.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'editorFirstName', label: "Editor's First Name", required: true },
      { id: 'editorLastName', label: "Editor's Last Name", required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
    ]
  },
  work_in_anthology: {
    label: 'Work in an Anthology/Collection',
    description: 'For an essay, chapter, or other work within a larger collection.',
    quoteText: 'Author Last, First. "Title of Work." <em>Title of Collection</em>, edited by Editor First Last, Publisher, Year, Page range.',
    fields: [
      { id: 'authorLastName', label: "Work Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Work Author's First Name", required: true },
      { id: 'workTitle', label: 'Title of Work (e.g., Essay, Chapter)', required: true },
      { id: 'collectionTitle', label: 'Title of Collection/Anthology', required: true },
      { id: 'editorFirstName', label: "Collection Editor's First Name", required: true },
      { id: 'editorLastName', label: "Collection Editor's Last Name", required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
      { id: 'pageRange', label: 'Page Range (e.g., pp. 24-34)', required: true },
    ]
  },
  article_magazine: {
    label: 'Article in a Magazine',
    description: 'For an article published in a magazine.',
    quoteText: 'Author(s). "Title of Article." <em>Title of Periodical</em>, Day Month Year, pages.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'articleTitle', label: 'Title of Article', required: true },
      { id: 'periodicalTitle', label: 'Title of Periodical', required: true },
      { id: 'pubDay', label: 'Day of Publication', type: 'number', required: false },
      { id: 'pubMonth', label: 'Month of Publication (e.g., Jan.)', required: true },
      { id: 'pubYear', label: 'Year of Publication', type: 'number', required: true },
      { id: 'pageRange', label: 'Page Range (e.g., 70-71 or 70+)', required: true }
    ]
  },
  article_newspaper: {
    label: 'Article in a Newspaper',
    description: 'For an article in a newspaper.',
    quoteText: 'Author(s). "Title of Article." <em>Title of Newspaper</em> [City of Publication, if not well-known], Day Month Year, edition (if any), p. X or pp. X-Y.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: false },
      { id: 'authorFirstName', label: "Author's First Name", required: false },
      { id: 'articleTitle', label: 'Title of Article', required: true },
      { id: 'newspaperTitle', label: 'Title of Newspaper', required: true },
      { id: 'newspaperCity', label: 'City of Publication (if newspaper is local/less known)', required: false },
      { id: 'pubDay', label: 'Day of Publication', type: 'number', required: true },
      { id: 'pubMonth', label: 'Month of Publication (e.g., May)', required: true },
      { id: 'pubYear', label: 'Year of Publication', type: 'number', required: true },
      { id: 'edition', label: 'Edition (e.g., late ed., if applicable)', required: false },
      { id: 'pageNumber', label: 'Page Number(s) (e.g., A1 or B1-B3)', required: true }
    ]
  },
  website: {
    label: 'Website / Web Page',
    description: 'For content from a website.',
    quoteText: 'Author (if any). "Title of Page/Article." <em>Title of Website</em>, Publisher (if different from website name), Publication Date (if available), URL. Accessed Date.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name (if known)", required: false },
      { id: 'authorFirstName', label: "Author's First Name (if known)", required: false },
      { id: 'pageTitle', label: 'Title of Page/Article', required: true },
      { id: 'websiteName', label: 'Title of Website', required: true },
      { id: 'publisher', label: 'Publisher/Sponsor (if different from website name)', required: false },
      { id: 'pubDay', label: 'Publication Day (if available)', type: 'number', required: false },
      { id: 'pubMonth', label: 'Publication Month (if available)', required: false },
      { id: 'pubYear', label: 'Publication Year (if available)', type: 'number', required: false },
      { id: 'url', label: 'URL (e.g., www.example.com/page)', required: true },
      { id: 'accessDay', label: 'Day Accessed', type: 'number', required: true },
      { id: 'accessMonth', label: 'Month Accessed', required: true },
      { id: 'accessYear', label: 'Year Accessed', type: 'number', required: true }
    ]
  }
  // Add other citation types here as needed
};

export function getEmptyFormData(typeKey, allCitationTypes = citationTypes) {
  const data = {};
  if (allCitationTypes[typeKey] && allCitationTypes[typeKey].fields) {
    allCitationTypes[typeKey].fields.forEach(field => {
      data[field.id] = '';
    });
  }
  // Ensure authorCount has a default for relevant types
  if (typeKey === 'book_multiple_authors') {
    data.authorCount = '2'; // Default to 2 authors
  }
  return data;
}
