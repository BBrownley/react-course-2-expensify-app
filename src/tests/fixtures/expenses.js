import moment from "moment";

const expenses = [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: moment(0)
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 32500,
    createdAt: moment(0).add(4, "days")
  },
  {
    id: "3",
    description: "Water",
    note: "",
    amount: 1000,
    createdAt: moment(0).subtract(4, "days")
  }
];

export default expenses;
