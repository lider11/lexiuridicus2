import { spawn } from "node:child_process";
import http from "node:http";

const port = 3100;
const baseUrl = `http://127.0.0.1:${port}`;

function waitForServer(timeoutMs = 120_000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = http.get(baseUrl, (response) => {
        response.resume();
        resolve();
      });

      request.on("error", () => {
        if (Date.now() - startedAt > timeoutMs) {
          reject(new Error(`Server did not become ready at ${baseUrl}`));
          return;
        }

        setTimeout(check, 500);
      });

      request.setTimeout(5_000, () => {
        request.destroy();
      });
    };

    check();
  });
}

function killTree(processId) {
  if (!processId) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const command =
      process.platform === "win32"
        ? "taskkill"
        : process.kill(-processId, "SIGTERM");

    if (process.platform !== "win32") {
      resolve();
      return;
    }

    const killer = spawn(command, ["/pid", String(processId), "/T", "/F"], {
      stdio: "ignore",
    });
    killer.on("close", () => resolve());
    killer.on("error", () => resolve());
  });
}

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
  {
    detached: process.platform !== "win32",
    stdio: "inherit",
  },
);

try {
  await waitForServer();

  const exitCode = await new Promise((resolve) => {
    const testProcess = spawn(
      process.execPath,
      ["node_modules/@playwright/test/cli.js", "test"],
      {
        env: { ...process.env, PLAYWRIGHT_SKIP_WEBSERVER: "1" },
        stdio: "inherit",
      },
    );

    testProcess.on("close", (code) => resolve(code ?? 1));
    testProcess.on("error", () => resolve(1));
  });

  await killTree(server.pid);
  process.exit(exitCode);
} catch (error) {
  console.error(error);
  await killTree(server.pid);
  process.exit(1);
}
