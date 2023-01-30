import { describe, expect } from '@jest/globals';
import { AxiosResponse } from "axios";
import { renderHook, act } from "@testing-library/react-hooks";
import { useTransactionsData } from "./useTransactionsData";


describe("useTransactionsData", () => {
  
  it("fetches transactions data", async () => {
    const data = [
      { id: 1, amount: 10, beneficiary: "John" },
      { id: 2, amount: 20, beneficiary: "Jane" },
      { id: 3, amount: 30, beneficiary: "Bob" },
    ];
    //create a sum reduce function to calculate the balance
    const balance = data.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    // Mock axios.get to return a successful response
    jest.mock("axios", () => {
      return {
        get: jest.fn().mockResolvedValue({
          data,
        } as AxiosResponse<{ id: number; amount: number; beneficiary: string }[]>),
      };
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTransactionsData()
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.pages).toEqual([1,2,3,4,5]);
    expect(balance).toBe(60);
    expect(result.current.currentPage).toBe(0);
    expect(result.current.query).toBe("");
  });

  it("handles errors when fetching data", async () => {
    // Mock axios.get to return an error
    jest.mock("axios", () => {
      return {
      get: jest.fn().mockRejectedValue(new Error("Fetch error"))
      }
      });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTransactionsData()
    );

    expect(result.current.isLoading).toBe(false);
  });

  it("filters transactions by beneficiary", async () => {
    // Mock axios.get to return a successful response
    jest.mock("axios", () => {
      return {
        get: jest.fn().mockResolvedValue({
          data: [
            { id: 1, amount: 10, beneficiary: "John" },
            { id: 2, amount: 20, beneficiary: "Jane" },
            { id: 3, amount: 30, beneficiary: "Bob" },
          ],
        } as AxiosResponse<{ id: number; amount: number; beneficiary: string }[]>),
      };
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTransactionsData()
    );

    act(() => {
      result.current.setQuery("pkoo");
    });

    expect(result.current.query).toEqual("pkoo");
  });

  it("sets the current page correctly", async () => {
    jest.mock("axios", () => {
      return {
        get: jest.fn().mockResolvedValue({
          data: [
            { id: 1, amount: 10, beneficiary: "John" },
            { id: 2, amount: 20, beneficiary: "Jane" },
            { id: 3, amount: 30, beneficiary: "Bob" },
          ],
        } as AxiosResponse<{ id: number; amount: number; beneficiary: string }[]>),
      };
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useTransactionsData()
    );

    act(() => {
      result.current.setCurrentPage(1);
    });

    expect(result.current.currentPage).toEqual(1);

    act(() => {
      result.current.setCurrentPage(2);
    });
  });
});