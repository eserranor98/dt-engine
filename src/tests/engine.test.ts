import { expect, test } from "@jest/globals";
import { zoomIn } from "./../engine/engine";

test("increments scale by 0.1", () => {
  expect(zoomIn({ x: 0, y: 0, scale: 1 }, null)).toStrictEqual({
    x: 0,
    y: 0,
    scale: 1.1,
  });
});

test("increments scale by 0.1 with non-null rect", () => {
  const rect = new DOMRect(0, 0, 100, 100);
  expect(zoomIn({ x: 0, y: 0, scale: 1 }, rect)).toStrictEqual({
    x: -5,
    y: -5,
    scale: 1.1,
  });
});

test("increments scale by 0.1 with initial scale of 2", () => {
  expect(zoomIn({ x: 0, y: 0, scale: 2 }, null)).toStrictEqual({
    x: 0,
    y: 0,
    scale: 2.1,
  });
});

test("increments scale by 0.1 with initial x and y offsets", () => {
  expect(zoomIn({ x: 10, y: 10, scale: 1 }, null)).toStrictEqual({
    x: 10,
    y: 10,
    scale: 1.1,
  });
});

test("increments scale by 0.1 with initial x and y offsets and non-null rect", () => {
  const rect = new DOMRect(0, 0, 100, 100);
  expect(zoomIn({ x: 10, y: 10, scale: 1 }, rect)).toStrictEqual({
    x: 5,
    y: 5,
    scale: 1.1,
  });
});
