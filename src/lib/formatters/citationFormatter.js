export function formatCitation(type, data) {
  let citation = '';
  switch (type) {
    case 'book_single_author':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>.`;
      if (data.cityOfPub) citation += ` ${data.cityOfPub},`;
      citation += ` ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'book_multiple_authors':
      citation = `${data.firstAuthorLastName}, ${data.firstAuthorFirstName}`;
      if (data.authorCount === '2') {
        citation += `, and ${data.secondAuthorFirstName} ${data.secondAuthorLastName}`;
      } else {
        citation += ', et al';
      }
      citation += `. <em>${data.bookTitle}</em>. ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'book_corporate_author':
      citation = `${data.corporateAuthorName}. <em>${data.bookTitle}</em>.`;
      if (data.cityOfPub) citation += ` ${data.cityOfPub},`;
      citation += ` ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'book_no_author':
      citation = `<em>${data.bookTitle}</em>.`;
      if (data.cityOfPub) citation += ` ${data.cityOfPub},`;
      citation += ` ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'translated_book':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>. Translated by ${data.translatorFirstName} ${data.translatorLastName}, ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'edited_book':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>. Edited by ${data.editorFirstName} ${data.editorLastName}, ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'work_in_anthology':
      citation = `${data.authorLastName}, ${data.authorFirstName}. "${data.workTitle}." <em>${data.collectionTitle}</em>, edited by ${data.editorFirstName} ${data.editorLastName}, ${data.publisher}, ${data.pubYear}, ${data.pageRange}.`;
      break;
    case 'article_magazine':
      citation = `${data.authorLastName}, ${data.authorFirstName}. "${data.articleTitle}." <em>${data.periodicalTitle}</em>, `;
      if(data.pubDay) citation += `${data.pubDay} `;
      citation += `${data.pubMonth}. ${data.pubYear}, pp. ${data.pageRange}.`; // Assuming pageRange includes "pp." if needed, or adjust as per MLA for magazines.
      break;
    case 'article_newspaper':
      if (data.authorLastName && data.authorFirstName) {
          citation = `${data.authorLastName}, ${data.authorFirstName}. `;
      }
      citation += `"${data.articleTitle}." <em>${data.newspaperTitle}</em>`;
      if (data.newspaperCity) {
          citation += ` [${data.newspaperCity}]`;
      }
      citation += `, ${data.pubDay} ${data.pubMonth}. ${data.pubYear}`;
      if (data.edition) {
          citation += `, ${data.edition}`;
      }
      citation += `, ${data.pageNumber}.`;
      break;
    case 'website':
      if (data.authorLastName && data.authorFirstName) {
        citation += `${data.authorLastName}, ${data.authorFirstName}. `;
      }
      citation += `"${data.pageTitle}." <em>${data.websiteName}</em>`;
      if (data.publisher) {
        citation += `, ${data.publisher}`;
      }
      let pubDateParts = [data.pubDay, data.pubMonth, data.pubYear].filter(Boolean).map(p => p.toString().trim());
      if (pubDateParts.length > 0) {
        citation += `, ${pubDateParts.join(' ')}`;
      }
      citation += `, ${data.url}. Accessed ${data.accessDay} ${data.accessMonth}. ${data.accessYear}.`;
      break;
    default:
      return 'Citation format not yet supported for this type.';
  }
  return citation;
}
