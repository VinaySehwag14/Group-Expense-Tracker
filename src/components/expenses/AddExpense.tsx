import { Controller, useForm } from "react-hook-form";

interface ExpenseFormValues {
  description: string;
  amount: number;
  paidBy: string;
  splitType: "equal" | "custom";
}

const AddExpense = ({ groupId }: { groupId: string }) => {
  const { handleSubmit, control, watch, reset } = useForm<ExpenseFormValues>({
    defaultValues: {
      description: "",
      amount: 0,
      paidBy: "",
      splitType: "equal",
    },
  });

  const splitType = watch("splitType"); // Watch the current split type

  const onSubmit = (data: ExpenseFormValues) => {
    console.log("Expense Added:", { ...data, groupId });
    alert("Expense added successfully!");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 max-w-md mx-auto bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      {/* Description Field */}
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field, fieldState }) => (
          <div className="mb-4">
            <input
              {...field}
              type="text"
              placeholder="Description"
              className={`w-full p-2 border ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Amount Field */}
      <Controller
        name="amount"
        control={control}
        rules={{
          required: "Amount is required",
          validate: (value) => value > 0 || "Amount must be greater than 0",
        }}
        render={({ field, fieldState }) => (
          <div className="mb-4">
            <input
              {...field}
              type="number"
              placeholder="Amount"
              className={`w-full p-2 border ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Paid By Field */}
      <Controller
        name="paidBy"
        control={control}
        rules={{ required: "Payer is required" }}
        render={({ field, fieldState }) => (
          <div className="mb-4">
            <select
              {...field}
              className={`w-full p-2 border ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              } rounded`}
            >
              <option value="">Select Payer</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* Split Type Field */}
      <Controller
        name="splitType"
        control={control}
        render={({ field }) => (
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                {...field}
                value="equal"
                checked={field.value === "equal"}
              />
              <span className="ml-2">Split Equally</span>
            </label>
            <label className="block">
              <input
                type="radio"
                {...field}
                value="custom"
                checked={field.value === "custom"}
              />
              <span className="ml-2">Custom Split</span>
            </label>
          </div>
        )}
      />

      {/* Custom Split Logic */}
      {splitType === "custom" && (
        <p className="text-gray-500">Custom Split Fields Here</p>
      )}

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpense;
