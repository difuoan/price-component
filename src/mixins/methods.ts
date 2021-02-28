export const commonMethods = {
  formatFieldsetValue(value: number): string {
    if (value === 0) {
      return "0.0";
    }
    const castValue = value.toString();
    let numberOfDecimals = 0;
    if (castValue.includes(".") === true) {
      numberOfDecimals = castValue.split(".")[1].length;
    }
    let returnValue = "";
    switch (numberOfDecimals) {
      case 0:
      case 1:
        returnValue = value.toFixed(numberOfDecimals);
        break;
      case 2:
      default:
        returnValue = value.toFixed(2);
        break;
    }
    return returnValue;
  }
};
