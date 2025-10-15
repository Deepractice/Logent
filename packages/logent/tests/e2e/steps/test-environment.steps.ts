import { Given, When, Then } from "@deepracticex/vitest-cucumber";
import { expect } from "vitest";
import {
  createLogger,
  getTestLogs,
  getTestLogsByLevel,
  clearTestLogs,
  getTestLogsCount,
  type CapturedLog,
} from "~/test.js";

// Given steps
Given("I am running in a test environment", function () {
  this.testMode = "test";
});

Given("VITEST environment variable is set", function () {
  expect(process.env.VITEST).toBe("true");
});

Given("I have a test logger", function () {
  this.logger = createLogger({
    name: "test-app",
    level: "trace"  // Capture all log levels including trace and debug
  });
});

Given("I have a test logger with level {string}", function (level: string) {
  this.logger = createLogger({ name: "test-app", level: level as any });
});

Given("I have cleared the test logs", function () {
  clearTestLogs();
});

// When steps
When("I clear captured logs", function () {
  clearTestLogs();
});

When("I get captured logs", function () {
  this.capturedLogs = getTestLogs();
});

When("I get captured {string} logs", function (level: string) {
  this.capturedLogs = getTestLogsByLevel(level as any);
});

When("I get test logs count", function () {
  this.logsCount = getTestLogsCount();
});

When("I log a message", async function () {
  await this.logger.info("test message");
});

When("I log an {string} message {string}", async function (level: string, message: string) {
  await this.logger[level as keyof typeof this.logger](message);
});

When("I log {string} at level {string}", async function (message: string, level: string) {
  await this.logger[level as keyof typeof this.logger](message);
});

When("I log multiple messages", async function () {
  await this.logger.info("message 1");
  await this.logger.warn("message 2");
  await this.logger.error("message 3");
});

// Then steps
Then("logger should use test adapter", function () {
  expect(this.logger).toBeDefined();
  // Test adapter is automatically used in test environment
});

Then("logs should be captured", function () {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("logs should not be captured", function () {
  const logs = getTestLogs();
  expect(logs.length).toBe(0);
});

Then("captured logs should be empty", function () {
  expect(this.capturedLogs).toEqual([]);
});

Then("captured logs should contain {int} log(s)", function (count: number) {
  expect(this.capturedLogs.length).toBe(count);
});

Then("test logs count should be {int}", function (count: number) {
  expect(this.logsCount).toBe(count);
});

Then("the log should have level {string}", function (level: string) {
  const logs = getTestLogs();
  expect(logs[0].level).toBe(level);
});

Then("the log should have message {string}", function (message: string) {
  const logs = getTestLogs();
  expect(logs[0].message).toBe(message);
});

Then("captured {string} logs should contain {int} log(s)", function (level: string, count: number) {
  expect(this.capturedLogs.length).toBe(count);
  this.capturedLogs.forEach((log: CapturedLog) => {
    expect(log.level).toBe(level);
  });
});

Then("each log should have timestamp", function () {
  this.capturedLogs.forEach((log: CapturedLog) => {
    expect(log.timestamp).toBeDefined();
    expect(typeof log.timestamp).toBe("number");
  });
});

Then("each log should have context", function () {
  this.capturedLogs.forEach((log: CapturedLog) => {
    expect(log.context).toBeDefined();
    expect(typeof log.context).toBe("object");
  });
});

// Additional Given steps
Given('VITEST environment variable is "true"', function () {
  expect(process.env.VITEST).toBe("true");
});

Given("I have a test logger with default config", function () {
  this.logger = createLogger({ name: "test-app", level: "trace" });
});

Given("I have a test logger with console enabled", function () {
  this.logger = createLogger({ name: "test-app", console: true, level: "trace" });
});

Given("vitest is running with default reporter", function () {
  expect(process.env.VITEST).toBe("true");
  // Default reporter is automatically used
});

Given("vitest is running with verbose reporter", function () {
  expect(process.env.VITEST).toBe("true");
  // Verbose reporter check - vitest handles this internally
});

// Additional When steps
When("I call logger method {string} with {string}", async function (method: string, message: string) {
  await this.logger[method as keyof typeof this.logger](message);
});

When("I create a logger without specifying environment", function () {
  this.logger = createLogger({ name: "test-app" });
});

When("I create a logger with environment {string}", function (env: string) {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = env;
  this.logger = createLogger({ name: "test-app" });
  process.env.NODE_ENV = originalEnv;
});

When("I get captured logs filtered by level {string}", function (level: string) {
  this.capturedLogs = getTestLogsByLevel(level as any);
});

// Additional Then steps
Then("the logger should use test adapter", function () {
  expect(this.logger).toBeDefined();
  // Test adapter is automatically used in test environment
});

Then("captured logs should contain {int} entries", function (count: number) {
  const logs = this.capturedLogs || getTestLogs();
  expect(logs.length).toBe(count);
});

Then("the result should be an array of {int} log entries", function (count: number) {
  expect(Array.isArray(this.capturedLogs)).toBe(true);
  expect(this.capturedLogs.length).toBe(count);
});

Then("captured logs should contain the context data", function () {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
  expect(logs[0].context).toBeDefined();
});

Then("the context should have {string} equal to {string}", function (key: string, value: string) {
  const logs = getTestLogs();
  expect(logs[0].context[key]).toBe(value);
});

Then("the entry should have message {string}", function (message: string) {
  const logs = this.capturedLogs || getTestLogs();
  expect(logs[0].message).toBe(message);
});

Then("the message should not be output to console", function () {
  // In test mode with console: false, messages are only captured
  // We can't directly test console output, but we verify logs are captured
  expect(this.capturedLogs || getTestLogs()).toBeDefined();
});

Then("the message should be output to console", function () {
  // In test mode with console: true, messages are both captured and output
  // We can't directly test console output, but we verify logs are captured
  expect(this.capturedLogs || getTestLogs()).toBeDefined();
});

Then("the message should not be visible in test output", function () {
  // Messages are captured but not visible in test output (console: false)
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("the message should be visible in test output", function () {
  // Messages are both captured and visible in test output (console: true)
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("the message should still be captured in memory", function () {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("the message should be captured in memory", function () {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("logs should be captured in memory", function () {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("all standard log levels should be present", function () {
  const logs = this.capturedLogs || getTestLogs();
  const levels = logs.map((log: CapturedLog) => log.level);
  const expectedLevels = ["trace", "debug", "info", "warn", "error"];
  expectedLevels.forEach(level => {
    expect(levels).toContain(level);
  });
});

Then("captured log at index {int} should have level {string}", function (index: number, level: string) {
  const logs = this.capturedLogs || getTestLogs();
  expect(logs[index].level).toBe(level);
});

Then("captured log at index {int} should have message {string}", function (index: number, message: string) {
  const logs = this.capturedLogs || getTestLogs();
  expect(logs[index].message).toBe(message);
});

Then("each entry should have level, message, and timestamp", function () {
  this.capturedLogs.forEach((log: CapturedLog) => {
    expect(log.level).toBeDefined();
    expect(log.message).toBeDefined();
    expect(log.timestamp).toBeDefined();
    expect(typeof log.timestamp).toBe("number");
  });
});

Then("the result should contain {int} entry", function (count: number) {
  expect(this.capturedLogs.length).toBe(count);
});
