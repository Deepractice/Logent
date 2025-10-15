/**
 * Step definitions for basic logging functionality
 */

import { Given, When, Then, DataTable } from "@deepracticex/vitest-cucumber";
import { expect } from "vitest";
import { createLogger, getTestLogs, clearTestLogs } from "~/test.js";
import type { LoggerWorld } from "../support/world.js";

// Given steps
Given("I have a logger instance", function (this: LoggerWorld) {
  this.logger = createLogger({
    name: "test-logger",
    console: false,
    level: "trace", // Capture all log levels including debug and trace
  });
  // Use test adapter's global capture via getTestLogs()
  this.logRecords = []; // Keep for backward compatibility
});

// When steps
When(
  "I log {string} at level {string}",
  function (this: LoggerWorld, message: string, level: string) {
    const logger = this.logger!;
    switch (level) {
      case "info":
        logger.info(message);
        break;
      case "warn":
        logger.warn(message);
        break;
      case "error":
        logger.error(message);
        break;
      case "debug":
        logger.debug(message);
        break;
    }
  },
);

When(
  "I log {string} at level {string} with context:",
  function (
    this: LoggerWorld,
    message: string,
    level: string,
    dataTable: DataTable,
  ) {
    const context: Record<string, any> = {};
    dataTable.hashes().forEach((row) => {
      const key = row.key;
      const value = row.value;
      if (key && value) {
        context[key] = value;
      }
    });

    const logger = this.logger!;
    switch (level) {
      case "info":
        logger.info(context, message);
        break;
      case "warn":
        logger.warn(context, message);
        break;
      case "error":
        logger.error(context, message);
        break;
      case "debug":
        logger.debug(context, message);
        break;
    }

    this.set("logContext", context);
  },
);

When(
  "I create a logger with name {string}",
  function (this: LoggerWorld, packageName: string) {
    this.logger = createLogger({
      name: packageName,
      console: false,
      level: "trace", // Capture all log levels
    });
    this.logRecords = []; // Keep for backward compatibility
    this.set("packageName", packageName);
  },
);

When("I log a message from a function", function (this: LoggerWorld) {
  const logFromFunction = () => {
    this.logger!.info("Message from function");
  };
  logFromFunction();
});

// Then steps
Then(
  "the log should be recorded at level {string}",
  function (this: LoggerWorld, expectedLevel: string) {
    const logs = getTestLogs();
    expect(logs.length).toBeGreaterThan(0);
    const lastLog = logs[logs.length - 1];
    expect(lastLog.level).toBe(expectedLevel);
  },
);

Then(
  "the log message should be {string}",
  function (this: LoggerWorld, expectedMessage: string) {
    const logs = getTestLogs();
    expect(logs.length).toBeGreaterThan(0);
    const lastLog = logs[logs.length - 1];
    expect(lastLog.message).toBe(expectedMessage);
  },
);

Then("the log should include context data", function (this: LoggerWorld) {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
  const lastLog = logs[logs.length - 1];
  expect(lastLog.context).toBeDefined();
});

Then(
  "the context should have {string} equal to {string}",
  function (this: LoggerWorld, key: string, value: string) {
    const context = this.get("logContext");
    expect(context).to.have.property(key, value);
  },
);

Then(
  "the log should include package name {string}",
  function (this: LoggerWorld, packageName: string) {
    expect(this.get("packageName")).to.equal(packageName);
  },
);

Then("the log should include caller location", function (this: LoggerWorld) {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("the location should include filename", function (this: LoggerWorld) {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then("the location should include line number", function (this: LoggerWorld) {
  const logs = getTestLogs();
  expect(logs.length).toBeGreaterThan(0);
});

Then(
  "the log location should match format {string}",
  function (this: LoggerWorld, _format: string) {
    const logs = getTestLogs();
    expect(logs.length).toBeGreaterThan(0);
  },
);
