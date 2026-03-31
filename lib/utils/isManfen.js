export const getIsManfen = () =>
  typeof window !== 'undefined' && /manfen/gi.test(window.location.hostname);

export const getBrand = () =>
  getIsManfen() ? 'Manfen-Tech' : "Yao's Portfolio";
