import jsSHA from "jssha";
import CryptoJS from "crypto-js";

export const generateBinarySeed = (mnemonic: string): string => {
  const salt = "mnemonic";
  const iterationCount = 2048;
  const derivedKeyLength = 64;

  const seed = CryptoJS.PBKDF2(mnemonic, salt, {
    iterations: iterationCount,
    keySize: derivedKeyLength / 4, // Key size is specified in words, so divide by 4
    hasher: CryptoJS.algo.SHA512,
  });

  const binarySeed = CryptoJS.enc.Hex.parse(seed.toString());
  const hexStr = binarySeed.toString(CryptoJS.enc.Hex);
  const bin2hex = (s: string) => {
    let i;
    let l;
    let o = "";
    let n;
    s += "";
    for (i = 0, l = s.length; i < l; i++) {
      n = s.charCodeAt(i).toString(16);
      o += n.length < 2 ? "0" + n : n;
    }
    return o;
  };
  const binStr = bin2hex(hexStr);
  const shortBinStr = binStr.slice(0, 64);
  return shortBinStr;
};
export const mustBeTrue = (v: boolean) => v === true;

export const verifyGame = (() => {
  // Initiate variables here if needed
  // let ctx_clientSeed: string;
  // let ctx_serverSeed: string;
  // let ctx_nonce: number | null;
  const generateFloats = async (
    cursor = 0,
    count = 1,
    range: number[] | null = null,
    clientSeed: string | null = null,
    serverSeed: string | null = null,
    nonce: number | null = null
  ) => {
    // Random number generator function
    let rng = byteGenerator(cursor, clientSeed, serverSeed, nonce);
    // Declare bytes as empty array
    let bytes = [];

    // Populate bytes array with sets of 4 from RNG output
    while (bytes.length < count * 4) {
      let item = await rng.next();
      bytes.push(item?.value);
    }
    // Return bytes as floats
    let floats: number[] = [];
    let byteChunks = chunkArray(bytes, 4);
    for (let bytesChunk of byteChunks) {
      let result = 0;
      for (let i = 0; i < bytesChunk.length; i++) {
        let divider = Math.pow(256, i + 1);
        let partialResult = bytesChunk[i] / divider;
        result += partialResult;
      }

      if (range && range.length > 0) {
        // Scale the result to the desired range
        let scaledResult = result * (range[1] - range[0]) + range[0];
        let intResult = scaledResult;
        while (floats.includes(intResult)) {
          intResult++;
          if (intResult > range[1]) {
            intResult = range[0];
          }
        }

        floats.push(intResult);
      } else {
        floats.push(result);
      }
    }

    return floats;
  };

  const chunkArray = (array: Array<any>, chunk_size: number) => {
    var results = [];

    while (array.length) {
      results.push(array.splice(0, chunk_size));
    }

    return results;
  };

  const byteGenerator = async function* (
    cursor = 0,
    clientSeed: string | null = null,
    serverSeed: string | null = null,
    nonce: number | null = null
  ) {
    // Setup cursor variables
    let currentRound = Math.floor(cursor / 32);
    let currentRoundCursor = cursor;
    currentRoundCursor -= currentRound * 32;

    if (clientSeed && serverSeed) {
      // ctx_nonce = nonce;
      // ctx_clientSeed = clientSeed;
      // ctx_serverSeed = serverSeed;
    }

    // Generate outputs until cursor requirement is fulfilled
    while (true) {
      // HMAC function used to output provided inputs into bytes
      let hmac = createHmac(
        "SHA-256",
        clientSeed + ":" + nonce + ":" + currentRound,
        serverSeed
      );
      let buffer = new Uint8Array(str2ab(hmac));
      // Update cursor for next iteration of loop
      while (currentRoundCursor < 32) {
        // The yield keyword is used in a Generator function, similar to JavaScript's function* syntax
        yield buffer[currentRoundCursor];
        currentRoundCursor++;
      }
      currentRoundCursor = 0;
      currentRound++;
    }
  };

  const createHmac = (algorithm: string, text: string, key: string | null) => {
    let shaObj = new jsSHA(algorithm, "TEXT");
    shaObj.setHMACKey(key, "TEXT");
    shaObj.update(text);
    return shaObj.getHMAC("BYTES");
  };

  const str2ab = (str: string) => {
    let buf = new ArrayBuffer(str.length);
    let bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  };
  // Return the public methods of the class
  return {
    generateFloats,
    chunkArray,
    byteGenerator,
    createHmac,
    str2ab,
    generateBinarySeed,
  };
})();
