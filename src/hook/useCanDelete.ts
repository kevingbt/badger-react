import { useBadgerSelector } from "../store/store";

export default function useCanDelete(entity?: string) {
  //entity : vm, server, client, user
  const user = useBadgerSelector((state) => state.user);
  if (user.user.roles[0] === "ROLE_SUPER_ADMIN") {
    return true;
  } else {
    return false;
  }
}

//si vm - supp par super admin
//si server - supp par super admin
//si client - supp par super admin
//si user - supp par super admin

//si vm - edit/add par super admin et developer
//si server - edit/add par super admin et developer
//si client - edit/add par super admin et developer
//service : client admin en plus
//si user - edit/add par super admin et developer
