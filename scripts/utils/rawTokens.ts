import { TokenInfo } from "@uniswap/token-lists";
import oneledger from "../../src/oneledger.tokens.json";
import frankenstein from "../../src/frankenstein.tokens.json";

type IRawToken = Pick<TokenInfo, "address" | "name" | "symbol"> &
  Partial<Pick<TokenInfo, "logoURI" | "decimals">> & {
    isExperimental?: boolean;
    logoFile?: string;
  };

type IRawTokenListJson = readonly IRawToken[];

export const WEB3_NETWORK_NAMES = ["oneledger", "frankenstein"] as const;
export type IWeb3Network = typeof WEB3_NETWORK_NAMES[number];

// assert the JSON is valid
const rawTokensJson: {
  [network in IWeb3Network]: [number, IRawTokenListJson];
} = {
  oneledger: [311752642, oneledger],
  frankenstein: [4216137055, frankenstein],
};

export const getNetworkTokens = (network: IWeb3Network): IRawTokenListJson =>
  rawTokensJson[network][1];

export const rawTokens: readonly (IRawToken & {
  chainId: number;
})[] = Object.values(rawTokensJson).flatMap(([chainId, tokens]) =>
  tokens.map((tok) => ({ ...tok, chainId }))
);
