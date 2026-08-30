const users = [
  { id: 1, isGuest: false, name: "Manoj Patra", email: "manojpatra@gmail.com" },
  { id: 2, isGuest: true, name: "Manoj Guest", email: "manojguest@gmail.com" },
];

const apiEndpoints = [
  {
    id: 1,
    userId: 1,
    endpoint: `https://dummyjson.com/http/${Math.floor(Math.random() * 2) > 0 ? 200 : 400}/apiId1`,
    intervalInSec: 5,
  },
  {
    id: 2,
    userId: 1,
    endpoint: `https://dummyjson.com/http/${Math.floor(Math.random() * 2) > 0 ? 200 : 400}/apiId2`,
    intervalInSec: 10,
  },
];

const monitors = [
  {
    id: 1,
    apiId: 1,
    isPause: false,
    lastCheckedAt: "2026-05-28T06:42:23.726Z",
    nextCheckAt: "2026-05-28T09:42:23.726Z",
    method: "GET",
  },
  {
    id: 2,
    apiId: 2,
    isPause: false,
    lastCheckedAt: "2026-05-28T06:42:23.726Z",
    nextCheckAt: "2026-05-28T09:42:23.726Z",
    method: "GET",
  },
];

const monitorHistory = [
  {
    id: 1,
    checkId: 1,
    success: true,
    statusCode: 200,
    errorMessage: null,
    checkedAt: "2026-05-28T06:42:23.726Z",
    responseTimeInMs: 100,
  },
  {
    id: 2,
    checkId: 1,
    success: false,
    statusCode: 400,
    errorMessage: "TIMEOUT",
    checkedAt: "2026-05-28T06:42:23.726Z",
    responseTimeInMs: 100,
  },
  {
    id: 3,
    checkId: 1,
    success: true,
    statusCode: 200,
    errorMessage: null,
    checkedAt: "2026-05-28T06:42:23.726Z",
    responseTimeInMs: 100,
  },
];
