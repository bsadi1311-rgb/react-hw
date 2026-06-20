import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FolderIcon from "@mui/icons-material/Folder";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Sidebar = () => {
  return (
    <aside
      className="
      w-24
      h-screen
      bg-gradient-to-b
      from-blue-700
      to-indigo-900
      shadow-2xl
      flex
      flex-col
      items-center
      py-6
      "
    >
      {/* Logo */}

      <div
        className="
        w-14
        h-14
        rounded-2xl
        bg-white
        flex
        items-center
        justify-center
        text-blue-700
        shadow-lg
        mb-12
        "
      >
        <AccountBalanceWalletIcon />
      </div>

      {/* Menu */}

      <div className="flex flex-col gap-6">
        <button
          className="
          w-14
          h-14
          rounded-2xl
          bg-white/20
          text-white
          hover:bg-white
          hover:text-blue-700
          duration-300
          "
        >
          <DashboardIcon />
        </button>

        <button
          className="
          w-14
          h-14
          rounded-2xl
          text-white
          hover:bg-white
          hover:text-blue-700
          duration-300
          "
        >
          <PeopleIcon />
        </button>

        <button
          className="
          w-14
          h-14
          rounded-2xl
          text-white
          hover:bg-white
          hover:text-blue-700
          duration-300
          "
        >
          <FolderIcon />
        </button>

        <button
          className="
          w-14
          h-14
          rounded-2xl
          text-white
          hover:bg-white
          hover:text-blue-700
          duration-300
          "
        >
          <SettingsIcon />
        </button>
      </div>

      {/* Bottom */}

      <div className="mt-auto">
        <div
          className="
          w-12
          h-12
          rounded-full
          bg-white
          flex
          items-center
          justify-center
          font-bold
          text-blue-700
          "
        >
          S
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;