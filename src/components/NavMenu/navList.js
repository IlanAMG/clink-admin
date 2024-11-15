import PeopleIcon from "@mui/icons-material/People";
import LabelIcon from "@mui/icons-material/Label";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import LinkIcon from "@mui/icons-material/Link";

const navbarList = [
  {
    icon: AlignHorizontalLeftIcon,
    desc: "Global",
    link: "global",
    roles: ["admin"],
  },
  {
    icon: LinkIcon,
    desc: "Links",
    link: "links",
    roles: ["admin"],
  },
  {
    icon: PeopleIcon,
    desc: "Users",
    link: "users",
    roles: ["admin"],
  },
  {
    icon: LabelIcon,
    desc: "Whitelabels",
    link: "whitelabels",
    roles: ["admin"],
  },
];

export default navbarList;
