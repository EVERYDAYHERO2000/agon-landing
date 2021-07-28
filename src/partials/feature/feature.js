export const renderFeature = () => {
  const $features = document.querySelectorAll(".feature");

  window.addEventListener("scroll", (e) => {
    if (window.innerWidth <= 580) {
      for (let i = 0; i < $features.length; i++) {
        const $currentFeature = $features[i];
        const $nextFeature = $features[i + 1] || null;
        const $currentScreen = $currentFeature.querySelector(".screen");
        const currentBBtop = $features[i].getBoundingClientRect().top;
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
        //const nextBB = ($features[i+1]) ? $features[i+1].getBoundingClientRect() : 0;
        //if (nextBB.top > 0) console.log(nextBB.top, $features[i+1])
      }
    }
  });

  /*
    for (let $f of $features) {
        const $card = $f.querySelector('.card');
        const color = window.getComputedStyle($f).backgroundColor;

        const $shadow = document.createElement('div');
        $shadow.classList.add('card__shadow');

        $card.append($shadow);

        $card.addEventListener('mousemove', (e)=> {
            
                $shadow.style.top = e.layerY + 'px';
                $shadow.style.left = e.layerX + 'px';
            
        });
    }
    */
};
