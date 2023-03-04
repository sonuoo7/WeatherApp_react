export const setCelsius = () => {
  return {
    type: "SET_TEMPERATURE_UNIT",
    payload: "Celsius",
  };
};

export const setFahrenheit = () => {
  return {
    type: "SET_TEMPERATURE_UNIT",
    payload: "Fahrenheit",
  };
};
