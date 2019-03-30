import axios from "axios";
import { FETCHING_DATA, FIND_PRODUCTS } from "../actions/types";

export const fetchData = () => {
  return {
    type: FETCHING_DATA
  };
};

// Filter products

export const filterProducts = product => {
  return {
    type: FIND_PRODUCTS,
    product
  };
};
