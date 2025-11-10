// Conditionally export SplitText only on client side to avoid SSR errors
/** @type {any} */
let SplitTextExport;

if (typeof window !== 'undefined') {
  // Client-side: import the actual SplitText plugin
  try {
    SplitTextExport = require("./gsap-split-text").default;
  } catch (e) {
    // Fallback if import fails
    SplitTextExport = null;
  }
}

if (!SplitTextExport) {
  // Server-side or fallback: create a no-op SplitText to prevent SSR errors
  SplitTextExport = class SplitText {
    constructor() {
      this.chars = [];
      this.words = [];
      this.lines = [];
      this._originals = [];
      this.isSplit = false;
    }
    split() { return this; }
    revert() { return this; }
  };
  SplitTextExport.create = function() { return new SplitTextExport(); };
  SplitTextExport.version = "3.11.2";
}

export { SplitTextExport as SplitText };
export { default as ScrollTrigger } from "./gsap-scroll-trigger";
export { default as ScrollSmoother } from "./gsap-scroll-smoother";
export { default as cursorAnimation } from "./tp-cursor";
export { default as chroma } from "./chroma.min";
export { default as WebGL } from "./webgl";