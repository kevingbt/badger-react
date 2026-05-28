import { useBadgerSelector } from "../store/store";

export default function useCanEditAdd() {
  //entity : vm, server, client, user
  const user = useBadgerSelector((state) => state.user);
  return function (entity?: string) {
    if (!user.user) {
      return false;
    }
    return (
      user.user.roles[0] === "ROLE_SUPER_ADMIN" ||
      user.user.roles[0] === "ROLE_DEVELOPER"
    );
  };
}

//si vm - edit/add par super admin et developer
//si server - edit/add par super admin et developer
//si client - edit/add par super admin et developer
//service : client admin en plus
//si user - edit/add par super admin et developer
