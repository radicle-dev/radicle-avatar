# radicle-avatar

A library for generating emoji-color combinations which serve as avatars in
Radicle clients.

Example:
```
assert_eq!(
    Avatar::from("cloudhead", Usage::Identity),
    Avatar {
        emoji: "🌻".to_string(),
        background: Color::new(24, 105, 216)
    }
);
```

Have a look at the [tests][te] for more hints on how to use this library.


[te]: https://github.com/radicle-dev/radicle-avatar/blob/main/src/lib.rs
