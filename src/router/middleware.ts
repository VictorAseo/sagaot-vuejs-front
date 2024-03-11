import { useUserStore } from "@/stores/UserStore";
import router from ".";
import { useAppStore } from "@/stores/AppStore";
import { getUserService } from "@/services/user/service";
import { storeToRefs } from "pinia";
import type { UserProps } from "@/@types/services/UserService";

const checkAuthenticationUser = (token: string | null) => !!token;

const saveUserData = (infos: UserProps | undefined) => {
  if (!infos) return;
  const userStore = useUserStore();
  const { userData } = storeToRefs(userStore);

  userData.value = {
    id: infos.id,
    firstname: infos.nome,
    lastname: infos.sobrenome,
    username: infos.login,
    email: infos.email,
    userLevel: infos.user_level,
    userExp: infos.user_exp,
    userNextLevelExp: infos.user_next_level_exp,
    blocked: infos.bloqueado,
    lifes: infos.vidas,
    avatarId: infos.id_avatar,
    avatarSrc: infos.url_avatar,
    isAdmin: infos.is_admin,
    token: infos.token
  };

  localStorage.setItem("token", infos.token);
};

const getUser = async () => {
  const appStore = useAppStore();
  const { handleLoading } = appStore;

  handleLoading(true);
  try {
    const response = await getUserService();
    saveUserData(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    handleLoading(false);
  }
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { userData } = storeToRefs(userStore);

  const isLoggedUser = checkAuthenticationUser(localStorage.getItem("token"));
  const authenticationPages = ["login", "register"];
  const adminPages = ["registerModules", "registerActivities", "registerAvatars"];

  !Object.keys(userData.value).length && isLoggedUser && (await getUser());

  if (!userData.value.isAdmin && adminPages.includes(to.name?.toString() || ""))
    return next({ name: "dashboard" });

  if (!isLoggedUser && !authenticationPages.includes(to.name?.toString() || ""))
    return next({ name: "login" });

  if (isLoggedUser && authenticationPages.includes(to.name?.toString() || ""))
    return next({ name: "dashboard" });

  next();
});
