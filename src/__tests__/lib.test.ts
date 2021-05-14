import * as lib from "../lib";

describe("generateAvatar", () => {
  it("generates identity avatars", () => {
    expect(lib.generateAvatar("cloudhead", lib.Usage.Identity)).toEqual({
      emoji: "🌻",
      background: { r: 24, g: 105, b: 216 },
    });
  });

  it("generates general purpose avatars", () => {
    expect(lib.generateAvatar("monadic", lib.Usage.Any)).toEqual({
      emoji: "🎮",
      background: { r: 148, g: 187, b: 61 },
    });
  });
});

describe("fnv1aHash", () => {
  it("generates a hash", () => {
    expect(lib.__test__.fnv1aHash("chongo was here!\n\0")).toEqual(
      BigInt("0xc33bce57bef63eaf")
    );
  });
});

describe("generateEmoji", () => {
  it("generates an emoji", () => {
    expect(lib.__test__.generateEmoji("cloudhead", lib.Usage.Identity)).toEqual(
      "🌻"
    );
    expect(lib.__test__.generateEmoji("radicle", lib.Usage.Any)).toEqual(
      "☕\u{fe0f}"
    );
  });
});

describe("generateColor", () => {
  it("generates a color", () => {
    expect(lib.__test__.generateColor("cloudhead")).toEqual({
      r: 40,
      g: 121,
      b: 232,
    });
    expect(lib.__test__.generateColor("radicle")).toEqual({
      r: 255,
      g: 49,
      b: 16,
    });
  });
});

describe("compressColor", () => {
  it("compresses the range of a color towards the middle", () => {
    expect(lib.__test__.compressColor({ r: 0, g: 0, b: 0 })).toEqual({
      r: 31,
      g: 31,
      b: 31,
    });
    expect(lib.__test__.compressColor({ r: 0xff, g: 0xff, b: 0xff })).toEqual({
      r: 224,
      g: 224,
      b: 224,
    });
    expect(lib.__test__.compressColor({ r: 127, g: 127, b: 127 })).toEqual({
      r: 143,
      g: 143,
      b: 143,
    });
  });
});

describe("lightness", () => {
  it("calculates the lightness of a color", () => {
    expect(lib.__test__.lightness({ r: 0, g: 0, b: 0 })).toEqual(0.0);
    expect(lib.__test__.lightness({ r: 0xff, g: 0xff, b: 0xff })).toEqual(1.0);
    expect(lib.__test__.lightness({ r: 127, g: 127, b: 127 })).toEqual(
      127.0 / 255.0
    );
  });
});

describe("lighten", () => {
  it("lightens a color by a specified amount", () => {
    expect(lib.__test__.lighten({ r: 0, g: 0, b: 0 }, 1.0)).toEqual({
      r: 0xff,
      g: 0xff,
      b: 0xff,
    });
    expect(lib.__test__.lighten({ r: 0xff, g: 0xff, b: 0xff }, -1.0)).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });
    expect(lib.__test__.lighten({ r: 0xff, g: 0xff, b: 0xff }, 1.0)).toEqual({
      r: 0xff,
      g: 0xff,
      b: 0xff,
    });
    expect(lib.__test__.lighten({ r: 0, g: 0, b: 0 }, -1.0)).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });
    expect(lib.__test__.lighten({ r: 0, g: 0, b: 0 }, 0.5)).toEqual({
      r: 127,
      g: 127,
      b: 127,
    });
  });
});
