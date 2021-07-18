export let windowWidth = window.innerWidth > 800 ? 800 : window.innerWidth;
export let windowLeftMargin = (window.innerWidth - windowWidth) / 2;
export let windowTopMargin = calculateWindowTopMargin();

window.addEventListener("resize", onWindowLoad);
window.addEventListener("load", onWindowLoad);

function onWindowLoad() {
  windowWidth = window.innerWidth > 800 ? 800 : window.innerWidth;

  windowLeftMargin = (window.innerWidth - windowWidth) / 2;

  windowTopMargin = calculateWindowTopMargin();
}

function calculateWindowTopMargin() {
  if (window.innerWidth <= 500 && window.innerHeight >= 600) {
    return 100;
  }

  return 0;
}
