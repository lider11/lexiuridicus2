import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Uso: npm run admin:hash-password -- 'contraseña-de-12-o-más'");
  process.exitCode = 1;
} else {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  console.log(
    ["scrypt", "16384", "8", "1", salt.toString("base64"), hash.toString("base64")].join(
      "$",
    ),
  );
}
