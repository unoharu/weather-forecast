export function createJapanMap({
  containerId,
  areas,
  resolveMarker,
  onSelect,
  options
}) {
  const container = document.getElementById(containerId);

  if (!container) {
    throw new Error(`Missing map container: ${containerId}`);
  }

  let resizeTimer = null;
  let renderedWidth = 0;

  const settings = {
    minWidth: options?.minWidth ?? 240,
    maxWidth: options?.maxWidth ?? 700,
    padding: options?.padding ?? 12,
    resizeThreshold: options?.resizeThreshold ?? 8,
    resizeDebounceMs: options?.resizeDebounceMs ?? 120
  };

  function calcWidth() {
    const width = Math.floor(container.clientWidth - settings.padding);
    return Math.min(settings.maxWidth, Math.max(settings.minWidth, width));
  }

  function clearContainer() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  function renderMap() {
    if (!window.jpmap) {
      throw new Error('jpmap library is not available.');
    }

    const nextWidth = calcWidth();
    clearContainer();
    renderedWidth = nextWidth;

    new window.jpmap.japanMap(container, {
      areas,
      showsPrefectureName: false,
      width: nextWidth,
      movesIslands: true,
      drawsBoxLine: false,
      lineColor: '#ffffff',
      lineWidth: 0.5,
      borderLineColor: '#ffffff',
      borderLineWidth: 2,
      lang: 'ja',
      onSelect: function (jsonData) {
        const areaName = jsonData.name;
        const marker = resolveMarker(areaName);

        if (!marker) {
          console.warn('選択された地域の情報が見つかりませんでした:', areaName);
          return;
        }

        onSelect({ areaName, marker });
      }
    });
  }

  function handleResize() {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(() => {
      const nextWidth = calcWidth();
      if (Math.abs(nextWidth - renderedWidth) >= settings.resizeThreshold) {
        renderMap();
      }
    }, settings.resizeDebounceMs);
  }

  return {
    render: renderMap,
    handleResize
  };
}
