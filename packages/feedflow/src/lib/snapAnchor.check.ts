import { feedSnapIndex, feedSnapTop } from "./snapAnchor.ts";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

assert(feedSnapIndex(0, 800) === 0, "top");
assert(feedSnapIndex(1600, 800) === 2, "exact");
assert(feedSnapIndex(1000, 800) === 1, "round down");
assert(feedSnapIndex(1400, 800) === 2, "round up");
assert(feedSnapIndex(10, 0) === 0, "bad height");
assert(feedSnapTop(2, 700) === 1400, "top offset");
assert(feedSnapTop(-1, 700) === 0, "negative index");
