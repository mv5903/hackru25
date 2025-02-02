export default interface NavItemType {
    id: string;
    icon: string;
    label: string;
  }
  
export const navItems: NavItemType[] = [
    { id: "home", icon: "home", label: "Home" },
    { id: "explore", icon: "star", label: "Explore" },
    { id: "add", icon: "check", label: "Added" },
    { id: "achievements", icon: "trophy", label: "Achievements" },
    { id: "profile", icon: "account", label: "Profile" }
];
