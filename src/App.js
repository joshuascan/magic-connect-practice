import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import { ethers } from "ethers";

const customNodeOptions = {
  rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  chainId: 1,
};

const magic = new Magic("pk_live_645E2FEEEF10DA19", {
  network: customNodeOptions,
  extensions: [new ConnectExtension()],
});

const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

function App() {
  const [account, setAccount] = useState(null);
  const [walletInfo, setWalletInfo] = useState(null);

  const fetchWallet = async () => {
    const res = await magic.connect.getWalletInfo();
    setWalletInfo(res);
  };

  useEffect(() => {
    fetchWallet();
  }, [account]);

  const login = async () => {
    provider
      .listAccounts()
      .then((accounts) => setAccount(accounts[0]))
      .catch((error) => console.error(error));
  };

  const showWallet = () => {
    magic.connect.showWallet().catch((error) => {
      console.error(error);
    });
  };

  const disconnectWallet = async () => {
    await magic.connect.disconnect().catch((error) => console.error(error));
    setAccount(null);
    setWalletInfo(null);
  };

  return (
    <div className="mt-32 flex justify-center ">
      {!account && (
        <div className="flex flex-col items-center">
          <h1 className="text-white font-bold text-3xl">
            Wallet Not Connected
          </h1>
          <button
            onClick={login}
            className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-8 px-5 py-2.5"
          >
            Sign In
          </button>
        </div>
      )}

      {account && (
        <div>
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-white font-bold text-3xl">Wallet Address:</h2>
            <h2 className="text-white font-semibold italic text-2xl">
              {account}
            </h2>
            <h2 className="mt-6 text-white font-bold text-3xl">Wallet Type:</h2>
            <h2 className="text-white font-semibold italic text-2xl">
              {walletInfo?.walletType}
            </h2>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={showWallet}
              className="w-52 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-8 px-5 py-2.5"
            >
              Show Wallet
            </button>
            <button
              onClick={disconnectWallet}
              className="w-40 flex justify-center bg-red-900 border-gray-700 text-white hover:bg-red-700 active:bg-red-500 border rounded-lg font-semibold text-md mt-8 px-5 py-2.5"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
