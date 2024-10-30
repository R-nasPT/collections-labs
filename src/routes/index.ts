export const publicRoutes = ["/"];

export const hiddenLayoutRoutes = [
  "/pick-pack-list/[id]",    // ซ่อน dynamic route
  "/pick-pack-list/:id",     // อีกรูปแบบของการระบุ dynamic route
  "/pick-pack-list/*",       // ซ่อนทุก sub-route ภายใต้ pick-pack-list
];

export const showNavbarPaths = ["/dashboard", "/advices", "/settings"];
