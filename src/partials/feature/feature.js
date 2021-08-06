export const renderFeature = () => {
  const $features = document.querySelectorAll(".feature");

  window.addEventListener("scroll", (e) => {
    if (window.innerWidth <= 580) {
      for (let i = 0; i < $features.length; i++) {
        const $currentFeature = $features[i];
        const $nextFeature = $features[i + 1] || null;
        const $currentScreen = $currentFeature.querySelector(".screen");
        const nextBBtop = $nextFeature
          ? $nextFeature.getBoundingClientRect().top
          : null;
        const windowHeight = window.innerHeight;

        if ($nextFeature) {
          if (nextBBtop < windowHeight) {
            $currentScreen.classList.add("screen__end-scroll");
          } else {
            $currentScreen.classList.remove("screen__end-scroll");
          }
        }
      }
    }
  });
};
