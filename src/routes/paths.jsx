// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: "/auth/login",
  verify: "/auth/verify",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  overview: path(ROOTS_DASHBOARD, "/overview"),
  conversation: path(ROOTS_DASHBOARD, "/conversation"),
  traffic: path(ROOTS_DASHBOARD, "/traffic"),
  top: path(ROOTS_DASHBOARD, "/top"),
  location: path(ROOTS_DASHBOARD, "/location"),
  systems: path(ROOTS_DASHBOARD, "/systems"),
  talkers: path(ROOTS_DASHBOARD, "/talkers"),
  analytics: path(ROOTS_DASHBOARD, "/analytics"),


  // admin: {
  //   user: path(ROOTS_DASHBOARD, "/admin/users"),
  //   root: path(ROOTS_DASHBOARD, "/admin"),
  //   payment: path(ROOTS_DASHBOARD, "/admin/payment"),
    // five: path(ROOTS_DASHBOARD, '/user/five'),
    // six: path(ROOTS_DASHBOARD, '/user/six'),
  // },s
};
