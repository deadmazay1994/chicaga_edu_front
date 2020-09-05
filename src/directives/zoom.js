export default {
  zoom: {
    inserted: function(el) {
      let clicked = false;
      const k = 2;
      el.addEventListener("dblclick", function() {
        if (clicked) {
          addStyles(el.parentElement, {
            width: "auto",
            height: "auto"
          });
          addStyles(el, {
            width: el.offsetWidth / k + "px",
            height: el.offsetHeight / k + "px",
            "max-width": "100%"
          });
          clicked = false;
          el.removeEventListener("mousemove", navigateBuyMouse);
          el.parentElement.classList.remove("zoom-wrapper");
        } else {
          addStyles(el.parentElement, {
            width: el.parentElement.offsetWidth + "px",
            height: el.parentElement.offsetHeight + "px"
          });
          addStyles(el, {
            width: el.offsetWidth * k + "px",
            height: el.offsetHeight * k + "px",
            "max-width": "ineterit"
          });
          el.parentElement.classList.add("zoom-wrapper");
          el.parentElement.addEventListener("mousemove", navigateBuyMouse);
          clicked = true;
        }
      });
    }
  }
};

function addStyles(el, styles) {
  for (const name in styles) {
    el.style = name + ": " + styles[name];
  }
}

function navigateBuyMouse(e) {
  const t = e.currentTarget;
  const xx = Math.min(1, e.clientX / t.clientWidth);
  const yy = Math.min(1, e.clientY / t.clientHeight);
  const block = document.querySelector(".zoom-wrapper");
  if (block) {
    block.scrollLeft = (t.scrollWidth - t.clientWidth) * xx;
    block.scrollTop = (t.scrollHeight - t.clientHeight) * yy;
  }
}
