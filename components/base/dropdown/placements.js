const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
}

const targetOffset = [0, 0]

export const placements = {
  topLeft: {
    points: ['bl', 'tl'],
    overflow: autoAdjustOverflow,
    offset: [0, -3],
    targetOffset
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 3],
    targetOffset
  }
}

export default placements
