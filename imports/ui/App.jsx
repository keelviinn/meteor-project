import React, { useMemo, useState } from "react";

import { Texts } from "/imports/infra/constants";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Communities } from "../api/communities.collection";
import { People } from "../api/people.collection";

import InputSelect from "./components/InputSelect.jsx";
import PeopleList from "./components/PeopleList.jsx";
import EventSummary from "./components/EventSummary.jsx";

export const App = () => {
  // Set selected community for the input select
  const [selectedEvent, setSelectedEvent] = useState("");

  // Set loading state for communities and people
  const isCommunitiesLoading = useSubscribe("communities");
  const isPeopleLoading = useSubscribe("people");

  // Fetch all events to populate the input select
  const events = useTracker(() => {
    Meteor.subscribe("communities");
    return Communities.find().fetch();
  });

  // Fetch all people for the selected event
  const people = useTracker(() => {
    Meteor.subscribe("people", selectedEvent);
    return People.find({ communityId: selectedEvent }).fetch();
  }, [selectedEvent]);

  // Input select options
  const inputSelectOptions = useMemo(() => {
    const defaultOption = {
      value: "",
      label: "Select an event",
      disabled: false,
      hidden: true,
    };

    return [
      defaultOption,
      ...events.map((community) => ({
        value: community._id,
        label: community.name,
      })),
    ];
  }, [events]);

  // Handle input select change
  const onSelectedCommunityChange = ({ target: { value } }) => {
    setSelectedEvent(value);
  };

  return (
    <main className="container">
      <h1>{Texts.HOME_TITLE}</h1>

      <InputSelect
        label="Events"
        options={inputSelectOptions}
        value={selectedEvent}
        onChange={onSelectedCommunityChange}
        placeholder="Select an event"
        disabled={isCommunitiesLoading()}
        error={false}
        errorMessage=""
      />

      {/* Render EventSummary component only if people array is not empty */}
      {people.length > 0 && <EventSummary people={people} />}

      {/* Render PeopleList component only if people array is not empty */}
      {people.length > 0 && <PeopleList people={people} />}
    </main>
  );
};
