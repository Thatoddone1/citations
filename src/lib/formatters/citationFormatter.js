function _formatCitation(type, data) {
  let citation = '';
  switch (type) {
    case 'book_single_author':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>.`;
      // City:Publisher Year
      if (data.cityOfPub) citation += ` ${data.cityOfPub}:`;
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
      // Corporate author formatting with city punctuation
      if (data.corporateAuthorName === data.publisher) {
        citation = `<em>${data.bookTitle}</em>.`;
        if (data.cityOfPub) citation += ` ${data.cityOfPub}:`;
        citation += ` ${data.publisher}, ${data.pubYear}.`;
      } else {
        citation = `${data.corporateAuthorName}. <em>${data.bookTitle}</em>.`;
        if (data.cityOfPub) citation += ` ${data.cityOfPub}:`;
        citation += ` ${data.publisher}, ${data.pubYear}.`;
      }
      break;
    case 'book_no_author':
      citation = `<em>${data.bookTitle}</em>.`;
      if (data.cityOfPub) citation += ` ${data.cityOfPub}:`;
      citation += ` ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'translated_book':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>. Translated by ${data.translatorFirstName} ${data.translatorLastName}, ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'edited_book':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>. Edited by ${data.editorFirstName} ${data.editorLastName}, ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'work_in_anthology':
      // Ensure page range prefixed with pp. or p.
      let pr = data.pageRange.includes('-') ? `pp. ${data.pageRange}` : `p. ${data.pageRange}`;
      citation = `${data.authorLastName}, ${data.authorFirstName}. "${data.workTitle}." <em>${data.collectionTitle}</em>, edited by ${data.editorFirstName} ${data.editorLastName}, ${data.publisher}, ${data.pubYear}, ${pr}.`;
      break;
    case 'article_magazine':
      citation = `${data.authorLastName}, ${data.authorFirstName}. "${data.articleTitle}." <em>${data.periodicalTitle}</em>, `;
      // Date: Day Month Year (no comma before year)
      if (data.pubDay && data.pubMonth && data.pubYear) {
        citation += `${data.pubDay} ${data.pubMonth} ${data.pubYear}, `;
      }
      citation += `pp. ${data.pageRange}.`;
      break;
    case 'article_newspaper':
      if (data.authorLastName && data.authorFirstName) {
          citation = `${data.authorLastName}, ${data.authorFirstName}. `;
      }
      citation += `"${data.articleTitle}." <em>${data.newspaperTitle}</em>`;
      if (data.newspaperCity) {
          citation += ` [${data.newspaperCity}]`;
      }
      citation += `, ${data.pubDay} ${data.pubMonth} ${data.pubYear}`;
      if (data.edition) {
          citation += `, ${data.edition}`;
      }
      citation += `, ${data.pageNumber}.`;
      break;
    case 'website':
      // Website: ensure period before URL and date order
      citation += `"${data.pageTitle}." <em>${data.websiteName}</em>.`;
      if (data.publisher) citation += ` ${data.publisher},`;
      // Publication date
      let dateParts = [data.pubDay, data.pubMonth, data.pubYear].filter(Boolean);
      if (dateParts.length) citation += ` ${dateParts.join(' ')}`;
      // URL and access
      citation += `. ${data.url}. Accessed ${data.accessDay} ${data.accessMonth} ${data.accessYear}.`;
      break;
    default:
      return 'Citation format not yet supported for this type.';
  }

  return citation;
}

// Add support for additional citation types
export function formatAdditional(type, data) {
  let citation = '';
  switch(type) {
    case 'republished_book':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>. ${data.originalPubYear}. ${data.publisher}, ${data.repubYear}.`;
      break;
    case 'edition_book':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.bookTitle}</em>. ${data.editionNumber} ed., ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'multivolume_work':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.workTitle}</em>. vol. ${data.volumeNumber}, ${data.publisher}, ${data.pubYear}.`;
      break;
    case 'government_publication':
      citation = `${data.agencyName}. <em>${data.docTitle}</em>.`;
      if (data.congressSession) citation += ` ${data.congressSession}.`;
      citation += ` ${data.publisher}, ${data.pubYear}.`;
      if (data.reportNumber) citation += ` ${data.reportNumber}.`;
      break;
    case 'pamphlet':
      citation = `<em>${data.pamphletTitle}</em>.`;
      if (data.corporateAuthorName) citation += ` ${data.corporateAuthorName},`;
      citation += ` ${data.pubYear}.`;
      break;
    case 'dissertation':
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.title}</em>. ${data.degreeType}, ${data.schoolName}, ${data.pubYear}.`;
      if (data.umiNumber) citation += ` UMI, ${data.umiNumber}.`;
      break;
    case 'poem_short_story':
      let pages = data.pageNumber.includes('-') ? `pp. ${data.pageNumber}` : `p. ${data.pageNumber}`;
      citation = `${data.authorLastName}, ${data.authorFirstName}. "${data.workTitle}." <em>${data.collectionTitle}</em>`;
      if (data.editorFirstName && data.editorLastName) citation += `, edited by ${data.editorFirstName} ${data.editorLastName}`;
      citation += `, ${data.publisher}, ${data.pubYear}, ${pages}.`;
      break;
    case 'image':
      // Format: Artist/Photographer Last, First. "Title of Work." Date of Creation. Institution, Location. Website Name, URL (if available). Accessed Date (if applicable).
      citation = `${data.authorLastName}, ${data.authorFirstName}. <em>${data.workTitle}</em>. ${data.dateOfCreation}`;
      
      // Add institution and location if provided
      if (data.institution) {
        citation += `. ${data.institution}`;
        if (data.location) {
          citation += `, ${data.location}`;
        }
      }
      
      // Add website and URL if provided
      if (data.url) {
        if (data.websiteName) {
          citation += `. ${data.websiteName}, ${data.url}`;
        } else {
          citation += `. ${data.url}`;
        }
        
        // Add access date if URL is provided and access date is available
        if (data.accessDay && data.accessMonth && data.accessYear) {
          citation += `. Accessed ${data.accessDay} ${data.accessMonth} ${data.accessYear}`;
        }
      }
      citation += '.';
      break;
    case 'oral_presentation':
      // Format: Speaker Last, First. "Title of Speech" (if any). Title of Conference/Meeting, Organization Name, Day Month Year, Venue, City. Presentation Type.
      citation = `${data.speakerLastName}, ${data.speakerFirstName}.`;
      
      // Add speech title if provided
      if (data.speechTitle) {
        citation += ` "${data.speechTitle}."`;
      }
      
      // Add conference title, organization, date, venue, and city
      citation += ` ${data.conferenceTitle}, ${data.organizationName}, ${data.presentationDay} ${data.presentationMonth} ${data.presentationYear}, ${data.venue}, ${data.venueCity}. ${data.presentationType}.`;
      break;
    default:
      return null;
  }
  return citation;
}

// Wrap original function to include additional types
export function formatCitation(type, data) {
  const base = _formatCitation(type, data);
  if (base !== 'Citation format not yet supported for this type.') {
    return base;
  }
  const add = formatAdditional(type, data);
  if (add) return add;
  return base;
}
