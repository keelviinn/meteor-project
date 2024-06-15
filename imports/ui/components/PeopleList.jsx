import React, { useCallback } from "react";

import { handleFormatPeople } from "/imports/utils/people.helpers";
import { Texts } from "/imports/infra/constants";

import Button from "./Button";

const PeopleList = ({ people }) => {
  // Format people data to display in the table
  const formatedPeople = useCallback(
    () => handleFormatPeople(people),
    [people]
  );

  // Handle check-in and check-out
  const handleCheckIn = (personId) => {
    Meteor.call("people.checkIn", personId);
  };
  const handleCheckOut = (personId) => {
    Meteor.call("people.checkOut", personId);
  };

  return (
    <div>
      <h2>{Texts.PEOPLE_IN_EVENT_LIST}</h2>

      <table className="table" cellPadding="0" cellSpacing="0" border="0">
        <thead>
          <tr>
            <th className="text-left">
              <div className="d-flex flex-column">
                <span>Name</span>
                <span>Company - Position</span>
              </div>
            </th>
            <th className="text-left" style={{ width: "150px" }}>
              <div className="d-flex flex-column">
                <span>Check-in</span>
                <span>Check-out</span>
              </div>
            </th>
            <th style={{ width: "125px" }}></th>
          </tr>
        </thead>
        <tbody>
          {formatedPeople().map((person) => (
            <tr key={person._id}>
              <td>
                <div className="d-flex flex-column">
                  <span style={{ fontSize: "16px", fontWeight: 500 }}>
                    {person.name}
                  </span>
                  <span>{person.companyAndPosition}</span>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <span>{person.checkInDate}</span>
                  <span>{person.checkOutDate}</span>
                </div>
              </td>
              <td className="txt-end">
                {person.showCheckinButton && (
                  <Button
                    variant={"success"}
                    onClick={() => handleCheckIn(person._id)}
                  >
                    Check-in
                  </Button>
                )}
                {person.showCheckoutButton && (
                  <Button
                    disabled={!person.enabledCheckout}
                    onClick={() => handleCheckOut(person._id)}
                  >
                    Check-out
                  </Button>
                )}
                {!person.showCheckinButton && !person.showCheckoutButton && (
                  <div className="label label-gray">Checked out</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleList;
