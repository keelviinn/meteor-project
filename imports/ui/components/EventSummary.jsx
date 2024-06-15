import React, { useMemo } from "react";

import { Texts } from "/imports/infra/constants";

const EventSummary = ({ people }) => {
  // Filter people who are checked in
  const checkedInPeople = useMemo(
    () => people.filter((person) => person.checkInDate && !person.checkOutDate),
    [people]
  );
  // Calculate people who are not checked in
  const notCheckedInPeople = useMemo(
    () => people.length - checkedInPeople.length,
    [people.length, checkedInPeople.length]
  );
  // Count people by company
  const companiesCount = useMemo(
    () =>
      checkedInPeople.reduce((acc, person) => {
        if (!person.companyName) {
          return acc;
        }

        acc[person.companyName] = (acc[person.companyName] || 0) + 1;
        return acc;
      }, {}),
    [checkedInPeople]
  );

  return (
    <div>
      <h2>{Texts.EVENT_SUMMARY}</h2>

      <ul>
        <li>
          {Texts.PEOPLE_IN_EVENT} <strong>{checkedInPeople.length}</strong>
        </li>
        <li>
          {Texts.PEOPLE_NOT_CHECKED_IN} <strong>{notCheckedInPeople}</strong>
        </li>
        <li>
          {Texts.PEOPLE_BY_COMPANY}{" "}
          <ul>
            {Object.entries(companiesCount).map(([company, count]) => (
              <li key={company}>
                <i>{company}</i> <strong>({count})</strong>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default EventSummary;
