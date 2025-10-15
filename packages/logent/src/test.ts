/**
 * Test environment entry point
 * Provides in-memory logger for testing with inspection utilities
 */
import type { LoggerConfig } from "~/types/index.js";
import { createTestLogger as createTestLoggerAdapter } from "~/core/test-adapter.js";

// Export test utilities
export {
  getTestLogs,
  getTestLogsByLevel,
  clearTestLogs,
  getTestLogsCount,
  type CapturedLog,
} from "~/core/test-adapter.js";

/**
 * Create a test logger instance
 * Uses synchronous test adapter for immediate log capture
 */
export function createTestLogger(config: LoggerConfig = {}): any {
  return createTestLoggerAdapter(config);
}

/**
 * Create a logger for test environment
 * This is the main export that tests should use
 */
export function createLogger(config: LoggerConfig = {}): any {
  return createTestLoggerAdapter({
    ...config,
    environment: "test",
  });
}

// Re-export types
export type { LoggerConfig, Logger, LogLevel } from "~/types/index.js";
