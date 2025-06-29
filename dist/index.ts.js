var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var load_tests_exports = {};
__export(load_tests_exports, {
  config: () => config,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(load_tests_exports);
var baseUrl = "https://356f1925a22302.lhr.life";
var config = {
  target: baseUrl,
  showAllPageMetrics: true,
  testIdAttribute: "product-list",
  http: {
    extendedMetrics: true
  },
  phases: [
    { duration: 10, arrivalRate: 1, name: "warm\u2011up" }
    // { duration: 60, arrivalRate: 10, name: "warm‑up" },
    // { duration: 120, arrivalRate: 100, rampTo: 500, name: "ramp‑up" },
    // { duration: 300, arrivalRate: 500, name: "sustain" },
  ],
  engines: { playwright: { aggregateByName: true } },
  plugins: {}
};
var scenarios = [
  { name: "SSR", engine: "playwright", weight: 1, testFunction: ssrFlow }
  // { name: "CSR", engine: "playwright", weight: 1, testFunction: csrFlow },
  // { name: "SSG", engine: "playwright", weight: 1, testFunction: ssgFlow },
  // { name: "ISR", engine: "playwright", weight: 1, testFunction: isrFlow },
];
async function ssrFlow(page, vuContext, events, test) {
  await exercise(page, `${baseUrl}/ssr`, vuContext, events, test);
}
async function exercise(page, path, vuContext, events, test) {
  const { step } = test;
  const timings = {};
  console.log("path", path);
  await page.goto(path, { waitUntil: "load" });
  await step("collect-perf-metrics", async () => {
    const perf = await page.evaluate(() => {
      const nav = performance.getEntriesByType(
        "navigation"
      )[0];
      return {
        ttfb: nav.responseStart - nav.requestStart,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
        lcp: performance.getEntriesByType("largest-contentful-paint")[0]?.startTime || 0,
        domContentLoaded: nav.domContentLoadedEventStart - nav.startTime,
        loadEvent: nav.loadEventEnd - nav.startTime
      };
    });
    Object.assign(timings, perf);
    events.emit("histogram", "ttfb", perf.ttfb);
    events.emit("histogram", "fcp", perf.fcp);
    events.emit("histogram", "lcp", perf.lcp);
    vuContext.vars.timings = timings;
  });
  await step("list-visible", async () => {
    await page.waitForSelector('[data-testid="products-list"]', { state: "visible" });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiQHBsYXl3cmlnaHQvdGVzdFwiO1xuXG5jb25zdCBiYXNlVXJsID0gXCJodHRwczovLzM1NmYxOTI1YTIyMzAyLmxoci5saWZlXCI7XG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIHRhcmdldDogYmFzZVVybCxcbiAgc2hvd0FsbFBhZ2VNZXRyaWNzOiB0cnVlLFxuICB0ZXN0SWRBdHRyaWJ1dGU6IFwicHJvZHVjdC1saXN0XCIsXG4gIGh0dHA6IHtcbiAgICBleHRlbmRlZE1ldHJpY3M6IHRydWUsXG4gIH0sXG4gIHBoYXNlczogW1xuICAgIHsgZHVyYXRpb246IDEwLCBhcnJpdmFsUmF0ZTogMSwgbmFtZTogXCJ3YXJtXHUyMDExdXBcIiB9LFxuICAgIC8vIHsgZHVyYXRpb246IDYwLCBhcnJpdmFsUmF0ZTogMTAsIG5hbWU6IFwid2FybVx1MjAxMXVwXCIgfSxcbiAgICAvLyB7IGR1cmF0aW9uOiAxMjAsIGFycml2YWxSYXRlOiAxMDAsIHJhbXBUbzogNTAwLCBuYW1lOiBcInJhbXBcdTIwMTF1cFwiIH0sXG4gICAgLy8geyBkdXJhdGlvbjogMzAwLCBhcnJpdmFsUmF0ZTogNTAwLCBuYW1lOiBcInN1c3RhaW5cIiB9LFxuICBdLFxuICBlbmdpbmVzOiB7IHBsYXl3cmlnaHQ6IHsgYWdncmVnYXRlQnlOYW1lOiB0cnVlIH0gfSxcbiAgcGx1Z2luczoge30sXG59OyAvLyA6Y29udGVudFJlZmVyZW5jZVtvYWljaXRlOjBde2luZGV4PTB9XG5cbmV4cG9ydCBjb25zdCBzY2VuYXJpb3MgPSBbXG4gIHsgbmFtZTogXCJTU1JcIiwgZW5naW5lOiBcInBsYXl3cmlnaHRcIiwgd2VpZ2h0OiAxLCB0ZXN0RnVuY3Rpb246IHNzckZsb3cgfSxcbiAgLy8geyBuYW1lOiBcIkNTUlwiLCBlbmdpbmU6IFwicGxheXdyaWdodFwiLCB3ZWlnaHQ6IDEsIHRlc3RGdW5jdGlvbjogY3NyRmxvdyB9LFxuICAvLyB7IG5hbWU6IFwiU1NHXCIsIGVuZ2luZTogXCJwbGF5d3JpZ2h0XCIsIHdlaWdodDogMSwgdGVzdEZ1bmN0aW9uOiBzc2dGbG93IH0sXG4gIC8vIHsgbmFtZTogXCJJU1JcIiwgZW5naW5lOiBcInBsYXl3cmlnaHRcIiwgd2VpZ2h0OiAxLCB0ZXN0RnVuY3Rpb246IGlzckZsb3cgfSxcbl07XG5cbmFzeW5jIGZ1bmN0aW9uIHNzckZsb3cocGFnZSwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpIHtcbiAgYXdhaXQgZXhlcmNpc2UocGFnZSwgYCR7YmFzZVVybH0vc3NyYCwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpO1xufVxuYXN5bmMgZnVuY3Rpb24gY3NyRmxvdyhwYWdlLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCkge1xuICBhd2FpdCBleGVyY2lzZShwYWdlLCBgJHtiYXNlVXJsfS9gLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNzZ0Zsb3cocGFnZSwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpIHtcbiAgYXdhaXQgZXhlcmNpc2UocGFnZSwgYCR7YmFzZVVybH0vc3NnYCwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc3JGbG93KHBhZ2UsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KSB7XG4gIGF3YWl0IGV4ZXJjaXNlKHBhZ2UsIGAke2Jhc2VVcmx9L2lzcmAsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZXhlcmNpc2UocGFnZTogUGFnZSwgcGF0aDogc3RyaW5nLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCkge1xuICBjb25zdCB7IHN0ZXAgfSA9IHRlc3Q7XG4gIGNvbnN0IHRpbWluZ3MgPSB7fTtcbiAgY29uc29sZS5sb2coXCJwYXRoXCIsIHBhdGgpO1xuICBhd2FpdCBwYWdlLmdvdG8ocGF0aCwgeyB3YWl0VW50aWw6IFwibG9hZFwiIH0pO1xuXG4gIGF3YWl0IHN0ZXAoXCJjb2xsZWN0LXBlcmYtbWV0cmljc1wiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcGVyZiA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuICAgICAgY29uc3QgbmF2ID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcbiAgICAgICAgXCJuYXZpZ2F0aW9uXCJcbiAgICAgIClbMF0gYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0dGZiOiBuYXYucmVzcG9uc2VTdGFydCAtIG5hdi5yZXF1ZXN0U3RhcnQsXG4gICAgICAgIGZjcDogcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZShcImZpcnN0LWNvbnRlbnRmdWwtcGFpbnRcIilbMF0/LnN0YXJ0VGltZSB8fCAwLFxuICAgICAgICBsY3A6IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXCJsYXJnZXN0LWNvbnRlbnRmdWwtcGFpbnRcIilbMF0/LnN0YXJ0VGltZSB8fCAwLFxuICAgICAgICBkb21Db250ZW50TG9hZGVkOiBuYXYuZG9tQ29udGVudExvYWRlZEV2ZW50U3RhcnQgLSBuYXYuc3RhcnRUaW1lLFxuICAgICAgICBsb2FkRXZlbnQ6IG5hdi5sb2FkRXZlbnRFbmQgLSBuYXYuc3RhcnRUaW1lLFxuICAgICAgfTtcbiAgICB9KTtcbiAgICBPYmplY3QuYXNzaWduKHRpbWluZ3MsIHBlcmYpO1xuICAgIGV2ZW50cy5lbWl0KFwiaGlzdG9ncmFtXCIsIFwidHRmYlwiLCBwZXJmLnR0ZmIpO1xuICAgIGV2ZW50cy5lbWl0KFwiaGlzdG9ncmFtXCIsIFwiZmNwXCIsIHBlcmYuZmNwKTtcbiAgICBldmVudHMuZW1pdChcImhpc3RvZ3JhbVwiLCBcImxjcFwiLCBwZXJmLmxjcCk7XG4gICAgdnVDb250ZXh0LnZhcnMudGltaW5ncyA9IHRpbWluZ3M7XG4gIH0pO1xuXG4gIGF3YWl0IHN0ZXAoXCJsaXN0LXZpc2libGVcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKCdbZGF0YS10ZXN0aWQ9XCJwcm9kdWN0cy1saXN0XCJdJywgeyBzdGF0ZTogXCJ2aXNpYmxlXCIgfSk7XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQU0sVUFBVTtBQUVULElBQU0sU0FBUztBQUFBLEVBQ3BCLFFBQVE7QUFBQSxFQUNSLG9CQUFvQjtBQUFBLEVBQ3BCLGlCQUFpQjtBQUFBLEVBQ2pCLE1BQU07QUFBQSxJQUNKLGlCQUFpQjtBQUFBLEVBQ25CO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixFQUFFLFVBQVUsSUFBSSxhQUFhLEdBQUcsTUFBTSxlQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJbEQ7QUFBQSxFQUNBLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEtBQUssRUFBRTtBQUFBLEVBQ2pELFNBQVMsQ0FBQztBQUNaO0FBRU8sSUFBTSxZQUFZO0FBQUEsRUFDdkIsRUFBRSxNQUFNLE9BQU8sUUFBUSxjQUFjLFFBQVEsR0FBRyxjQUFjLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFJeEU7QUFFQSxlQUFlLFFBQVEsTUFBTSxXQUFXLFFBQVEsTUFBTTtBQUNwRCxRQUFNLFNBQVMsTUFBTSxHQUFHLE9BQU8sUUFBUSxXQUFXLFFBQVEsSUFBSTtBQUNoRTtBQWFBLGVBQWUsU0FBUyxNQUFZLE1BQWMsV0FBVyxRQUFRLE1BQU07QUFDekUsUUFBTSxFQUFFLEtBQUssSUFBSTtBQUNqQixRQUFNLFVBQVUsQ0FBQztBQUNqQixVQUFRLElBQUksUUFBUSxJQUFJO0FBQ3hCLFFBQU0sS0FBSyxLQUFLLE1BQU0sRUFBRSxXQUFXLE9BQU8sQ0FBQztBQUUzQyxRQUFNLEtBQUssd0JBQXdCLFlBQVk7QUFDN0MsVUFBTSxPQUFPLE1BQU0sS0FBSyxTQUFTLE1BQU07QUFDckMsWUFBTSxNQUFNLFlBQVk7QUFBQSxRQUN0QjtBQUFBLE1BQ0YsRUFBRSxDQUFDO0FBRUgsYUFBTztBQUFBLFFBQ0wsTUFBTSxJQUFJLGdCQUFnQixJQUFJO0FBQUEsUUFDOUIsS0FBSyxZQUFZLGlCQUFpQix3QkFBd0IsRUFBRSxDQUFDLEdBQUcsYUFBYTtBQUFBLFFBQzdFLEtBQUssWUFBWSxpQkFBaUIsMEJBQTBCLEVBQUUsQ0FBQyxHQUFHLGFBQWE7QUFBQSxRQUMvRSxrQkFBa0IsSUFBSSw2QkFBNkIsSUFBSTtBQUFBLFFBQ3ZELFdBQVcsSUFBSSxlQUFlLElBQUk7QUFBQSxNQUNwQztBQUFBLElBQ0YsQ0FBQztBQUNELFdBQU8sT0FBTyxTQUFTLElBQUk7QUFDM0IsV0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFLLElBQUk7QUFDMUMsV0FBTyxLQUFLLGFBQWEsT0FBTyxLQUFLLEdBQUc7QUFDeEMsV0FBTyxLQUFLLGFBQWEsT0FBTyxLQUFLLEdBQUc7QUFDeEMsY0FBVSxLQUFLLFVBQVU7QUFBQSxFQUMzQixDQUFDO0FBRUQsUUFBTSxLQUFLLGdCQUFnQixZQUFZO0FBQ3JDLFVBQU0sS0FBSyxnQkFBZ0IsaUNBQWlDLEVBQUUsT0FBTyxVQUFVLENBQUM7QUFBQSxFQUNsRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
