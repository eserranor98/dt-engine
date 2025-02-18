export type IFDisplayMode = "inline" | "img";

export interface IFAsset {
  mode: IFDisplayMode;
  identifier: string;
  url: string;
}

export const siteAssets: IFAsset[] = [
  {
    mode: "img",
    identifier: "background",
    url: "https://gngjnqdhu7.ufs.sh/f/hdVjhdh072XrfoPf2gRYP3HBygzsY9CVGbdqpekf5juILWET",
  },
  {
    mode: "img",
    identifier: "trees",
    url: "https://gngjnqdhu7.ufs.sh/f/hdVjhdh072Xrkad6EexbWxs6zd5AnpLyBh8XCvH9PMDqUYVR",
  },
  {
    mode: "inline",
    identifier: "segments",
    url: "https://gngjnqdhu7.ufs.sh/f/hdVjhdh072Xr5oLh0LS8AXJDQ0YqFrIUTWscvd7oeRiV2Mx1",
  },
];
