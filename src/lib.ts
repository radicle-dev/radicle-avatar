type Avatar = {
  emoji: string;
  background: Color;
};

interface Color {
  r: number;
  g: number;
  b: number;
}

export enum Usage {
  Any = "any",
  Identity = "identity",
}

const FNV_OFFSET_BASIS = BigInt("14695981039346656037");
const FNV_PRIME = BigInt("1099511628211");

const fnv1aHash = (input: string) => {
  let hash = FNV_OFFSET_BASIS;

  for (let i = 0; i < input.length; i++) {
    hash ^= BigInt(input.charCodeAt(i));
    hash = BigInt.asUintN(64, hash * FNV_PRIME);
  }

  return hash;
};

const generateEmoji = (input: string, usage: Usage) => {
  const hashedInput = fnv1aHash(input);

  switch (usage) {
    case Usage.Identity:
      const index = hashedInput % BigInt(EMOJIS.length + EMOJIS_USER.length);

      if (EMOJIS[Number(index)] !== undefined) {
        return EMOJIS[Number(index)];
      } else {
        return EMOJIS_USER[Number(index - BigInt(EMOJIS.length))];
      }
    case Usage.Any:
      return EMOJIS[Number(hashedInput % BigInt(EMOJIS.length))];
  }
};

const generateColor = (input: string) => {
  const hashedInput = fnv1aHash(input);
  const h = Number(hashedInput >> BigInt(40));

  return {
    r: h & 0x0000ff,
    g: (h & 0x00ff00) >> 8,
    b: (h & 0xff0000) >> 16,
  };
};

const compressColor = (color: Color) => {
  const l = lightness(color);

  if (l < 0.5) {
    return lighten(color, 0.125 * (1.0 - l));
  } else {
    return lighten(color, 0.125 * -l);
  }
};

const lightness = (color: Color) => {
  return (color.r / 255.0 + color.g / 255.0 + color.b / 255.0) / 3.0;
};

const lighten = (color: Color, amount: number) => {
  amount = Math.max(amount, -1.0);
  amount = Math.min(amount, 1.0);

  let x = Math.floor(Math.abs(amount) * 255.0);

  if (amount >= 0.0) {
    const r = Math.min(color.r + x, 255);
    const g = Math.min(color.g + x, 255);
    const b = Math.min(color.b + x, 255);

    return { r, g, b };
  } else {
    const r = Math.max(color.r - x, 0);
    const g = Math.max(color.g - x, 0);
    const b = Math.max(color.b - x, 0);

    return { r, g, b };
  }
};

export const generateAvatar = (input: string, usage: Usage): Avatar => {
  return {
    emoji: generateEmoji(input, usage),
    background: compressColor(generateColor(input)),
  };
};

export const __test__ = {
  fnv1aHash,
  generateEmoji,
  generateColor,
  compressColor,
  lightness,
  lighten,
};

