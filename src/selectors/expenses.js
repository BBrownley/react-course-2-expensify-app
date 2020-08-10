import moment from "moment";

const getVisibleExpenses = (expenses, filters) => {
  const { text, sortBy, startDate, endDate } = filters;

  console.log(startDate, expenses);

  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);

      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment)
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment)
        : true;

      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

export default getVisibleExpenses;
