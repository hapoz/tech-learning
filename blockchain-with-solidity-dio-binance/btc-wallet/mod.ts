import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { generateWallet } from "./generate-wallet.ts";

/**
 * Example usage:
 *
 * import { generateWallet } from "./mod.ts";
 * import * as bitcoin from "bitcoinjs-lib";
 *
 * const wallet = generateWallet(bitcoin.networks.testnet);
 * console.log("Address:", wallet.address);
 * // Do NOT log mnemonic/privateKey in production!
 */

const wallet = generateWallet(bitcoin.networks.testnet, "m/49'/1'/0'/0");

console.info(`Generated Wallet! 🚀
  ---
  Address: ${wallet.address}
  Private Key: ${wallet.node.toWIF()}
  Seed: ${wallet.mnemonic}
  ---
`);

/**
 * Validate a mnemonic phrase.
 * @param mnemonic - The mnemonic to validate
 * @returns True if valid, false otherwise
 */
export function isValidMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic);
}
export * from "./generate-wallet.ts";
