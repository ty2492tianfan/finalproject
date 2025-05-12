export const CONTRACT_ADDRESS = "0x0680E1cfB96a018c5c31E770276cEbb783ae68Bf";

export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "address", name: "student", type: "address" },
      { internalType: "string", name: "tokenURI", type: "string" },
    ],
    name: "issueDiploma",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
