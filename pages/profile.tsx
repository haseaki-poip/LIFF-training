import { Liff } from "@line/liff/exports";
import { useEffect, useState } from "react";

type Props = { liff: Liff | null; liffError: string | null };

const Profile = ({ liff, liffError }: Props) => {
  const [name, setName] = useState("");
  useEffect(() => {
    if (!liff) return;
    liff
      .getProfile()
      .then((profile) => {
        const name = profile.displayName;
        setName(name);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [liff]);

  const logout = () => {
    if (!liff) return;
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  };

  return (
    <div>
      {name}
      <div onClick={() => logout()}>ログアウトする</div>
    </div>
  );
};

export default Profile;
