import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

interface Claim {
  id: string;
  claim: string;
  where: string;
  test: string;
  sandbox: string;
}

describe('claim manifest', () => {
  it('maps every declared claim to exactly one tagged browser test', async () => {
    const claims = JSON.parse(await readFile('.factory/claims.json', 'utf8')) as Claim[];
    const browserTests = await readFile('tests/e2e/claims.spec.ts', 'utf8');
    const ids = claims.map(({ id }) => id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const claim of claims) {
      expect(claim.claim.trim()).not.toBe('');
      expect(claim.where.trim()).not.toBe('');
      expect(claim.sandbox.trim()).not.toBe('');
      expect(claim.test).toBe(`npm test -- --grep @claim:${claim.id}`);
      expect(browserTests.match(new RegExp(`@claim:${claim.id}\\b`, 'g'))).toHaveLength(1);
    }

    const taggedIds = [...browserTests.matchAll(/@claim:([a-z0-9-]+)/g)].map((match) => match[1]);
    expect(taggedIds.sort()).toEqual([...ids].sort());
  });
});
