import React, { useState } from "react";
import { Transaction } from "../../models";

const useDataValues = (
  listOfLabels: string[],
  listOfIncomeorExpenses: Transaction[]
) => {
  let dataValues: number[] = [];
  for (let i = 0; i < listOfLabels.length; i++) {
    const valueArr = listOfIncomeorExpenses.filter(
      (each) => each.category === listOfLabels[i]
    );
    if (valueArr.length === 0) {
      dataValues.push(0);
    } else {
      const value = valueArr.reduce((acc, each) => acc + each.amount, 0);
      dataValues.push(value);
    }
  }

  return dataValues;
};

export default useDataValues;
