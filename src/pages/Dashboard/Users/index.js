import { CardWithTabs } from "../../../components/CardWithTabs";
import UsersList from "./components/UsersList";
import ReportsList from "./components/ReportsList";

export default function users() {
  const tabs = [
    {
      name: "Users",
      component: <UsersList />,
    },
    {
      name: "Reports",
      component: <ReportsList />,
    },
  ];
  return (
    <>
      <CardWithTabs name={tabs.name} tabs={tabs} />
    </>
  );
}
