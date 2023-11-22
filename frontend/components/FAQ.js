import React, { Component } from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQ",
  rows: [
    {
      title: "What are the Croats?",
      content:
        "Croatian people are complex and layered and this collection allows us to engage in a satirical play through characters from past, future, and alternative timelines. The NFTs in this collection are layered and have a picture behind a picture so each NFT hides another mysterious NFT that can, but does not have to be revealed. Revealing new NFTs is a risky activity that can be interesting but also dangerous, as there is a possibility that you will lose your NFT (Burn). The scarcity and rarity of the collection are dynamic, and the final appearance of the collection will depend on the owners of the collection and their activities. ",
    },
    {
      title: "How much does it cost?",
      content:
        "Mint was free. All Croats were minted out, you can now buy Croats NFT on the secondary markets like OpenSea, linked above.",
    },
    {
      title: "How do I get an NFT?",
      content:
        'The NFTs are located on the Polygon network, where fees are very low, but you need a Matic token. To get a Matic token, we recommend two ways. <br><br> 1. Visit <a style="color:#2563eb;" href="https://transferto.xyz/swap">transfer.to</a> if you already have some cryptocurrency on Ethereum or any of the EVM networks and transfer your ETH currency into Matic. <img style="height: 100%; width: 100%; object-fit: contain" src="https://bah5acgza43bdyuhqkcowunkn72555rufplelihg6b2xjoamkynvivio42lqa.bzz.link/transferto.png"/><br> 2. Another way would be to go to <a style="color:#2563eb;"  href="https://bitcoin-mjenjacnica.hr/#exchange/national_hr-HRK/coin-MATIC">bitcoin-mjenjacnica.hr</a>  where you can buy the Matic token for Croatian kuna and immediately receive it in your wallet. <img  style="height: 100%; width: 100%; object-fit: contain" src="https://bah5acgza43bdyuhqkcowunkn72555rufplelihg6b2xjoamkynvivio42lqa.bzz.link/mjenjacnica.png"/>',
    },
    {
      title: "What do we promise?",
      content:
        "Nothing. <p>&#128512;</p><br> A group of crypto enthusiasts has decided to gift this project to the local community so that we can all have fun and have something of our own. We will continue to experiment with NFTs, and owners may have some benefits down the road. This collection is dynamic and has an easter egg social experiment within the NFT. Ask around how to get it.",
    },
    {
      title: "Who owns the rights to the NFT art?",
      content:
        'The license is <a style="color:#2563eb;" href="https://creativecommons.org/share-your-work/public-domain/cc0/">CC0</a>, which means that the NFTs are issued as public domain, and anyone can use them for any purpose, including commercial purposes, without permission or attribution. ',
    },
    {
      title: "Help and community?",
      content:
        'If you need help with minting or want to discuss and suggest further activities for the Croats, you can contact a few places in the local community. <br> - <a style="color:#2563eb;" href="https://www.facebook.com/groups/334085863723507">Moj Kripto FB group</a>  <br> - <a style="color:#2563eb;" href="https://discord.gg/sUJQdNdzDJ7">Discord chanel</a> <br> - <a style="color:#2563eb;" href="https://t.me/ubikcommunity">UBIK telegram</a>',
    },
    {
      title: "Tech details and who made this?",
      content:
        'Produced by <a style="color:#2563eb;" href="https://twitter.com/nftguys_biz">NFT Guys</a>  <br> Smart contract can be found  <a style="color:#2563eb;" href="https://polygonscan.com/address/' +
        process.env.NEXT_PUBLIC_MINTER_ADDRESS +
        '">here</a>',
    },
    {
      title: "Disclaimers",
      content:
        "We do not support any regime or political ideology represented in this collection. We do not intend to offend or mock anyone.",
    },
  ],
  styles: {
    a: "blue",
  },
};

export default class App extends Component {
  render() {
    return (
      <div>
        <Faq data={data} />
      </div>
    );
  }
}
