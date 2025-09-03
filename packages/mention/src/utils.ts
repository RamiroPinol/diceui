import { Mention } from "./mention-root";

export function removeAndUpdateMentions(mentions: Mention[], mentionsToRemove: Mention[]) {
  const filteredMentions = mentions
    .filter(mention => !mentionsToRemove.some((m) => m.value === mention.value && m.start === mention.start));

  const updatedMentions = filteredMentions.map(mention => {
    let newStart = mention.start;
    let newEnd = mention.end;
    
    mentionsToRemove.forEach(removed => {
      if (removed.end <= mention.start) {
        newStart -= (removed.end - removed.start - 1);
        newEnd -= (removed.end - removed.start - 1);
      }
    });
    
    // Return a new object if positions changed, otherwise return the original
    if (newStart !== mention.start || newEnd !== mention.end) {
      return {
        ...mention,
        start: newStart,
        end: newEnd
      };
    }
    return mention;
  });

  return updatedMentions;
}
