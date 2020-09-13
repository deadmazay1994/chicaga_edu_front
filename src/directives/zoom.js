export default {
  zoom: {
    inserted: function(el) {
      el.style.cursor = "pointer";
      let clicked = false;
      const k = 2;
      el.addEventListener("dblclick", function() {
        if (clicked) {
          el.classList.remove("zoom-wrapper");
          el.querySelector(".v-image__image").style.backgroundSize = 100 + "%";
          el.removeEventListener("mousemove", navigateBuyMouse);
          clicked = false;
        } else {
          el.querySelector(".v-image__image").style.backgroundSize =
            k * 100 + "%";
          el.classList.add("zoom-wrapper");
          el.addEventListener("mousemove", navigateBuyMouse);
          clicked = true;
        }
      });
    }
  }
};

// function addStyles(el, styles) {
//   for (const name in styles) {
//     el.style = name + ": " + styles[name];
//   }
// }

function navigateBuyMouse(e) {
  let coords = e.target.getBoundingClientRect();
  let xMin = coords.left;
  let yMin = coords.top;
  let newPosX = (e.clientX - xMin) / coords.width;
  let newPosY = (e.clientY - yMin) / coords.height;
  let positionX = newPosX * 120 + "%";
  let positionY = newPosY * 120 + "%";
  let img = document.querySelector(".zoom-wrapper .v-image__image");
  img.style.backgroundPosition = positionX + " " + positionY;
  // const xx = Math.min(1, e.clientX / t.clientWidth);
  // const yy = Math.min(1, e.clientY / t.clientHeight);
  // const block = document.querySelector(".zoom-wrapper");
  // if (block) {
  //   block.scrollLeft = (t.scrollWidth - t.clientWidth) * xx;
  //   block.scrollTop = (t.scrollHeight - t.clientHeight) * yy;
  // }
}
