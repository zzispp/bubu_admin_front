import sol from "@/assets/logo/sol.svg"
import optimism from "@/assets/logo/optimism.svg"
import cardano from "@/assets/logo/cardano.svg"
import btc from "@/assets/logo/btc.svg"
import polygon from "@/assets/logo/polygon.svg"
import doge from "@/assets/logo/doge.svg"
import ton from "@/assets/logo/ton.svg"
import tether from "@/assets/logo/tether.svg"
import ethereum from "@/assets/logo/ethereum.svg"
import tron from "@/assets/logo/tron.svg"
import polkadot from "@/assets/logo/polkadot.svg"
import arbitrum from "@/assets/logo/arbitrum.svg"
import internet from "@/assets/logo/internet.svg"
import bnb from "@/assets/logo/bnb.svg"
import xrp from "@/assets/logo/xrp.svg"
import usdc from "@/assets/logo/usdc.svg"
import avax from "@/assets/logo/avax.svg"
import pepe from "@/assets/logo/pepe.svg"
import shiba from "@/assets/logo/shiba.svg"
import link from "@/assets/logo/link.svg"
import uni from "@/assets/logo/uni.svg"
import ankr from "@/assets/logo/ankr.svg"
import oneInch from "@/assets/logo/1inch.svg"
import bake from "@/assets/logo/bake.svg"
import pancake from "@/assets/logo/pancake.svg"

interface ILogo {
  src: string
  name: string
  href: string
  column: number
  row: number
}

export const logos: ILogo[] = [
  {
    src: tether,
    name: "Tether",
    href: "https://tether.to/",
    column: 1,
    row: 1,
  },
  {
    src: bnb,
    name: "BNB Chain",
    href: "https://www.bnbchain.org",
    column: 2,
    row: 1,
  },
  {
    src: btc,
    name: "Bitcoin",
    href: "https://bitcoin.org",
    column: 3,
    row: 1,
  },
  {
    src: ethereum,
    name: "Ethereum",
    href: "https://ethereum.org",
    column: 4,
    row: 1,
  },
  {
    src: xrp,
    name: "Ripple",
    href: "https://ripple.com/xrp",
    column: 5,
    row: 1,
  },
  {
    src: cardano,
    name: "Cardano",
    href: "https://cardano.org",
    column: 1,
    row: 2,
  },
  {
    src: polygon,
    name: "Polygon",
    href: "https://polygon.technology/",
    column: 2,
    row: 2,
  },
  {
    src: sol,
    name: "Solana",
    href: "https://solana.com",
    column: 3,
    row: 2,
  },
  {
    src: polkadot,
    name: "Polkadot",
    href: "https://polkadot.com",
    column: 4,
    row: 2,
  },
  {
    src: doge,
    name: "Dogecoin",
    href: "https://dogecoin.com",
    column: 5,
    row: 2,
  },
  {
    src: tron,
    name: "TRON",
    href: "https://tron.network",
    column: 1,
    row: 3,
  },
  {
    src: ton,
    name: "TON",
    href: "https://ton.org",
    column: 2,
    row: 3,
  },
  {
    src: internet,
    name: "Internet Computer",
    href: "https://internetcomputer.org",
    column: 3,
    row: 3,
  },
  {
    src: arbitrum,
    name: "Arbitrum",
    href: "https://arbitrum.io",
    column: 4,
    row: 3,
  },
  {
    src: optimism,
    name: "Optimism",
    href: "https://www.optimism.io",
    column: 5,
    row: 3,
  },
  {
    src: usdc,
    name: "USDC",
    href: "https://www.usdc.com",
    column: 1,
    row: 4,
  },
  {
    src: avax,
    name: "Avax Chain",
    href: "https://www.avax.network",
    column: 2,
    row: 4,
  },
  {
    src: pepe,
    name: "PePe Coin",
    href: "https://pepecoin.org",
    column: 3,
    row: 4,
  },
  {
    src: uni,
    name: "UniSwap Protocol",
    href: "https://uniswap.org",
    column: 4,
    row: 4,
  },
  {
    src: link,
    name: "Chainlink",
    href: "https://chain.link",
    column: 5,
    row: 4,
  },
  {
    src: ankr,
    name: "Ankr",
    href: "https://ankr.com",
    column: 1,
    row: 5,
  },
  {
    src: bake,
    name: "Bakeryswap",
    href: "https://www.bakeryswap.org",
    column: 2,
    row: 5,
  },
  {
    src: oneInch,
    name: "1inch",
    href: "https://1inch.io",
    column: 3,
    row: 5,
  },
  {
    src: pancake,
    name: "Pancakeswap",
    href: "https://pancakeswap.finance/",
    column: 4,
    row: 5,
  },
  {
    src: shiba,
    name: "Shiba Inu",
    href: "https://shibatoken.com",
    column: 5,
    row: 5,
  },
]
