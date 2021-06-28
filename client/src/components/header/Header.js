import React, { memo, useContext } from "react";
import AppContext from "../../AppContext";
import "./header.scss";

const HeaderMemo = memo(function ({ userId }) {
  return (
    <header>
      DeversiFI Demo APP | Client ID #<b>{userId}</b>
    </header>
  );
});

export function Header() {
  const [appState] = useContext(AppContext);
  return appState.userId && <HeaderMemo userId={appState.userId} />;
}
