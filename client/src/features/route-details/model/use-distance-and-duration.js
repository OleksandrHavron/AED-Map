export const useDistanceAndDuration = ( details ) => {
  const { distance, duration } = details;
  const finalDistance = (distance / 1000).toFixed(2);
  const approximateTime = Math.floor(duration / 60);
  
  return {
    finalDistance,
    approximateTime
  }
}