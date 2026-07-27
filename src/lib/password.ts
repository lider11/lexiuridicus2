import { scryptSync, timingSafeEqual } from "node:crypto";

export function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, cost, blockSize, parallelism, salt, expected] =
    encodedHash.split("$");
  if (
    algorithm !== "scrypt" ||
    !cost ||
    !blockSize ||
    !parallelism ||
    !salt ||
    !expected
  ) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected, "base64");
  const actualBuffer = scryptSync(password, Buffer.from(salt, "base64"), 64, {
    N: Number(cost),
    r: Number(blockSize),
    p: Number(parallelism),
    maxmem: 64 * 1024 * 1024,
  });

  return (
    expectedBuffer.length === actualBuffer.length &&
    timingSafeEqual(expectedBuffer, actualBuffer)
  );
}
