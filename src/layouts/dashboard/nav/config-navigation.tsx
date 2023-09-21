// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  overview: icon("ic_overview"),
  conversation: icon("ic_conversation"),
  traffic: icon("ic_traffic"),
  top: icon("ic_top"),
  location: icon("ic_location"),
  systems: icon("ic_systems"),
  talkers: icon("ic_talkers"),
  analytics: icon("ic_analytics"),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "- - - main - - -",
    items: [
      {
        title: "Overview",
        path: PATH_DASHBOARD.overview,
        icon: ICONS.overview,
      },
      {
        title: "Conversation Peers",
        path: PATH_DASHBOARD.conversation,
        icon: ICONS.conversation,
      },
      {
        title: "Traffic Analysis",
        path: PATH_DASHBOARD.traffic,
        icon: ICONS.traffic,
      },
      {
        title: "Top N",
        path: PATH_DASHBOARD.top,
        icon: ICONS.top,
      },
      {
        title: "Geo Location",
        path: PATH_DASHBOARD.location,
        icon: ICONS.location,
      },
      {
        title: "Autonomous Systems",
        path: PATH_DASHBOARD.systems,
        icon: ICONS.systems,
      },
      {
        title: "Top talkers",
        path: PATH_DASHBOARD.talkers,
        icon: ICONS.talkers,
      },
      {
        title: "Analytics",
        path: PATH_DASHBOARD.analytics,
        icon: ICONS.analytics,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------

  // {
  //   subheader: "- - - Admin - - -",
  //   items: [
  //     {
  //       title: "User Management",
  //       path: PATH_DASHBOARD.admin.user,
  //       icon: ICONS.user,
  //     },
  //     {
  //       title: "Payment Management",
  //       path: PATH_DASHBOARD.admin.payment,
  //       icon: ICONS.invoice,
  //     },
  //   ],
  // },
];

export default navConfig;
