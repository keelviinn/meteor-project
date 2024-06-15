/**
 * Parse company and position to display in the table
 * 
 * @param {*} person 
 * @returns 
 */
export function parseCompanyAndPosition(person) {
  if (person.companyName && person.title) {
    return `${person.companyName} - ${person.title}`;
  } else if (person.companyName && !person.title) {
    return person.companyName;
  } else if (!person.companyName && person.title) {
    return person.title;
  } else {
    return "N/A";
  }
};

/**
 * Format people data to display in the table
 * 
 * @param {*} people
 * @returns 
 */
export function handleFormatPeople(people) {
  return people.map((person) => {
    return {
      _id: person._id,
      name: `${person.firstName} ${person.lastName}`,
      companyAndPosition: parseCompanyAndPosition(person),
      checkInDate: person.checkInDate
        ? new Date(person.checkInDate).toLocaleString()
        : "-",
      checkOutDate: person.checkOutDate
        ? new Date(person.checkOutDate).toLocaleString()
        : "-",
      showCheckinButton: !person.checkInDate,
      showCheckoutButton:
        person.checkInDate &&
        !person.checkOutDate,
      enabledCheckout: person.enabledCheckout,
    };
  });
} 