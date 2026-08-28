import { describe, expect, it } from 'vitest';
import { generateBrief, packetAsMarkdown, type BriefConfig } from '../../src/generator';

const base: BriefConfig = { genre: 'platformer', palette: 'moss', characters: 1, mechanic: 'collect' };

describe('brief generator', () => {
  it('keeps every cast size inside the 16–24 item limit', () => {
    expect(generateBrief({ ...base, characters: 1 }).assets).toHaveLength(18);
    expect(generateBrief({ ...base, characters: 2 }).assets).toHaveLength(20);
    expect(generateBrief({ ...base, characters: 3 }).assets).toHaveLength(22);
  });

  it('creates unique safe filenames', () => {
    const packet = generateBrief({ ...base, characters: 3 });
    const names = packet.assets.map((item) => item.filename);
    expect(new Set(names).size).toBe(names.length);
    expect(names.every((name) => /^[a-z0-9_]+\.png$/.test(name))).toBe(true);
  });

  it('exports all assets and all storyboard panels', () => {
    const packet = generateBrief(base);
    packet.completed.push(packet.assets[0].id);
    const markdown = packetAsMarkdown(packet);
    expect(markdown.match(/^- \[[ x]\]/gm)).toHaveLength(18);
    expect(markdown.match(/^\d\. /gm)).toHaveLength(6);
    expect(markdown).toContain('- [x] Main character: idle');
  });

  it('uses the correct article for every setting', () => {
    expect(generateBrief({ ...base, genre: 'platformer' }).concept).toContain('in a ruined greenhouse');
    expect(generateBrief({ ...base, genre: 'maze' }).concept).toContain('in an overgrown stone maze');
    expect(generateBrief({ ...base, genre: 'quest' }).concept).toContain('in a mossy courtyard');
  });
});
