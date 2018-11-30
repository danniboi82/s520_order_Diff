exports.currentDate = () => {

    let date = new Date();

    let month = date.getMonth() + 1;

    let year = date.getFullYear();

    let YYYYMM = year.toString() + month.toString();
    return YYYYMM
}



