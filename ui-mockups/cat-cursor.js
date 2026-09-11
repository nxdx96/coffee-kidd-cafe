// Coffee Kidd Cafe — pixel cat cursor
// Black cat, 28px, cream outline. Idles (blink, tail flick); pounces on links/buttons.
(function () {
  var S = 2, W = 14, ink = '#1a1518', eye = '#a3f28f', out = '#f4efe4';
  var sit = [
    '..#......#..', '..##....##..', '..########..', '..#G####G#..', '..########..',
    '...######...', '...######...', '..########.#', '..########.#', '..#########.',
    '..##..##....', '............'];
  var blink = sit.map(function (r, i) { return i === 3 ? '..#-####-#..' : r; });
  var tail = sit.map(function (r, i) {
    return i === 7 ? '..########..' : i === 8 ? '..########..' : i === 9 ? '..##########' : i === 10 ? '..##..##...#' : r;
  });
  var pounce = [
    '............', '............', '..#.....#...', '..##...##...', '..#######...',
    '..#G###G#..#', '..########.#', '...#########', '...########.', '..###..###..',
    '.##....##...', '............'];
  function draw(map) {
    var c = document.createElement('canvas'); c.width = c.height = W * S;
    var x = c.getContext('2d');
    var at = function (r, q) { return (map[r] || '')[q] || '.'; };
    for (var r = -1; r <= 12; r++) for (var q = -1; q <= 12; q++) {
      if (at(r, q) !== '.') continue;
      var n = false;
      for (var dr = -1; dr <= 1; dr++) for (var dq = -1; dq <= 1; dq++) if (at(r + dr, q + dq) !== '.') n = true;
      if (n) { x.fillStyle = out; x.fillRect((q + 1) * S, (r + 1) * S, S, S); }
    }
    map.forEach(function (row, r) {
      row.split('').forEach(function (ch, q) {
        if (ch === '.') return;
        x.fillStyle = ch === 'G' ? eye : ch === '-' ? '#4a3f4d' : ink;
        x.fillRect((q + 1) * S, (r + 1) * S, S, S);
      });
    });
    return 'url(' + c.toDataURL() + ') 4 4, auto';
  }
  var frames = [draw(sit), draw(blink), draw(tail)];
  var hover = draw(pounce);
  var st = document.createElement('style');
  st.textContent = 'a, button, [role=button], input[type=submit] { cursor: ' + hover + ' !important; }';
  document.head.appendChild(st);
  var seq = [0, 0, 0, 0, 1, 0, 0, 2, 2, 0, 0, 0, 1, 0], i = 0;
  document.body.style.cursor = frames[0];
  setInterval(function () { i = (i + 1) % seq.length; document.body.style.cursor = frames[seq[i]]; }, 450);
})();
