export type GenreId = 'platformer' | 'maze' | 'quest';
export type PaletteId = 'moss' | 'ember' | 'moon' | 'berry';
export type MechanicId = 'collect' | 'dodge' | 'push' | 'light';

export interface BriefConfig {
  genre: GenreId;
  palette: PaletteId;
  characters: 1 | 2 | 3;
  mechanic: MechanicId;
}

export interface AssetItem {
  id: string;
  group: 'Characters' | 'World tiles' | 'Main mechanic' | 'Screen and effects';
  label: string;
  filename: string;
  size: string;
  prompt: string;
}

export interface BriefPacket {
  id: string;
  title: string;
  config: BriefConfig;
  concept: string;
  palette: { name: string; colors: string[] };
  assets: AssetItem[];
  story: string[];
  completed: string[];
  createdAt: string;
}

export const genres = {
  platformer: { label: 'Side-view platformer', place: 'ruined greenhouse', movement: 'run and hop' },
  maze: { label: 'Top-down maze', place: 'overgrown stone maze', movement: 'move through narrow paths' },
  quest: { label: 'Tiny top-down quest', place: 'mossy courtyard', movement: 'walk in four directions' },
} as const;

export const palettes = {
  moss: { label: 'Moss and stone', colors: ['#1B211C', '#375C35', '#B8D979', '#F3F0E7'] },
  ember: { label: 'Ember and ash', colors: ['#251C18', '#A64227', '#E4A853', '#F3E8D2'] },
  moon: { label: 'Moon and pond', colors: ['#17212B', '#355C68', '#9AC3B8', '#E8ECE6'] },
  berry: { label: 'Berry and chalk', colors: ['#291D2C', '#713C58', '#D18AA6', '#F4E7D8'] },
} as const;

export const mechanics = {
  collect: { label: 'Collect lost seeds', verb: 'collect every seed', object: 'seed' },
  dodge: { label: 'Dodge rolling stones', verb: 'cross without a hit', object: 'rolling stone' },
  push: { label: 'Push blocks into place', verb: 'open the blocked path', object: 'push block' },
  light: { label: 'Light sleeping beacons', verb: 'wake every beacon', object: 'beacon' },
} as const;

const characterNames = ['hero', 'friend', 'rival'];
const characterLabels = ['Main character', 'Helper', 'Friendly rival'];

const file = (name: string, size = 16) => `${name}_${size}.png`;

