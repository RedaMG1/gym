import * as SQLite from "expo-sqlite";

// Works with both old and new expo-sqlite
const SQLiteAny: any = SQLite;
const openDb =
  SQLiteAny.openDatabase ??
  SQLiteAny.openDatabaseSync ??
  SQLiteAny.default?.openDatabase ??
  SQLiteAny.default?.openDatabaseSync;

if (!openDb) throw new Error("expo-sqlite: no openDatabase/openDatabaseSync found");

export const db: any = openDb("gymforge.db");

export async function initDb(): Promise<void> {
  // Old API
  if (typeof db.transaction === "function") {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: any) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS exercise_weight_entries (
              id INTEGER PRIMARY KEY NOT NULL,
              group_name TEXT NOT NULL,
              exercise_key TEXT NOT NULL,
              variant_key TEXT NOT NULL,
              weight REAL NOT NULL,
              created_at TEXT NOT NULL
            );`,
            [],
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

  // New API
  if (typeof db.execAsync === "function") {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS exercise_weight_entries (
        id INTEGER PRIMARY KEY NOT NULL,
        group_name TEXT NOT NULL,
        exercise_key TEXT NOT NULL,
        variant_key TEXT NOT NULL,
        weight REAL NOT NULL,
        created_at TEXT NOT NULL
      );`
    );
    return;
  }

  throw new Error("expo-sqlite: unknown API (no transaction/execAsync)");
}

export async function saveExerciseWeight(params: {
  group: string;
  exercise: string;
  variant: string;
  weight: number;
}): Promise<void> {
  const created_at = new Date().toISOString();

  // Old API
  if (typeof db.transaction === "function") {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: any) => {
          tx.executeSql(
            `INSERT INTO exercise_weight_entries (group_name, exercise_key, variant_key, weight, created_at)
             VALUES (?, ?, ?, ?, ?);`,
            [params.group, params.exercise, params.variant, params.weight, created_at],
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

  // New API
  if (typeof db.runAsync === "function") {
    await db.runAsync(
      `INSERT INTO exercise_weight_entries (group_name, exercise_key, variant_key, weight, created_at)
       VALUES (?, ?, ?, ?, ?);`,
      [params.group, params.exercise, params.variant, params.weight, created_at]
    );
    return;
  }

  throw new Error("expo-sqlite: cannot insert (no executeSql/runAsync)");
}

export async function getLatestExerciseWeight(params: {
  group: string;
  exercise: string;
  variant: string;
}): Promise<number | null> {
  // Old API
  if (typeof db.transaction === "function") {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx: any) => {
          tx.executeSql(
            `SELECT weight
             FROM exercise_weight_entries
             WHERE group_name = ? AND exercise_key = ? AND variant_key = ?
             ORDER BY id DESC
             LIMIT 1;`,
            [params.group, params.exercise, params.variant],
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

  // New API
  if (typeof db.getFirstAsync === "function") {
    const row = await db.getFirstAsync(
      `SELECT weight
       FROM exercise_weight_entries
       WHERE group_name = ? AND exercise_key = ? AND variant_key = ?
       ORDER BY id DESC
       LIMIT 1;`,
      [params.group, params.exercise, params.variant]
    );
    return row?.weight ?? null;
  }

  throw new Error("expo-sqlite: cannot query (no executeSql/getFirstAsync)");
}