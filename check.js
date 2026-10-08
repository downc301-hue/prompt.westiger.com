const fs = require('fs');
['female-young','female-middle','female-old','male-young','male-middle','male-old'].forEach(name => {
  const content = fs.readFileSync('data/' + name + '.js', 'utf8');
  const lines = content.split(/\r?\n/);
  const issues = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const cur = lines[i].trim();
    const next = lines[i+1].trim();
    if (/[}\]]$/.test(cur) && !cur.endsWith('};') && !cur.endsWith('];') && !cur.endsWith('},') && !cur.endsWith('],') && cur !== '{' && cur !== '') {
      if (/^"/.test(next)) {
        issues.push('L' + (i+1) + ': "' + cur.substring(0,50) + '" -> "' + next.substring(0,50) + '" (MISSING COMMA)');
      }
    }
    if (/^\{ l:/.test(cur) && cur.endsWith('}') && !cur.endsWith('},')) {
      issues.push('L' + (i+1) + ': "' + cur.substring(0,60) + '" (object missing trailing comma)');
    }
  }
  if (issues.length) {
    console.log('\n=== ' + name + '.js (' + issues.length + ' issues) ===');
    issues.forEach(i => console.log('  ' + i));
  } else {
    console.log('OK: ' + name + '.js');
  }
});