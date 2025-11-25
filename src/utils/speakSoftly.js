import { applyTalkingTreesVoice } from "./talkingTreesVoice";

export function speakSoftly(text) {
  if (!window.speechSynthesis || !text) return;

  const utter = applyTalkingTreesVoice(new SpeechSynthesisUtterance(text));
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}
