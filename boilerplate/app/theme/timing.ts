export const timing = {
  /**
   * The duration (ms) for instant feedback.
   */
  instant: 100,
  /**
   * The duration (ms) for quick animations.
   */
  quick: 300,
  /**
   * The duration (ms) for fast transitions.
   */
  fast: 200,
  /**
   * The duration (ms) for normal transitions.
   */
  normal: 300,
  /**
   * The duration (ms) for slow transitions.
   */
  slow: 500,
}

export const animation = {
  /**
   * Standard spring configuration.
   */
  spring: { damping: 15, stiffness: 150 },
  /**
   * Snappy spring for immediate reactions.
   */
  springSnappy: { damping: 20, stiffness: 300 },
  /**
   * Bouncy spring for organic movement.
   */
  springBouncy: { damping: 10, stiffness: 100 },
}
