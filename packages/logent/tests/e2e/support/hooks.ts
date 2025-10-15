/**
 * Vitest-Cucumber hooks for logger tests
 */

import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setWorldConstructor,
} from "@deepracticex/vitest-cucumber";
import { createWorld } from "./world.js";
import { clearTestLogs } from "~/test.js";

// Register World factory
setWorldConstructor(createWorld);

BeforeAll(async function () {
  console.log("🥒 Starting logger tests");
});

AfterAll(async function () {
  console.log("✅ Logger tests completed");
});

Before(async function () {
  // Clear global test logs before each scenario for proper isolation
  clearTestLogs();
});

After(async function () {
  // Cleanup after each scenario
  clearTestLogs();
});
