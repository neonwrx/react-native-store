const url = "http://localhost:8080/api/account";
const getDataUrl = "https://ecommerce-mobile-api.herokuapp.com/data";

//send get request to fetch products
function* getDataFromApi() {
  const response = yield fetch(getDataUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: ""
  }).then(response => response.json());
  return response;
}

//send get request to fetch user data
function* getUserDataFromApi(token) {
  const response = yield fetch(`${url}/verifyUser?token=${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: ""
  }).then(response => response.json());
  const user = yield response.success === true ? response : false;
  return user;
}

//send POST request to register a user
function* tryRegisterNewUserFromApi(userData) {
  const response = yield fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: userData.email,
      name: userData.name,
      password: userData.password
    })
  }).then(response => response.json());
  const user = yield response.success === true ? response : false;
  return user;
}

//send POST request to login a user
function* tryLoginUserFromApi(userData) {
  const response = yield fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password
    })
  }).then(response => response.json());
  const user = yield response.success === true ? response : false;
  return user;
}

//send POST request to add new address
function* insertNewAddressFromApi(newAddress) {
  const response = yield fetch(`${url}/address/new`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: newAddress.token,
      data: newAddress.data
    })
  }).then(response => response.json());
  return yield response.success === true; //true or false
}

//send PUT request to update existing address
function* updateAddressFromApi(updatedAddress) {
  const response = yield fetch(`${url}/address/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: updatedAddress.token,
      data: updatedAddress.data,
      uId: updatedAddress.uId
    })
  }).then(response => response.json());
  return yield response.success === true; //true or false
}

//send PUT request to update existing user data
function* updateUserDataFromApi(updatedData) {
  const response = yield fetch(`${url}/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: updatedData.token,
      data: updatedData.data
    })
  }).then(response => response.json());
  return yield response.success === true; //true or false
}

//send DELETE request to update existing Movie
function* deleteAddressFromApi(deletedAddress) {
  const response = yield fetch(`${url}/address/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: deletedAddress.token,
      uId: deletedAddress.uId
    })
  }).then(response => response.json());
  return yield response.success === true; //true or false
}

//send POST request to add new order
function* insertNewOrderFromApi(newOrder) {
  const response = yield fetch(`${url}/orders/new`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: newOrder.token,
      data: newOrder.data
    })
  }).then(response => response.json());
  return yield response.success === true; //true or false
}

export const Api = {
  getDataFromApi,
  tryRegisterNewUserFromApi,
  tryLoginUserFromApi,
  getUserDataFromApi,
  updateUserDataFromApi,
  insertNewAddressFromApi,
  updateAddressFromApi,
  deleteAddressFromApi,
  insertNewOrderFromApi
};
