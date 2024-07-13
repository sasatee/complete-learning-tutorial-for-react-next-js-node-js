import { Outlet } from "react-router-dom";
//Outlet =>>>>  This component marks the place where the child route elements should be rendered to.
import MainNavigation from "../Navigation/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
