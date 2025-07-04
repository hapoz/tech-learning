import { assert } from "@std/assert";
import * as bip39 from "bip39";
import * as bitcoin from "bitcoinjs-lib";
import { generateWallet } from "./generate-wallet.ts";

Deno.test("generateWallet returns a wallet object with expected properties", () => {
  const wallet = generateWallet(bitcoin.networks.testnet);
  assert(
    typeof wallet.address === "string" && wallet.address.length > 0,
    "Address should be a non-empty string",
  );
  assert(
    typeof wallet.mnemonic === "string" &&
      wallet.mnemonic.split(" ").length >= 12,
    "Mnemonic should be a valid string",
  );
  assert(
    typeof wallet.publicKey === "string" && wallet.publicKey.length > 0,
    "Public key should be a non-empty string",
  );
  assert(
    typeof wallet.privateKeyWIF === "string" && wallet.privateKeyWIF.length > 0,
    "Private key WIF should be a non-empty string",
  );
});

Deno.test("generateWallet produces a valid mnemonic", () => {
  const wallet = generateWallet(bitcoin.networks.testnet);
  assert(bip39.validateMnemonic(wallet.mnemonic), "Mnemonic should be valid");
});
