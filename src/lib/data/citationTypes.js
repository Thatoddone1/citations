/**
 * 
 * This document defines citation types for the formatter. Each type can include:
 *  - label: A string that describes the citation type.
 *  - description: A string that provides a brief description of the citation type.
 *  - quoteText: A string that provides a template for how the citation should be formatted as a reference to the user.
 *  - example: A string that provides an example of the citation type for the user.
 *  - fields: An array of objects that define the fields required for that citation type.
 *   Each field object can include:
 *    - id: A unique identifier for the field.
 *    - label: A string that describes the field.
 *    - required: A boolean that indicates whether the field is required.
 *  In order for any of this to work, you must also update the citationFormatter.js file to include the new citation types.
 */

export const citationTypes = {
  book_single_author: {
    label: 'Book with One Author',
    description: 'For a book with a single author.',
    quoteText: 'Last Name, First Name. <em>Title of Book</em>. City of Publication, Publisher, Publication Date.',
    example: 'Smith, John. <em>The Great Book</em>. New York, Penguin Books, 2020.',
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
    example: 'Gillespie, Paula, and Neal Lerner. <em>The Allyn and Bacon Guide to Peer Tutoring</em>. Allyn and Bacon, 2000.',
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
    example: 'American Allergy Association. <em>Allergies in Children</em>. Random House, 1998.',
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
    example: '<em>Encyclopedia of Indiana</em>. Somerset, 1993.',
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
    example: 'Foucault, Michel. <em>Madness and Civilization: A History of Insanity in the Age of Reason</em>. Translated by Richard Howard, Vintage-Random House, 1988.',
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
    example: 'Bronte, Charlotte. <em>Jane Eyre</em>. Edited by Margaret Smith, Oxford UP, 1998.',
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
    example: 'Harris, Muriel. "Talk to Me: Engaging Reluctant Writers." <em>A Tutor\'s Guide: Helping Writers One-to-One</em>, edited by Ben Rafoth, Heinemann, 2000, pp. 24-34.',
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
    example: 'Buchman, Dana. "A Special Education." <em>Good Housekeeping</em>, Mar. 2006, pp. 143-48.',
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
    example: 'Krugman, Andrew. "Fear of Eating." <em>New York Times</em>, 21 May 2007, late ed., p. A1.',
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
    quoteText: 'Author (if any). "Title of Page/Article." <em>Title of Website</em>, Publisher (if different), Publication Date (if available), URL. Accessed Date.',
    example: '<em>The Purdue OWL Family of Sites.</em> The Writing Lab and OWL at Purdue and Purdue U, 2008, owl.english.purdue.edu/owl. Accessed 23 Apr. 2008.',
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
  },
  republished_book: {
    label: 'Republished Book',
    description: 'Original publication date before the standard publication info.',
    quoteText: 'Last, First. <em>Title of Book</em>. Original Publication Year. Publisher, Republished Year.',
    example: 'Erdrich, Louise. <em>Love Medicine</em>. 1984. Perennial-Harper, 1993.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'originalPubYear', label: 'Original Publication Year', type: 'number', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'repubYear', label: 'Republished Year', type: 'number', required: true }
    ]
  },
  edition_book: {
    label: 'Book – Subsequent Edition',
    description: 'A book in a later edition.',
    quoteText: 'Last, First. <em>Title of Book</em>. Xth ed., Publisher, Year.',
    example: 'Crowley, Sharon, and Debra Hawhee. <em>Ancient Rhetorics for Contemporary Students</em>. 3rd ed., Pearson, 2004.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'bookTitle', label: 'Title of Book', required: true },
      { id: 'editionNumber', label: 'Edition (e.g., 3rd)', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true }
    ]
  },
  multivolume_work: {
    label: 'Multivolume Work',
    description: 'A work published in multiple volumes.',
    quoteText: 'Last, First. <em>Title of Work</em>. Translated by Translator, vol. X, Publisher, Year.',
    example: 'Quintilian. <em>Institutio Oratoria.</em> Translated by H. E. Butler, vol. 2, Loeb-Harvard UP, 1980.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'workTitle', label: 'Title of Work', required: true },
      { id: 'translatorFirstName', label: "Translator's First Name", required: false },
      { id: 'translatorLastName', label: "Translator's Last Name", required: false },
      { id: 'volumeNumber', label: 'Volume Number', type: 'number', required: true },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true }
    ]
  },
  government_publication: {
    label: 'Government Publication',
    description: 'Cite a government document or report. Note: the Publisher in the US is the Government Pritning Office.',
    quoteText: 'Government Agency. <em>Title of Document</em>. Government Printing Office, Year.',
    example: 'United States, Congress, Senate, Committee on Energy and Natural Resources. <em>Hearing on the Geopolitics of Oil</em>. Government Printing Office, 2007. 110th Congress, 1st session, Senate Report 111-8.',
    fields: [
      { id: 'agencyName', label: 'Government Agency Name', required: true },
      { id: 'docTitle', label: 'Title of Document', required: true },
      { id: 'publisher', label: 'Publisher (e.g., Government Printing Office)', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
      { id: 'congressSession', label: 'Congress Number and Session (if applicable)' , required: false },
      { id: 'reportNumber', label: 'Report Number (if any)', required: false }
    ]
  },
  pamphlet: {
    label: 'Pamphlet',
    description: 'Cite a pamphlet like a book without author or with corporate author.',
    quoteText: '<em>Title of Pamphlet</em>. Corporate Author, Year.',
    example: '<em>Women\'s Health: Problems of the Digestive System</em>. American College of Obstetricians and Gynecologists, 2006.',
    fields: [
      { id: 'pamphletTitle', label: 'Title of Pamphlet', required: true },
      { id: 'corporateAuthorName', label: 'Corporate Author/Sponsor (if any)', required: false },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true }
    ]
  },
  dissertation: {
    label: 'Dissertation or Thesis',
    description: 'Cite a dissertation or master’s thesis.',
    quoteText: 'Last, First. <em>Title</em>. Dissertation, University, Year. UMI, (if you want)',
    example: 'Bishop, Karen Lynn. <em>Documenting Institutional Identity: Strategic Writing in the IUPUI Comprehensive Campaign. </em>Dissertation, Purdue University, 2002. UMI, 2004.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'title', label: 'Title of Dissertation/Thesis', required: true },
      { id: 'degreeType', label: 'Degree (e.g., Dissertation or MA thesis)', required: true },
      { id: 'schoolName', label: 'Degree-Granting Institution', required: true },
      { id: 'pubYear', label: 'Year Awarded', type: 'number', required: true },
      { id: 'umiNumber', label: 'UMI Order Number (if any)', required: false }
    ]
  },
  poem_short_story: {
    label: 'Poem or Short Story',
    description: 'Cite a poem or short story from a collection.',
    quoteText: 'Last, First. "Title of Work." <em>Title of Collection</em>, edited by Editor, Publisher, Year, p. X.',
    example: 'Burns, Robert. "Red, Red Rose." <em>100 Best-Loved Poems</em>, edited by Philip Smith, Dover, 1995, p. 26.',
    fields: [
      { id: 'authorLastName', label: "Author's Last Name", required: true },
      { id: 'authorFirstName', label: "Author's First Name", required: true },
      { id: 'workTitle', label: 'Title of Poem/Story', required: true },
      { id: 'collectionTitle', label: 'Title of Collection', required: true },
      { id: 'editorFirstName', label: "Editor's First Name", required: false },
      { id: 'editorLastName', label: "Editor's Last Name", required: false },
      { id: 'publisher', label: 'Publisher', required: true },
      { id: 'pubYear', label: 'Publication Year', type: 'number', required: true },
      { id: 'pageNumber', label: 'Page Number', required: true }
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
