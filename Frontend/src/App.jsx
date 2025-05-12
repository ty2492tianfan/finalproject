import React, { useState } from "react";
import { ethers } from "ethers";
import DiplomaNFT from "../artifacts/contracts/DiplomaNFT.sol/DiplomaNFT.json";

const CONTRACT_ADDRESS = "0x35DF495f42b804Fa8a36ceEf9EDE27DA1Ad8169F";

function App() {
  const [studentAddress, setStudentAddress] = useState("");
  const [metadataURI, setMetadataURI] = useState("");
  const [status, setStatus] = useState("");
  const [imageURL, setImageURL] = useState("");

  const issueDiploma = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        DiplomaNFT.abi,
        signer
      );

      setStatus("Sending transaction...");
      const tx = await contract.issueDiploma(studentAddress, metadataURI);
      await tx.wait();
      setStatus("\u2705 Diploma issued!");

      const res = await fetch(metadataURI);
      const metadata = await res.json();
      const finalImage = metadata.image.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
      );
      setImageURL(finalImage);
    } catch (error) {
      console.error(error);
      setStatus("\u274C Error issuing diploma");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Diploma NFT DApp</h1>

      <input
        type="text"
        placeholder="Student Wallet Address"
        value={studentAddress}
        onChange={(e) => setStudentAddress(e.target.value)}
        style={{ width: "400px", marginBottom: "10px", display: "block" }}
      />
      <input
        type="text"
        placeholder="Metadata URI (IPFS)"
        value={metadataURI}
        onChange={(e) => setMetadataURI(e.target.value)}
        style={{ width: "400px", marginBottom: "10px", display: "block" }}
      />

      <button onClick={issueDiploma}>Issue Diploma</button>

      <p>{status}</p>

      {imageURL && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>Your Diploma:</h3>
          <img src={imageURL} alt="Diploma NFT" style={{ maxWidth: "400px" }} />
        </div>
      )}
    </div>
  );
}

export default App;
