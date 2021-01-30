export let windowWidth = window.innerWidth > 800 ? 800 : window.innerWidth;
export let windowLeftMargin = (window.innerWidth - windowWidth) / 2;

window.addEventListener("resize", function () {
  windowWidth = window.innerWidth > 800 ? 800 : window.innerWidth;

  windowLeftMargin = (window.innerWidth - windowWidth) / 2;
});
