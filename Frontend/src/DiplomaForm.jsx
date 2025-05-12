import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";

export default function DiplomaForm() {
  const [student, setStudent] = useState("");
  const [uri, setUri] = useState("");
  const [status, setStatus] = useState("");

  const issueDiploma = async () => {
    try {
      if (!window.ethereum) return alert("Install MetaMask");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.issueDiploma(student, uri);
      setStatus("Transaction sent. Waiting...");
      await tx.wait();
      setStatus("✅ Diploma issued!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to issue diploma.");
    }
  };

  return (
    <div>
      <h2>🎓 Issue Diploma NFT</h2>
      <input
        placeholder="Student address"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
      />
      <input
        placeholder="Metadata URI"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
      />
      <button onClick={issueDiploma}>Issue Diploma</button>
      <p>{status}</p>
    </div>
  );
}
