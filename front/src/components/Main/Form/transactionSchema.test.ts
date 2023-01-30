import { transactionSchema } from './transactionSchema';

import * as yup from "yup";


describe('transactionSchema', () => {
    it("validate invalid transaction", async () => {
        try {
            await transactionSchema.validate({
                beneficiary: "John Doe",
                amount: -10,
                account: "",
                address: "",
                description: "",
            });
        } catch (err) {
            expect(err).toBeInstanceOf(yup.ValidationError);
        }
    });

    it("should return error message when beneficiary is empty", async () => {
        try {
            await transactionSchema.validate({
                beneficiary: "",
                amount: 100,
                account: "1234567890",
                address: "some address",
                description: "some description",
            });
        } catch (err) {
            expect((err as yup.ValidationError).message).toBe("Beneficiary is required");
        }
    });

    it('should return an error when the amount is 0 or less', async () => {
        const transactionData = {
            beneficiary: 'John Doe',
            account: '1234567890',
            address: '123 Main St',
            description: 'test transaction'
        };

        try {
            await transactionSchema.validate({ ...transactionData, amount: 0 }, { abortEarly: false });
        } catch (err) {
            expect((err as yup.ValidationError).message).toEqual('Amount needs to be bigger than 0');
        }
    });

    it('should return an error when the account field is left blank', async () => {
        const transactionData = {
            beneficiary: 'John Doe',
            amount: 100,
            address: '123 Main St',
            description: 'test transaction'
        };

        try {
            await transactionSchema.validate(transactionData, { abortEarly: false });
        } catch (err) {
            expect((err as yup.ValidationError).errors).toEqual(['Account number is required']);
        }
    });

    it('should return an error when the address field is left blank', async () => {
        const transactionData = {
            beneficiary: 'John Doe',
            amount: 100,
            account: '1234567890',
            description: 'test transaction'
        };

        try {
            await transactionSchema.validate(transactionData, { abortEarly: false });
        } catch (err) {
            expect((err as yup.ValidationError).errors).toEqual(['Address is required']);
        }
    });

    it('should return an error when the description field is left blank', async () => {
        const transactionData = {
            beneficiary: 'John Doe',
            amount: 100,
            account: '1234567890',
            address: '123 Main St',
        };

        try {
            await transactionSchema.validate(transactionData, { abortEarly: false });
        } catch (err) {
            expect((err as yup.ValidationError).errors).toEqual(['Description is required']);
        }
    });

    it('should not return any errors when all fields are filled in correctly', async () => {
        const transactionData = {
            beneficiary: 'John Doe',
            amount: 100,
            account: '1234567890',
            address: '123 Main St',
            description: 'test transaction'
        };

        await transactionSchema.validate(transactionData, { abortEarly: false });
        expect(true).toBe(true);
    });

});
