// Extract difference between old and new text

// lib/diffUtils.js



// Optional alternative function (if your app needs it)

export function extractDiff(oldText, newText) {
  const oldWords = oldText.trim().split(/\s+/).filter(Boolean);
  const newWords = newText.trim().split(/\s+/).filter(Boolean);

  let added = [];
  let removed = [];

  // Track removed words
  oldWords.forEach(word => {
    if (!newWords.includes(word)) {
      removed.push(word);
    }
  });

  // Track added words
  newWords.forEach(word => {
    if (!oldWords.includes(word)) {
      added.push(word);
    }
  });

  return {
    added: Array.from(new Set(added)),
    removed: Array.from(new Set(removed)),
    oldLength: oldWords.length,
    newLength: newWords.length
  };
}
