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
  const [result, setResult] = useState("");
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
    if (!liff.isLoggedIn()) return;

    liff.logout();

    // LIFFで起動しているかどうか
    if (liff.isInClient()) {
      liff.closeWindow();
    } else {
      router.reload();
    }
  };

  const qrCodeRead = () => {
    if (!liff) return;

    liff
      .scanCodeV2()
      .then((result) => {
        setResult(result.value ?? "失敗");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div>
      {name}
      <div>qrcodeリーダー</div>
      <div onClick={() => qrCodeRead()}>qr結果: {result}</div>
      <div onClick={() => logout()}>ログアウトする</div>
    </div>
  );
};

export default Profile;
