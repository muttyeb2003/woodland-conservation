export function speakSoftly(text) {
    if (!window.speechSynthesis) return;
  
    const utter = new SpeechSynthesisUtterance(text);
  
    // Try to pick a soft, natural English voice
    const voices = window.speechSynthesis.getVoices();
    const softVoice = voices.find(v =>
      v.lang.startsWith("en") &&
      !v.name.toLowerCase().includes("robot")
    );
  
    if (softVoice) utter.voice = softVoice;
  
    // Make the voice softer and pleasant
    utter.volume = 0.8;  // slightly softer
    utter.pitch = 1.0;
    utter.rate = 1;
  
    window.speechSynthesis.speak(utter);
  }
  