export function generateBrief(config: BriefConfig, now = new Date()): BriefPacket {
  const genre = genres[config.genre];
  const palette = palettes[config.palette];
  const mechanic = mechanics[config.mechanic];
  const assets: AssetItem[] = [];

  for (let index = 0; index < config.characters; index += 1) {
    const name = characterNames[index];
    const label = characterLabels[index];
    assets.push(
      asset(`${name}-idle`, 'Characters', `${label}: idle`, file(`${name}_idle`), '16×16', `Draw an original ${label.toLowerCase()} standing still. Use a clear silhouette and no known character details.`),
      asset(`${name}-move`, 'Characters', `${label}: move`, file(`${name}_move`, 32), '32×16', `Draw two movement frames for the ${label.toLowerCase()}. Keep the same shape and four-colour palette.`),
    );
  }

  assets.push(
    asset('ground', 'World tiles', 'Ground tile', file('tile_ground'), '16×16', `Draw a repeatable ground tile for an ${genre.place}. Keep every outer edge simple.`),
    asset('wall', 'World tiles', config.genre === 'platformer' ? 'Platform tile' : 'Wall tile', file('tile_wall'), '16×16', `Draw one solid ${config.genre === 'platformer' ? 'platform' : 'wall'} tile with a strong top edge.`),
    asset('corner', 'World tiles', 'Corner tile', file('tile_corner'), '16×16', 'Draw one inside corner that connects the ground and solid tile.'),
    asset('background', 'World tiles', 'Simple background', file('background', 160), '160×90', `Draw a quiet ${genre.place} background. Leave room for the playable shapes.`),
    asset('start', 'World tiles', 'Start marker', file('marker_start'), '16×16', 'Draw an original start marker that reads clearly without letters.'),
    asset('goal', 'World tiles', 'Goal marker', file('marker_goal'), '16×16', 'Draw an original goal marker that looks different from the start marker.'),
    asset('object', 'Main mechanic', mechanic.label.replace(/^\w/, (letter) => letter.toUpperCase()), file(`object_${mechanic.object.replace(' ', '_')}`), '16×16', `Draw one original ${mechanic.object}. Make it readable at 16 pixels.`),
    asset('object-active', 'Main mechanic', `${mechanic.object.replace(/^\w/, (letter) => letter.toUpperCase())}: active`, file(`object_${mechanic.object.replace(' ', '_')}_active`), '16×16', `Draw the ${mechanic.object} after the player uses it. Change both shape and brightness.`),
    asset('hazard', 'Main mechanic', 'One obstacle', file('obstacle'), '16×16', `Draw one simple obstacle for a game where players ${mechanic.verb}.`),
    asset('reward', 'Main mechanic', 'Finish reward', file('reward'), '16×16', 'Draw a small original reward with a different outline from every game object.'),
    asset('title', 'Screen and effects', 'Title card', file('title_card', 160), '160×48', 'Draw a plain title frame. Add the game name later with your own letters.'),
    asset('heart-full', 'Screen and effects', 'Full life mark', file('life_full'), '8×8', 'Draw a filled life mark using a simple original shape.'),
    asset('heart-empty', 'Screen and effects', 'Empty life mark', file('life_empty'), '8×8', 'Draw the matching empty life mark with a broken centre.'),
    asset('effect', 'Screen and effects', 'Action puff', file('effect_puff', 32), '32×16', 'Draw two tiny effect frames for a jump, bump, or pickup.'),
    asset('numbers', 'Screen and effects', 'Number strip', file('numbers', 80), '80×8', 'Draw the digits zero through nine in one readable eight-pixel style.'),
    asset('finish-effect', 'Screen and effects', 'Finish burst', file('effect_finish', 48), '48×16', 'Draw three small frames for the moment the player reaches the goal.'),
  );

  const titleWords = {
    moss: 'Moss', ember: 'Ember', moon: 'Moon', berry: 'Bramble',
  } as const;
  const mechanicWords = {
    collect: 'Seed Run', dodge: 'Stone Step', push: 'Block Path', light: 'Beacon Night',
  } as const;

  return {
    id: `brief-${config.genre}-${config.palette}-${config.characters}-${config.mechanic}`,
    title: `${titleWords[config.palette]} ${mechanicWords[config.mechanic]}`,
    config: { ...config },
    concept: `Make a ${genre.label.toLowerCase()} in an ${genre.place}. ${config.characters === 1 ? 'One character' : `${config.characters} characters`} ${genre.movement} and ${mechanic.verb}. Use only the four colours below. Create original shapes without references to known games or characters.`,
    palette: { name: palette.label, colors: [...palette.colors] },
    assets,
    story: [
      `Show the ${genre.place} and the start marker.`,
      `Show the main character learning to ${genre.movement}.`,
      `Introduce the ${mechanic.object} with no danger nearby.`,
      `Place the obstacle between the character and the next ${mechanic.object}.`,
      `Show the final action needed to ${mechanic.verb}.`,
      'Show the reward beside the goal marker.',
    ],
    completed: [],
    createdAt: now.toISOString(),
  };
}

function asset(id: string, group: AssetItem['group'], label: string, filename: string, size: string, prompt: string): AssetItem {
  return { id, group, label, filename, size, prompt };
}

export function packetAsMarkdown(packet: BriefPacket): string {
  const groups = groupAssets(packet.assets);
  const lines = [
    `# ${packet.title} — pixel art brief`,
    '',
    packet.concept,
    '',
    `Palette: ${packet.palette.name} — ${packet.palette.colors.join(', ')}`,
    '',
  ];
  for (const [group, items] of groups) {
    lines.push(`## ${group}`, '');
    for (const item of items) {
      const checked = packet.completed.includes(item.id) ? 'x' : ' ';
      lines.push(`- [${checked}] ${item.label} — \`${item.filename}\` — ${item.size}`, `  ${item.prompt}`);
    }
    lines.push('');
  }
  lines.push('## Six-panel storyboard', '');
  packet.story.forEach((line, index) => lines.push(`${index + 1}. ${line}`));
  lines.push('', 'Made with Pixel Brief Builder.');
  return lines.join('\n');
}

export function groupAssets(assets: AssetItem[]): Map<AssetItem['group'], AssetItem[]> {
  const groups = new Map<AssetItem['group'], AssetItem[]>();
  for (const item of assets) {
    const entries = groups.get(item.group) ?? [];
    entries.push(item);
    groups.set(item.group, entries);
  }
  return groups;
}
