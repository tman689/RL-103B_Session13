
const passengers = [
    {
        pnrCode: "VN001",
        passengerName: "Nguyen Van An",
        idNumber: "012345678901",
        flightNumber: "VN202",
        seatNumber: "",
        isCheckedIn: false
    },
    {
        pnrCode: "VN002",
        passengerName: "Tran Thi Mai",
        idNumber: "A1234567",
        flightNumber: "VN202",
        seatNumber: "",
        isCheckedIn: false
    }
];

const availableSeats = ["12A", "12B", "14C", "14D", "15A"];

// 1. Kiem tra CCCD hoac ho chieu
function validateIdNumber(idNumber) {
    // CCCD gom dung 12 chu so
    if (/^[0-9]{12}$/.test(idNumber)) {
        return true;
    }

    // Ho chieu gom 1 chu cai va 7 hoac 8 chu so
    if (/^[A-Za-z][0-9]{7,8}$/.test(idNumber)) {
        return true;
    }

    return false;
}

// 2. Tim hanh khach theo ma PNR
function findPassengerByPnr(pnrCode) {
    for (let i = 0; i < passengers.length; i++) {
        if (passengers[i].pnrCode === pnrCode) {
            return passengers[i];
        }
    }

    return null;
}

// 3. Kiem tra so ghe da duoc su dung tren chuyen bay
function isSeatTaken(flightNumber, seatNumber) {
    for (let i = 0; i < passengers.length; i++) {
        if (
            passengers[i].flightNumber === flightNumber &&
            passengers[i].seatNumber === seatNumber
        ) {
            return true;
        }
    }

    return false;
}

// 4. Tim ghe con trong
function findAvailableSeat(flightNumber) {
    for (let i = 0; i < availableSeats.length; i++) {
        if (isSeatTaken(flightNumber, availableSeats[i]) === false) {
            return availableSeats[i];
        }
    }

    return null;
}

// 5. Them ho so hanh khach
function addPassenger() {
    let pnrCode = prompt("Nhap ma PNR:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    if (findPassengerByPnr(pnrCode) !== null) {
        console.log("Ma PNR da ton tai!");
        return;
    }

    let passengerName = prompt("Nhap ho ten hanh khach:");

    if (passengerName === null || passengerName.trim() === "") {
        console.log("Ho ten khong hop le!");
        return;
    }

    let idNumber = prompt("Nhap CCCD hoac ho chieu:");

    if (idNumber === null) {
        console.log("Da huy nhap thong tin!");
        return;
    }

    idNumber = idNumber.trim();

    if (validateIdNumber(idNumber) === false) {
        console.log("CCCD hoac ho chieu khong dung dinh dang!");
        return;
    }

    let flightNumber = prompt("Nhap ma chuyen bay:");

    if (flightNumber === null || flightNumber.trim() === "") {
        console.log("Ma chuyen bay khong hop le!");
        return;
    }

    flightNumber = flightNumber.trim().toUpperCase();

    let newPassenger = {
        pnrCode: pnrCode,
        passengerName: passengerName.trim(),
        idNumber: idNumber,
        flightNumber: flightNumber,
        seatNumber: "",
        isCheckedIn: false
    };

    passengers.push(newPassenger);

    console.log("Them ho so hanh khach thanh cong!");
}

// 6. Check-in va cap so ghe
function checkInPassenger() {
    let pnrCode = prompt("Nhap ma PNR can check-in:");

    if (pnrCode === null || pnrCode.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    let passenger = findPassengerByPnr(pnrCode);

    if (passenger === null) {
        console.log("Khong tim thay hanh khach!");
        return;
    }

    if (passenger.isCheckedIn === true) {
        console.log("Hanh khach da check-in!");
        return;
    }

    if (validateIdNumber(passenger.idNumber) === false) {
        console.log("Giay to tuy than khong hop le!");
        return;
    }

    let seatNumber = findAvailableSeat(passenger.flightNumber);

    if (seatNumber === null) {
        console.log("Chuyen bay da het ghe!");
        return;
    }

    passenger.seatNumber = seatNumber;
    passenger.isCheckedIn = true;

    console.log("Xac thuc giay to thanh cong!");
    console.log("Check-in thanh cong!");

    displayBoardingPass(passenger);
}

// 7. In the len may bay
function displayBoardingPass(passenger) {
    console.log("\n==========================================");
    console.log("             BOARDING PASS");
    console.log("==========================================");
    console.log("PNR           : " + passenger.pnrCode);
    console.log("Passenger     : " + passenger.passengerName);
    console.log("Flight        : " + passenger.flightNumber);
    console.log("Seat          : " + passenger.seatNumber);
    console.log("ID / Passport : " + passenger.idNumber);
    console.log("Status        : CHECKED IN");
    console.log("------------------------------------------");
    console.log("|||| ||| |||||| || ||||| |||| ||| |||||||");
    console.log("==========================================");
}

// 8. Hien thi danh sach hanh khach
function listPassengers() {
    console.log("\n========== DANH SACH HANH KHACH ==========");

    for (let i = 0; i < passengers.length; i++) {
        console.log("------------------------------");
        console.log("PNR: " + passengers[i].pnrCode);
        console.log("Ho ten: " + passengers[i].passengerName);
        console.log("Giay to: " + passengers[i].idNumber);
        console.log("Chuyen bay: " + passengers[i].flightNumber);
        console.log("So ghe: " + (passengers[i].seatNumber || "Chua co"));
        console.log(
            "Trang thai: " +
            (passengers[i].isCheckedIn ? "CHECKED_IN" : "NOT_CHECKED_IN")
        );
    }

    if (passengers.length === 0) {
        console.log("Chua co ho so hanh khach!");
    }
}

// 9. Ham main dieu khien menu
function main() {
    let menuChoice;

    do {
        console.log("\n========== QUAN LY HANH KHACH ==========");
        console.log("1. Them ho so hanh khach");
        console.log("2. Check-in va in Boarding Pass");
        console.log("3. Xem danh sach hanh khach");
        console.log("4. Thoat chuong trinh");

        menuChoice = prompt("Nhap lua chon tu 1 den 4:");

        if (menuChoice === null) {
            menuChoice = "4";
        }

        switch (menuChoice) {
            case "1":
                addPassenger();
                break;

            case "2":
                checkInPassenger();
                break;

            case "3":
                listPassengers();
                break;

            case "4":
                console.log("Da thoat chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le!");
                break;
        }
    } while (menuChoice !== "4");
}

// Bat dau chuong trinh
main();
