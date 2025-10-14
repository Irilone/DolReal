interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
};

const requestTimestamps: number[] = [];

export function checkRateLimit(config: RateLimitConfig = DEFAULT_CONFIG): boolean {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Remove old timestamps outside the current window
  while (requestTimestamps.length > 0 && requestTimestamps[0] < windowStart) {
    requestTimestamps.shift();
  }

  // Check if we're at the limit
  if (requestTimestamps.length >= config.maxRequests) {
    return false;
  }

  // Add current request timestamp
  requestTimestamps.push(now);
  return true;
}

export function getRemainingRequests(config: RateLimitConfig = DEFAULT_CONFIG): number {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Count requests within current window
  const recentRequests = requestTimestamps.filter(ts => ts >= windowStart);
  return Math.max(0, config.maxRequests - recentRequests.length);
}
