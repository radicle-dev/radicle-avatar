import * as avatar from "./index";
import fixtures from "../fixtures.json";

describe("generateAvatar", () => {
  it("generates identity avatars", () => {
    expect(avatar.generate("cloudhead", avatar.Usage.Identity)).toEqual({
      emoji: "🌻",
      background: { r: 24, g: 105, b: 216 },
    });
  });

  it("generates general purpose avatars", () => {
    expect(avatar.generate("monadic", avatar.Usage.Any)).toEqual({
      emoji: "🎮",
      background: { r: 148, g: 187, b: 61 },
    });
  });

  it("generates the same output as the rust implementation", () => {
    fixtures.forEach((fixture) => {
      expect(
        avatar.generate(
          fixture.input.input,
          fixture.input.usage as avatar.Usage
        )
      ).toEqual(fixture.output);
    });
  });
});

describe("fnv1aHash", () => {
  it("generates a hash", () => {
    expect(avatar.__test__.fnv1aHash("chongo was here!\n\0")).toEqual(
      BigInt("0xc33bce57bef63eaf")
    );
  });
});

describe("generateEmoji", () => {
  it("generates an emoji", () => {
    expect(
      avatar.__test__.generateEmoji("cloudhead", avatar.Usage.Identity)
    ).toEqual("🌻");
    expect(avatar.__test__.generateEmoji("radicle", avatar.Usage.Any)).toEqual(
      "☕\u{fe0f}"
    );
  });
});

describe("generateColor", () => {
  it("generates a color", () => {
    expect(avatar.__test__.generateColor("cloudhead")).toEqual({
      r: 40,
      g: 121,
      b: 232,
    });
    expect(avatar.__test__.generateColor("radicle")).toEqual({
      r: 255,
      g: 49,
      b: 16,
    });
  });
});

describe("compressColor", () => {
  it("compresses the range of a color towards the middle", () => {
    expect(avatar.__test__.compressColor({ r: 0, g: 0, b: 0 })).toEqual({
      r: 31,
      g: 31,
      b: 31,
    });
    expect(
      avatar.__test__.compressColor({ r: 0xff, g: 0xff, b: 0xff })
    ).toEqual({
      r: 224,
      g: 224,
      b: 224,
    });
    expect(avatar.__test__.compressColor({ r: 127, g: 127, b: 127 })).toEqual({
      r: 143,
      g: 143,
      b: 143,
    });
  });
});

describe("lightness", () => {
  it("calculates the lightness of a color", () => {
    expect(avatar.__test__.lightness({ r: 0, g: 0, b: 0 })).toEqual(0.0);
    expect(avatar.__test__.lightness({ r: 0xff, g: 0xff, b: 0xff })).toEqual(
      1.0
    );
    expect(avatar.__test__.lightness({ r: 127, g: 127, b: 127 })).toEqual(
      127.0 / 255.0
    );
  });
});

describe("lighten", () => {
  it("lightens a color by a specified amount", () => {
    expect(avatar.__test__.lighten({ r: 0, g: 0, b: 0 }, 1.0)).toEqual({
      r: 0xff,
      g: 0xff,
      b: 0xff,
    });
    expect(
      avatar.__test__.lighten({ r: 0xff, g: 0xff, b: 0xff }, -1.0)
    ).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });
    expect(avatar.__test__.lighten({ r: 0xff, g: 0xff, b: 0xff }, 1.0)).toEqual(
      {
        r: 0xff,
        g: 0xff,
        b: 0xff,
      }
    );
    expect(avatar.__test__.lighten({ r: 0, g: 0, b: 0 }, -1.0)).toEqual({
      r: 0,
      g: 0,
      b: 0,
    });
    expect(avatar.__test__.lighten({ r: 0, g: 0, b: 0 }, 0.5)).toEqual({
      r: 127,
      g: 127,
      b: 127,
    });
  });
});
