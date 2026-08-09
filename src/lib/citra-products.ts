export const CITRA_PRODUCTS = [
  {
    id: "grove",
    name: "CITRA Grove",
    flavor: "グリーンシトラス",
    blurb:
      "青みのある柑橘をイメージした、すっきりした炭酸飲料です。甘さは控えめで後味が軽く、食事中や休憩のひとときにお勧め。冷たくして飲むのがおすすめです。",
    imageSrc: "/products/Product_1.png",
    panelColor: "#94C145",
  },
  {
    id: "half-cut",
    name: "CITRA Half Cut",
    flavor: "ハーフカットシトラス",
    blurb:
      "スッキリとして甘さで、果汁感のある味わいが特長です。冷やして飲むと爽快感が増し、のどごしのよいスパークリングとして楽しめます。リフレッシュしたい時におすすめです。",
    imageSrc: "/products/Product_2.png",
    panelColor: "#6A9841",
  },
  {
    id: "mist",
    name: "CITRA Mist",
    flavor: "ミスティグリーン",
    blurb:
      "濃い目の柑橘フレーバーで、炭酸は軽めです。香りの強さと酸味が効いているので、暑い日に飲むドリンクとしておすすめです。",
    imageSrc: "/products/Product_3.png",
    panelColor: "#2A9A30",
  },
  {
    id: "duo",
    name: "CITRA Duo",
    flavor: "デュアルシトラス",
    blurb:
      "まるごとの柑橘の香りと、カットした果肉の風味をまとめたブレンドです。コクと爽快感のバランスがよく、一本で違いを感じたいときにおすすめです。",
    imageSrc: "/products/Product_4.png",
    panelColor: "#2A9A75",
  },
  {
    id: "ribbon",
    name: "CITRA Ribbon",
    flavor: "ピール＆パルプ",
    blurb:
      "皮寄りの香りと、果肉のやさしい甘みを重ねたシトラスです。飲み終わりまで味が続きやすく、食後や気分転換にも合わせやすい一本です。",
    imageSrc: "/products/Product_5.png",
    panelColor: "#3096A3",
  },
] as const;

export type CitraProduct = (typeof CITRA_PRODUCTS)[number];

export const PRODUCT_PANEL = {
  width: 180,
  height: 380,
  imageWidth: 114,
  imageHeight: 304,
  endRadius: 20,
  /** Expanded active panel: can inset from left edge. */
  activeImageLeft: 100,
  /** Expanded active panel: copy block inset from left edge. */
  activeCopyLeft: 300,
  /** Expanded width for the active accordion panel (slots 1–4). */
  expandedWidth: 180 * 4,
  /** Zoom / tilt at local progress = 1 (Grove story). */
  activeImageScale: 1.75,
  activeImageRotateDeg: -4,
} as const;
