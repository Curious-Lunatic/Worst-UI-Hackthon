const lipsumText = `<p>Oh Shit We are Back!</p>
<p><b>CONGRATULATIONS!!</b><br>YOU HAVE SUCCESSFULLY LOGGED IN TO THE WORST WEBSITE :D</p>
<p>LesS Go! OsDg teaM pleasEee lEt me win. PleassseeeE 😭</p>
<p>JK..HoPe yOu liKed this ShittY weBsITe (this is the most beautiful website i have created till now.....). The WhOOLe haCkatHon wAs such A cOol ideA. Props to you all.</p>
<p>Ummm ok Ig this is OvEr then.....No More Suffering from my Dead Humour! Yipppeee!!</p>
<p>Bugselona (Hope there is no actual bugs tho 🥀)</p>
<p><img src="https://i.ibb.co/WpjwkncS/Acha.png" alt="Acha" style="max-width: 80%; height: auto; margin-top: 20px; border-radius: 10px;" /></p>
<p>




Why are u still reading???<p>
`;

var spinnerProgress = 0;
var mouseIsDown = false;
var previousPos = undefined;
var progressNum;
var lipsum;
var canv;
var ctx;
var rect;

window.onload = function () {
  progressNum = document.getElementById("progress-num");
  lipsum = document.getElementById("lipsum");
  canv = document.getElementById("spinner-canvas");
  ctx = canv.getContext("2d");
  rect = canv.getBoundingClientRect();
  progressNum.innerHTML = `Loading... ${+spinnerProgress.toFixed(1)}%`;

  canv.addEventListener("mousedown", onMouseDown);
  canv.addEventListener("mousemove", onMouseMove);
  canv.addEventListener("mouseup", onMouseUp);

  drawSpinner();
}

function onMouseDown(event) {
  mouseIsDown = true;
  let radialPos = calculateRadians(event.pageX, event.pageY);
  previousPos = radialPos;
}

function onMouseUp(event) {
  mouseIsDown = false;
  previousPos = undefined;
}

function onMouseMove(event) {
  if (mouseIsDown === true) {
    let radialPos = calculateRadians(event.pageX, event.pageY);
    let delta = (radialPos - previousPos) % (2 * Math.PI);
    previousPos = radialPos;

    if (delta > 4.75) {
      delta -= 2 * Math.PI;
    } else if (delta < -4.75) {
      delta += 2 * Math.PI;
    }

    spinnerProgress += delta;

    if (spinnerProgress > 100) {
      progressNum.style.display = 'none';
      canv.style.display = 'none';
      lipsum.innerHTML = lipsumText;
    } else {
      progressNum.innerHTML = `Loading... ${+spinnerProgress.toFixed(1)}%`;

      ctx.translate(rect.width / 2, rect.height / 2);
      ctx.rotate(delta);
      ctx.translate(-rect.width / 2, -rect.height / 2);

      drawSpinner();
    }
  }
}

function calculateRadians(x, y) {
  let rectX = x - rect.left - 1;
  let rectY = y - rect.top - 1;
  let deltaX = rectX - rect.width / 2;
  let deltaY = rectY - rect.height / 2;
  return Math.atan2(deltaY, deltaX);
}

function drawSpinner() {
  ctx.lineWidth = Math.floor(rect.height * 0.04);
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.arc(rect.width * 0.5, rect.height * 0.5, rect.height * 0.15, spinnerProgress % (2 * Math.PI), (spinnerProgress + 5) % (2 * Math.PI));
  ctx.stroke();
  ctx.closePath();

  ctx.lineWidth++;
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(rect.width * 0.5, rect.height * 0.5, rect.height * 0.15, spinnerProgress % (2 * Math.PI), (spinnerProgress + 5) % (2 * Math.PI), true);
  ctx.stroke();
  ctx.closePath();

  ctx.lineWidth = 1;
}
