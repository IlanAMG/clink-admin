import { useState } from "react";
import { CardWithTabs } from "../../../components/CardWithTabs";
import RequestsList from "./components/RequestList";
import WhitelabelList from "./components/WhiteLabelList";

export default function WhiteLabels() {
  const [selectedWhitelabel, setSelectedWhitelabel] = useState(null);
  const tabs = [
    {
      name: "WhiteLabels",
      component: (
        <WhitelabelList
          selectedWhitelabel={selectedWhitelabel}
          setSelectedWhitelabel={setSelectedWhitelabel}
        />
      ),
      buttons: [
        {
          name: "Create a Whitelabel",
          action: () => setSelectedWhitelabel({}),
        },
      ],
    },
    {
      name: "Requests",
      component: <RequestsList />,
    },
  ];
  return (
    <>
      <CardWithTabs name={"WhiteLabels"} tabs={tabs} />
    </>
  );
}
