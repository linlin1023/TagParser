
import doparse from "./doparse";
const tagparse = () => {
  var text = document.getElementById("text").value;
  document.getElementById("result").innerText = doparse(text);
};

window.onload = function () {
  const btn = document.getElementById("checkBtn");
  btn.onclick = tagparse;
};

