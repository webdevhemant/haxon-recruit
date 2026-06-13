/** Deterministic placeholder profile photo for a given seed. */
export const avatarUrl = (seed: string) =>
  `https://i.pravatar.cc/120?u=${encodeURIComponent(seed)}`
