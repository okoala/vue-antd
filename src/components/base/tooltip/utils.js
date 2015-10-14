
export function getToolTipClassByAlign (prefixCls, placement) {
  const offset = placement.offset || [0, 0]
  let offsetClass = ''

  if (offset && offset.length) {
    offsetClass = `${prefixCls}-placement-offset-x-${offset[0]} ${prefixCls}-placement-offset-y-${offset[1]}`
  }

  const points = placement.points

  return `${prefixCls} ${offsetClass} ${prefixCls}-placement-points-${points[0]}-${points[1]}`
}

export function getToolTipClassByPlacement (prefixCls, placement) {
  if (typeof placement === 'string') {
    return `${prefixCls} ${prefixCls}-placement-${placement}`
  }
  return getToolTipClassByAlign(prefixCls, placement)
}

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
}

export const placementAlignMap = {
  left: {
    points: ['cr', 'cl'],
    overflow: autoAdjustOverflow,
    offset: [-3, 0],
  },
  right: {
    points: ['cl', 'cr'],
    overflow: autoAdjustOverflow,
    offset: [3, 0],
  },
  top: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
  },
  bottom: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
  },
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
  },
  topRight: {
    points: ['br', 'tr'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
  },
}

function isPointsEq (a1, a2) {
  return a1[0] === a2[0] && a1[1] === a2[1]
}

export function fromPointsToPlacement(align) {
  const points = align.points

  for (const p in placementAlignMap) {
    if (placementAlignMap.hasOwnProperty(p)) {
      if (isPointsEq(placementAlignMap[p].points, points)) {
        return p
      }
    }
  }

  throw new Error('can not find placement for', points)
}
