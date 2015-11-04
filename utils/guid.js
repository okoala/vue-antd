let seed = 0

export default function () {
  return Date.now() + '_' + (seed++)
}
