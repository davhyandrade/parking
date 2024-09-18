export const formatTimeToPortuguese = (time: string): string => {
  // converter as palavras do inglês para o português
  const formattedTime = time
    .replace(/seconds?/gi, (match) => (match === 'second' ? 'segundo' : 'segundos'))
    .replace(/hours?/gi, 'h')
    .replace(/minutes?/gi, 'min')
    .replace(/days?/gi, (match) => (match === 'day' ? 'dia' : 'dias'));

  return formattedTime;
};