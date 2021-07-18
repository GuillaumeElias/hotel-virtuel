export let windowWidth = window.innerWidth > 800 ? 800 : window.innerWidth;
export let windowLeftMargin = (window.innerWidth - windowWidth) / 2;
export let windowTopMargin = calculateWindowTopMargin();
export let windowHeight = window.innerHeight - windowTopMargin;

window.addEventListener("resize", onWindowLoad);
window.addEventListener("load", onWindowLoad);

function onWindowLoad() {
  windowWidth = window.innerWidth > 800 ? 800 : window.innerWidth;

  windowLeftMargin = (window.innerWidth - windowWidth) / 2;

  windowTopMargin = calculateWindowTopMargin();

  windowHeight = window.innerHeight - windowTopMargin;
}

function calculateWindowTopMargin() {
  if (window.innerWidth <= 500 && window.innerHeight >= 600) {
    return 100;
  }

  return 0;
}

export const computeElementY = (originalWidth, originalHeight, width, row) => {
  const ratio = width / originalWidth;

  const height = originalHeight * ratio;
  
  return (windowHeight / 4) * row - height / 2;
}
