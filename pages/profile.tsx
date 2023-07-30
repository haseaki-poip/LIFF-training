import { Liff } from "@line/liff/exports";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  liff: Liff | null;
  liffError: string | null;
  setLiffObject: (liff: Liff | null) => void;
};

const Profile = ({ liff, liffError, setLiffObject }: Props) => {
  const [name, setName] = useState("");
  const router = useRouter();

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
      setLiffObject(null);
      window.location.reload();
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
