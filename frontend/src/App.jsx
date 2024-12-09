import React from "react";
import SupportChat from "./admin/SupportChat";
import UlasanPengguna from  "./admin/UlasanPengguna";
import PemesananPenitipan from "./user/PemesananPenitipan";
import ManajemenPenitipanBarang from "./admin/ManajemenPenitipanBarang";

const App = () => {
  return (
    <div>
      <SupportChat />
      <UlasanPengguna />
      <PemesananPenitipan />
      <ManajemenPenitipanBarang />
    </div>
  );
};

export default App;