const EMOJIS = [
  "👊",
  "✌️",
  "🤘",
  "👌",
  "👋",
  "👀",
  "🧠",
  "🧶",
  "🧵",
  "👠",
  "🥾",
  "🧤",
  "🧣",
  "🎩",
  "🧢",
  "🎓",
  "⛑",
  "👑",
  "👜",
  "💼",
  "🎒",
  "🧳",
  "👓",
  "🕶",
  "🥽",
  "🌂",
  "🛺",
  "🪂",
  "🪐",
  "🤿",
  "🪀",
  "🪁",
  "🪕",
  "🪔",
  "🪓",
  "🪑",
  "🪒",
  "🐣",
  "🐥",
  "🦆",
  "🦢",
  "🦉",
  "🦚",
  "🦜",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐚",
  "🐞",
  "🐜",
  "🦗",
  "🕷",
  "🦂",
  "🦟",
  "🦠",
  "🐢",
  "🐍",
  "🦎",
  "🦖",
  "🦕",
  "🐙",
  "🦑",
  "🦐",
  "🦀",
  "🐡",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🦈",
  "🐊",
  "🐅",
  "🐆",
  "🦓",
  "🦍",
  "🐘",
  "🦏",
  "🐪",
  "🐫",
  "🦙",
  "🦒",
  "🐃",
  "🐂",
  "🐄",
  "🐎",
  "🐖",
  "🐏",
  "🐑",
  "🐐",
  "🦌",
  "🐕",
  "🐩",
  "🐈",
  "🐓",
  "🦃",
  "🕊",
  "🐇",
  "🐁",
  "🐀",
  "🐿",
  "🦔",
  "🦧",
  "🦮",
  "🐕‍🦺",
  "🦥",
  "🦦",
  "🦨",
  "🦩",
  "☃️",
  "🐉",
  "🐲",
  "🌵",
  "🎄",
  "🌲",
  "🌳",
  "🌴",
  "🌿",
  "☘️",
  "🍀",
  "🎍",
  "🎋",
  "🍃",
  "🍂",
  "🍁",
  "🍄",
  "🌾",
  "💐",
  "🌷",
  "🌹",
  "🥀",
  "🌺",
  "🌸",
  "🌼",
  "🌻",
  "🌞",
  "🌝",
  "🌎",
  "🌍",
  "🌏",
  "💫",
  "⭐️",
  "🌟",
  "✨",
  "⚡️",
  "☄️",
  "💥",
  "🔥",
  "🌈",
  "☀️",
  "🌤",
  "⛅️",
  "☁️",
  "🌦",
  "🌩",
  "🌨",
  "❄️",
  "💨",
  "💧",
  "💦",
  "☔️",
  "☂️",
  "🌊",
  "🍏",
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🍈",
  "🍒",
  "🍑",
  "🍍",
  "🥭",
  "🥥",
  "🥝",
  "🍅",
  "🍆",
  "🥑",
  "🥦",
  "🥒",
  "🥬",
  "🌶",
  "🌽",
  "🥕",
  "🥔",
  "🍠",
  "🥐",
  "🍞",
  "🥖",
  "🥨",
  "🥯",
  "🧀",
  "🥚",
  "🍳",
  "🥞",
  "🥓",
  "🥩",
  "🍗",
  "🍖",
  "🌭",
  "🍔",
  "🍟",
  "🍕",
  "🥪",
  "🥙",
  "🌮",
  "🌯",
  "🥗",
  "🥘",
  "🥫",
  "🍝",
  "🍜",
  "🍲",
  "🍛",
  "🍣",
  "🍱",
  "🥟",
  "🍤",
  "🍙",
  "🍚",
  "🍘",
  "🍥",
  "🥮",
  "🥠",
  "🍢",
  "🍡",
  "🍧",
  "🍨",
  "🍦",
  "🥧",
  "🍰",
  "🎂",
  "🍮",
  "🍭",
  "🍬",
  "🍫",
  "🍿",
  "🧂",
  "🍩",
  "🍪",
  "🌰",
  "🥜",
  "🍯",
  "🥛",
  "🍼",
  "☕️",
  "🍵",
  "🥤",
  "🍶",
  "🍺",
  "🍻",
  "🥂",
  "🍷",
  "🥃",
  "🍸",
  "🍹",
  "🍾",
  "🥄",
  "🍴",
  "🍽",
  "🥣",
  "🥡",
  "🥢",
  "🧄",
  "🧅",
  "🧇",
  "🧆",
  "🧈",
  "🦪",
  "🧃",
  "🧉",
  "🧊",
  "⚽️",
  "🏀",
  "🏈",
  "⚾️",
  "🥎",
  "🏐",
  "🏉",
  "🎾",
  "🥏",
  "🎱",
  "🏓",
  "🏸",
  "🥅",
  "🏒",
  "🏑",
  "🥍",
  "🏏",
  "⛳️",
  "🏹",
  "🎣",
  "🥊",
  "🥋",
  "🎽",
  "⛸",
  "🥌",
  "🛷",
  "🛹",
  "🎿",
  "🎪",
  "🎤",
  "🎧",
  "🎹",
  "🥁",
  "🎷",
  "🎺",
  "🎸",
  "🎻",
  "🎲",
  "🎯",
  "🎳",
  "🎮",
  "🎰",
  "🗺",
  "🗿",
  "🚗",
  "🚕",
  "🚙",
  "🚌",
  "🚎",
  "🏎",
  "🚓",
  "🚑",
  "🚒",
  "🚐",
  "🚚",
  "🚛",
  "🚜",
  "🛴",
  "🚲",
  "🛵",
  "🏍",
  "🚨",
  "🚔",
  "🚍",
  "🚘",
  "🚖",
  "🚡",
  "🚠",
  "🚟",
  "🚃",
  "🚋",
  "🚞",
  "🚝",
  "🚄",
  "🚅",
  "🚈",
  "🚂",
  "🚆",
  "🚇",
  "🚊",
  "🚉",
  "✈️",
  "🛫",
  "🛬",
  "🛩",
  "💺",
  "🛰",
  "🚀",
  "🛸",
  "🚁",
  "🛶",
  "⛵️",
  "🚤",
  "🛥",
  "🛳",
  "⛴",
  "🚢",
  "⚓️",
  "⛽️",
  "🚧",
  "🗼",
  "🏰",
  "🏯",
  "🏟",
  "🎡",
  "🎢",
  "🎠",
  "⛲️",
  "⛱",
  "🏖",
  "🏝",
  "🏜",
  "🌋",
  "⛰",
  "🏔",
  "🗻",
  "🏕",
  "⛺️",
  "🏠",
  "🏡",
  "🏘",
  "🏚",
  "🏗",
  "🏭",
  "🏢",
  "⌚️",
  "🖲",
  "🕹",
  "🗜",
  "💽",
  "💾",
  "💿",
  "📀",
  "📼",
  "📷",
  "📸",
  "📹",
  "🎥",
  "📽",
  "📞",
  "☎️",
  "📟",
  "📠",
  "📺",
  "📻",
  "🎙",
  "🎚",
  "🎛",
  "⏱",
  "⏲",
  "⏰",
  "🕰",
  "⌛️",
  "⏳",
  "📡",
  "🔋",
  "🔌",
  "💡",
  "🔦",
  "🕯",
  "💎",
  "⚖️",
  "🔧",
  "🔨",
  "⚒",
  "🛠",
  "⛏",
  "🔩",
  "⚙️",
  "⛓",
  "🛡",
  "🧭",
  "🧱",
  "🔮",
  "🧿",
  "🧸",
  "💈",
  "⚗️",
  "🔭",
  "🧰",
  "🧲",
  "🧪",
  "🧫",
  "🧬",
  "🧯",
  "🔬",
  "🧴",
  "🧵",
  "🧶",
  "🧷",
  "🧹",
  "🧺",
  "🧻",
  "🧼",
  "🧽",
  "🛎",
  "🔑",
  "🗝",
  "🚪",
  "🛋",
  "🛏",
  "🛌",
  "🖼",
  "🛍",
  "🧳",
  "🛒",
  "🎁",
  "🎈",
  "🎏",
  "🎀",
  "🎊",
  "🎉",
  "🧨",
  "🎎",
  "🏮",
  "🎐",
  "🧧",
  "✉️",
  "📨",
  "📦",
  "🏷",
  "📫",
  "📮",
  "📯",
  "📇",
  "🗃",
  "🗳",
  "🗄",
  "📋",
  "📁",
  "🗂",
  "🗞",
  "📰",
  "📓",
  "📔",
  "📒",
  "📕",
  "📗",
  "📘",
  "📙",
  "📚",
  "📖",
  "🔖",
  "🔗",
  "📎",
  "🖇",
  "📐",
  "📏",
  "📌",
  "📍",
  "✂️",
  "🖊",
  "✒️",
  "🖍",
  "📝",
  "✏️",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🔊",
  "🔔",
  "📣",
  "📢",
  "💠",
];

const EMOJIS_USER = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😴",
  "😌",
  "😒",
  "🙃",
  "😲",
  "🤯",
  "😬",
  "🥵",
  "🥶",
  "😳",
  "🤪",
  "🤠",
  "🤡",
  "🥳",
  "🥴",
  "🥺",
  "🧐",
  "🤓",
  "😈",
  "👿",
  "👹",
  "👺",
  "💀",
  "👻",
  "👽",
  "🤖",
  "😺",
  "😸",
  " ",
  "😼",
  "😽",
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🦝",
  "🐻",
  "🐼",
  "🦘",
  "🦡",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐽",
  "🐸",
  "🐵",
  "🙈",
  "🙉",
  "🙊",
  "🐒",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
];
