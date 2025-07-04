import type { BIP32Interface } from "bip32";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import type { Network } from "bitcoinjs-lib";
import * as bitcoin from "bitcoinjs-lib";

export interface GenerateWalletResult {
  mnemonic: string;
  node: BIP32Interface;
  address?: string;
  publicKey: string;
  privateKeyWIF: string;
}

/**
 * Generate a new HD wallet (BIP49: P2SH-P2WPKH) for the given network and derivation path.
 * @param network - Bitcoin network (mainnet or testnet)
 * @param path - BIP32 derivation path (e.g., m/49'/1'/0'/0)
 * @returns Object containing mnemonic, node, and address
 */
export function generateWallet(
  network: Network,
  path: string = "m/49'/1'/0'/0",
): GenerateWalletResult {
  const mnemonic: string = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root: BIP32Interface = bip32.fromSeed(seed, network);
  const account: BIP32Interface = root.derivePath(path);
  const node: BIP32Interface = account.derive(0).derive(0);
  const { address } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network }),
    network,
  });
  return {
    mnemonic,
    node,
    address,
    publicKey: node.publicKey.toString("hex"),
    privateKeyWIF: node.toWIF(),
  };
}
