function keyFor(group: string, exercise: string, variant: string) {
  return `gymforge.exerciseWeight:${group}:${exercise}:${variant}`;
}

export async function initDb(): Promise<void> {
  // nothing for web
}

export async function saveExerciseWeight(params: {
  group: string;
  exercise: string;
  variant: string;
  weight: number;
}): Promise<void> {
  try {
    window.localStorage.setItem(
      keyFor(params.group, params.exercise, params.variant),
      String(params.weight)
    );
  } catch {}
}

export async function getLatestExerciseWeight(params: {
  group: string;
  exercise: string;
  variant: string;
}): Promise<number | null> {
  try {
    const raw = window.localStorage.getItem(keyFor(params.group, params.exercise, params.variant));
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}