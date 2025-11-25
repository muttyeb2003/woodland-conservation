export const applyTalkingTreesVoice = (utterance) => {
  if (!utterance) return utterance;

  const synth = window.speechSynthesis;
  if (!synth) return utterance;

  const voices = synth.getVoices ? synth.getVoices() : [];
  const preferredVoice =
    voices.find(
      (v) =>
        v.lang?.toLowerCase().startsWith("en") &&
        v.name?.toLowerCase().includes("female")
    ) ||
    voices.find(
      (v) =>
        v.lang?.toLowerCase().startsWith("en") &&
        (v.name?.toLowerCase().includes("woman") ||
          v.name?.toLowerCase().includes("girl"))
    ) ||
    voices.find((v) => v.lang?.toLowerCase().startsWith("en")) ||
    voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.rate = 0.95;
  utterance.pitch = 1.05;
  utterance.volume = 0.9;

  return utterance;
};

export const speakWithTalkingTreesVoice = (text) => {
  if (!text) return null;

  const synth = window.speechSynthesis;
  if (!synth) return null;

  synth.cancel();
  const utterance = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
  synth.speak(utterance);

  return utterance;
};
