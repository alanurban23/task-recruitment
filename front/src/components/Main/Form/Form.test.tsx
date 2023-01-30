import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Form from "./Form";

jest.mock("axios");

describe("Form", () => {
  beforeEach(() => {
    (axios.post as jest.Mock).mockReset();
  });

  it("should render the form with correct labels and inputs", async () => {
    const { getByLabelText, getByText } = render(<Form newId={1} />);

    const beneficiaryInput = getByLabelText("Beneficiary");
    const amountInput = getByLabelText("Amount");
    const accountInput = getByLabelText("Account");
    const addressInput = getByLabelText("Address");
    const descriptionInput = getByLabelText("Description");
    const submitButton = getByText("Submit");

    expect(beneficiaryInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(accountInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should show error message when beneficiary is empty and form is submitted", async () => {
    const { getByLabelText, getByText } = render(<Form newId={1} />);
    const beneficiaryInput = getByLabelText("Beneficiary");
    const submitButton = getByText("Submit");

    fireEvent.change(beneficiaryInput, { target: { value: null } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(beneficiaryInput).toHaveClass("text-gray-700");
      expect(getByText("Beneficiary is required")).toBeInTheDocument();
    });
  });

  it("should show error message when amount is negative and form is submitted", async () => {
    const { getByLabelText, getByText } = render(<Form newId={1} />);
    const amountInput = getByLabelText("Amount");
    const submitButton = getByText("Submit");

    fireEvent.change(amountInput, { target: { value: -10 } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(amountInput).toHaveClass("text-gray-700");
      expect(getByText("Amount needs to be bigger than 0")).toBeInTheDocument();
    });
  });

  xit("should make a POST request to the correct endpoint with the correct data when form is valid and submitted", async () => {
    const { getByLabelText, getByText } = render(<Form newId={1} />);
    const beneficiaryInput = getByLabelText("Beneficiary");
    const amountInput = getByLabelText("Amount");
    const accountInput = getByLabelText("Account");
    const addressInput = getByLabelText("Address");
    const descriptionInput = getByLabelText("Description");
    const submitButton = getByText("Submit");

    fireEvent.change(beneficiaryInput, { target: { value: "John Doe" } });
    fireEvent.change(amountInput, { target: { value: 100 } });
    fireEvent.change(accountInput, { target: { value: "123456" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St." } });
    fireEvent.change(descriptionInput, { target: { value: "Test transaction" } });
    fireEvent.click(submitButton);

    const postData = (axios.post as jest.Mock).mock.calls[0][1];

    await waitFor(() => {
    //   const {date, ...rest} = postData;

      expect(postData).toEqual({
        id: 1,
        beneficiary: "John Doe",
        amount: 100,
        account: "123456",
        address: "123 Main St.",
        description: "Test transaction"
      });
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/transactions", postData);
    });
  });


});