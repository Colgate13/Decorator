import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import { Server } from "node:http";
import { InjectHttpInterceptor } from "./agent";

const originalHttp: any = jest.createMockFromModule('node:http');

describe("InjectHttpInterceptor", () => {
  const eventName = 'request'
  const request = null;

  beforeEach(async () => await jest.clearAllMocks())

  test("Should be a not able to intercept http requests", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);
    expect(response.setHeader).not.toHaveBeenCalled();
  });

  test("Should be able to intercept http requests", () => {
    InjectHttpInterceptor();

    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);
    expect(response.setHeader).toHaveBeenCalled();
  });
});