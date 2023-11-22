import ERC721 from "../contracts/Croats.json";

async function listTokensOfOwner(tokenAddress, account, provider, ethers) {
  const token = await new ethers.Contract(tokenAddress, ERC721.abi, provider);
  const sentLogs = await token.queryFilter(
    token.filters.Transfer(account, null)
  );
  const receivedLogs = await token.queryFilter(
    token.filters.Transfer(null, account)
  );

  const logs = sentLogs
    .concat(receivedLogs)
    .sort(
      (a, b) =>
        a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex
    );

  const owned = new Set();

  for (const {
    args: { from, to, tokenId },
  } of logs) {
    if (addressEqual(to, account)) {
      owned.add(tokenId.toString());
    } else if (addressEqual(from, account)) {
      owned.delete(tokenId.toString());
    }
  }

  return owned;
}

function addressEqual(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

async function getTokenName(tokenAddress, provider, ethers) {
  const token = await new ethers.Contract(tokenAddress, ERC721.abi, provider);

  return token.name();
}

export async function listOwner(token, account, provider, ethers) {
  const names = await getTokenName(token, provider, ethers);

  const owned = await listTokensOfOwner(token, account, provider, ethers);
  console.log([...owned].join("\n"));
}
