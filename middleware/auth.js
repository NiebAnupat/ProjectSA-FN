export default function({ store, redirect, route }) {
  const userIsLoggedIn = !!store.getters["Auth/user"].EM_ID;
  if (!userIsLoggedIn) return redirect("/");
  const userIsAdmin = store.getters["Auth/isAdmin"];
  if (!userIsAdmin && route.path === "/") return redirect("/Employee/Checkin");
  else if (route.path === "/") return redirect("/HR/Dashboard");
}
