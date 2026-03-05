import { Platform } from "react-native";

let nativeDb: any = null;

function getNativeDb() {
  if (nativeDb) return nativeDb;

  // IMPORTANT: dynamic require (no top-level import)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const SQLite = require("expo-sqlite");

  nativeDb = SQLite.openDatabase("gymforge.db");
  return nativeDb;
}

// ---- web fallback (optional) ----
const WEB_KEY = "gymforge.weight.current";

function webGet(): number | null {
  try {
    const raw = window.localStorage.getItem(WEB_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function webSet(n: number) {
  try {
    window.localStorage.setItem(WEB_KEY, String(n));
  } catch {}
}

export async function initDb(): Promise<void> {
  if (Platform.OS === "web") return;

  const db = getNativeDb();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        const fail = (_tx: any, error: any) => {
          reject(error);
          return true;
        };

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS weight_entries (
            id INTEGER PRIMARY KEY NOT NULL,
            weight REAL NOT NULL,
            created_at TEXT NOT NULL
          );`,
          [],
          () => {},
          fail
        );
      },
      (err: any) => reject(err),
      () => resolve()
    );
  });
}

export async function saveWeight(weight: number): Promise<void> {
  if (Platform.OS === "web") {
    webSet(weight);
    return;
  }

  const db = getNativeDb();
  const created_at = new Date().toISOString();

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(
          `INSERT INTO weight_entries (weight, created_at) VALUES (?, ?);`,
          [weight, created_at],
          () => resolve(),
          (_tx: any, error: any) => {
            reject(error);
            return true;
          }
        );
      },
      (err: any) => reject(err)
    );
  });
}

export async function getLatestWeight(): Promise<number | null> {
  if (Platform.OS === "web") return webGet();

  const db = getNativeDb();
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: any) => {
        tx.executeSql(
          `SELECT weight FROM weight_entries ORDER BY id DESC LIMIT 1;`,
          [],
          (_tx: any, res: any) => {
            const row = res?.rows?.length ? res.rows.item(0) : null;
            resolve(row?.weight ?? null);
          },
          (_tx: any, error: any) => {
            reject(error);
            return true;
          }
        );
      },
      (err: any) => reject(err)
    );
  });
}