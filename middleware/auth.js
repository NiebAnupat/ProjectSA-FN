export default function({ store, redirect, route }) {
  const userIsLoggedIn = !!store.getters["Auth/user"].EM_ID;
  if (!userIsLoggedIn) {
    return redirect("/");
  }
}
