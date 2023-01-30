import { useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "./transactionSchema";
import axios from "axios";
import uuid from "react-uuid";
import { mutate } from "swr";
import { API } from "../../../globals";
import React from "react";

type TProps = {
  newId: number;
};

type TFormValues = {
  beneficiary: string;
  amount: number;
  account: string;
  address: string;
  description: string;
  register: UseFormRegister<TFormValues>
};
const inputClasses =
  "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const Form = (props: TProps) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(transactionSchema),
  });

  const onSubmit = (data: TFormValues) => {
    const newTransaction = {
      id: uuid(),
      ...data,
      date: new Date(),
    };

    axios
      .post(API, newTransaction)
      .then(() => {
        reset();
        mutate(`${API}?_sort=date&_order=desc`);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-[2] gap-2 p-4"
    >
      <h2 className="text-2xl text-center w-full font-bold">
        Add new transaction
      </h2>
      <div>
        <label
          htmlFor="beneficiary"
          className={errors.beneficiary && "text-red-500"}
        >
          {errors.beneficiary ? errors.beneficiary.message : "Beneficiary"}
        </label>
        <input
          className={inputClasses}
          id="beneficiary"
          type="text"
          {...register("beneficiary")}
        />
      </div>
      <div>
        <label htmlFor="amount" className={errors.amount && "text-red-500"}>
          {errors.amount ? errors.amount.message : "Amount"}
        </label>
        <input
          id="amount"
          className={inputClasses}
          type="number"
          step={0.01}
          defaultValue={0}
          {...register("amount")}
        />
      </div>
      <div>
        <label htmlFor="account" className={errors.account && "text-red-500"}>
          {errors.account ? errors.account.message : "Account"}
        </label>
        <input id="account" className={inputClasses} type="text" {...register("account")} />
      </div>
      <div>
        <label htmlFor="address" className={errors.address && "text-red-500"}>
          {errors.address ? errors.address.message : "Address"}
        </label>
        <input id="address" className={inputClasses} type="text" {...register("address")} />
      </div>
      <div>
        <label
          htmlFor="description"
          className={errors.description && "text-red-500"}
        >
          {errors.description ? errors.description.message : "Description"}
        </label>
        <input
          id="description"
          className={inputClasses}
          type="text"
          {...register("description")}
        />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
