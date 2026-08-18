export function fuzzySearch(query, text) {
  if (!query) return { match: true, score: 0, indices: [] };
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  if (t.includes(q)) {
    const idx = t.indexOf(q);
    const indices = Array.from({ length: q.length }, (_, i) => idx + i);
    return { match: true, score: q.length / t.length, indices };
  }

  let qi = 0;
  let ti = 0;
  const indices = [];
  let score = 0;
  let consecutive = 0;

  while (qi < q.length && ti < t.length) {
    if (q[qi] === t[ti]) {
      indices.push(ti);
      consecutive++;
      score += consecutive * 2;
      if (ti === 0 || t[ti - 1] === ' ' || t[ti - 1] === '-' || t[ti - 1] === '_') {
        score += 5;
      }
      qi++;
    } else {
      consecutive = 0;
    }
    ti++;
  }

  if (qi < q.length) return { match: false, score: 0, indices: [] };

  return { match: true, score: score / t.length, indices };
}

export function highlightMatch(text, indices) {
  if (!indices.length) return text;
  const chars = text.split('');
  return chars.map((char, i) => {
    const isMatch = indices.includes(i);
    return isMatch ? `<mark class="bg-yellow-200 dark:bg-yellow-800 rounded">${char}</mark>` : char;
  }).join('');
}

export function fuzzySearchList(query, items, getLabel) {
  if (!query) return items;
  return items
    .map((item) => {
      const label = typeof getLabel === 'function' ? getLabel(item) : item.label;
      const result = fuzzySearch(query, label);
      return { ...item, ...result };
    })
    .filter((item) => item.match)
    .sort((a, b) => b.score - a.score);
}
