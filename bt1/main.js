
const tickets = [
    {
        pnr: "VN001",
        customerName: "Nguyen Van An",
        flight: "VN202",
        seat: "12A",
        ticketClass: "ECONOMY",
        baggageWeight: 25,
        status: "BOOKED"
    },
    {
        pnr: "VN002",
        customerName: "Tran Thi Mai",
        flight: "VN305",
        seat: "5B",
        ticketClass: "BUSINESS",
        baggageWeight: 20,
        status: "BOOKED"
    },
    {
        pnr: "VN003",
        customerName: "Le Van Nam",
        flight: "VN410",
        seat: "18C",
        ticketClass: "ECONOMY",
        baggageWeight: 15,
        status: "BOOKED"
    }
];

// 1. Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr === pnr) {
            return tickets[i];
        }
    }

    return null;
}

// 2. Tinh phi hanh ly qua can
function calculateExcessBaggageFee(ticket, baggageWeight) {
    let baggageLimit = 20;

    if (ticket.ticketClass === "BUSINESS") {
        baggageLimit = 30;
    }

    if (baggageWeight > baggageLimit) {
        return (baggageWeight - baggageLimit) * 50000;
    } else {
        return 0;
    }
}

// 3. Hien thi danh sach ve
function listTickets() {
    console.log("\n========== DANH SACH VE MAY BAY ==========");

    console.log(
        "PNR".padEnd(10) +
        "Ten khach".padEnd(22) +
        "Chuyen bay".padEnd(13) +
        "Hang ve".padEnd(13) +
        "Trang thai"
    );

    for (let i = 0; i < tickets.length; i++) {
        console.log(
            tickets[i].pnr.padEnd(10) +
            tickets[i].customerName.padEnd(22) +
            tickets[i].flight.padEnd(13) +
            tickets[i].ticketClass.padEnd(13) +
            tickets[i].status
        );
    }
}

// 4. In the len may bay
function displayBoardingPass(ticket, baggageWeight, fee) {
    console.log("\n========== BOARDING PASS ==========");
    console.log("Ma dat cho: " + ticket.pnr);
    console.log("Ten hanh khach: " + ticket.customerName);
    console.log("Chuyen bay: " + ticket.flight);
    console.log("Ghe ngoi: " + ticket.seat);
    console.log("Hang ve: " + ticket.ticketClass);
    console.log("Hanh ly ky gui: " + baggageWeight + " kg");
    console.log("Phi hanh ly: " + fee.toLocaleString("vi-VN") + " VND");
    console.log("Trang thai: " + ticket.status);
    console.log("===================================");
}

// 5. Check-in hanh khach
function checkIn() {
    let pnr = prompt("Nhap ma dat cho PNR:");

    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    pnr = pnr.trim().toUpperCase();

    let ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ticket.status !== "BOOKED") {
        console.log("Ve khong the check-in! Trang thai: " + ticket.status);
        return;
    }

    let inputWeight = prompt("Nhap can nang hanh ly (kg):");

    if (inputWeight === null || inputWeight.trim() === "") {
        console.log("Can nang khong hop le!");
        return;
    }

    let baggageWeight = Number(inputWeight);

    if (isNaN(baggageWeight) || baggageWeight < 0) {
        console.log("Can nang phai la mot so khong am!");
        return;
    }

    let fee = calculateExcessBaggageFee(ticket, baggageWeight);

    ticket.baggageWeight = baggageWeight;
    ticket.status = "CHECKED_IN";

    console.log("Check-in thanh cong!");
    console.log("Phi hanh ly qua can: " + fee.toLocaleString("vi-VN") + " VND");

    displayBoardingPass(ticket, baggageWeight, fee);
}

// 6. Tra cuu ve theo PNR hoac ten khach hang
function searchTicket() {
    let keyword = prompt("Nhap ma PNR hoac ten khach hang:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Thong tin tra cuu khong hop le!");
        return;
    }

    keyword = keyword.trim().toUpperCase();

    let found = false;

    for (let i = 0; i < tickets.length; i++) {
        if (
            tickets[i].pnr.toUpperCase() === keyword ||
            tickets[i].customerName.toUpperCase().includes(keyword)
        ) {
            console.log("\nThong tin ve:");
            console.log("PNR: " + tickets[i].pnr);
            console.log("Khach hang: " + tickets[i].customerName);
            console.log("Chuyen bay: " + tickets[i].flight);
            console.log("Ghe: " + tickets[i].seat);
            console.log("Hang ve: " + tickets[i].ticketClass);
            console.log("Hanh ly: " + tickets[i].baggageWeight + " kg");
            console.log("Trang thai: " + tickets[i].status);

            found = true;
        }
    }

    if (found === false) {
        console.log("Khong tim thay ve!");
    }
}

// 7. Huy ve
function cancelTicket() {
    let pnr = prompt("Nhap ma PNR can huy:");

    if (pnr === null || pnr.trim() === "") {
        console.log("Ma PNR khong hop le!");
        return;
    }

    pnr = pnr.trim().toUpperCase();

    let ticket = findTicketByPnr(pnr);

    if (ticket === null) {
        console.log("Khong tim thay ve!");
    } else if (ticket.status === "CANCELLED") {
        console.log("Ve nay da duoc huy truoc do!");
    } else {
        ticket.status = "CANCELLED";
        console.log("Huy ve thanh cong!");
    }
}

// 8. Ham main dieu khien chuong trinh
function main() {
    let menuChoice;

    do {
        console.log("\n========== QUAN LY VE MAY BAY ==========");
        console.log("1. Hien thi danh sach ve");
        console.log("2. Check-in va tinh phi hanh ly");
        console.log("3. Tra cuu ve");
        console.log("4. Huy ve");
        console.log("5. Thoat chuong trinh");

        menuChoice = prompt("Nhap lua chon tu 1 den 5:");

        if (menuChoice === null) {
            menuChoice = "5";
        }

        switch (menuChoice) {
            case "1":
                listTickets();
                break;

            case "2":
                checkIn();
                break;

            case "3":
                searchTicket();
                break;

            case "4":
                cancelTicket();
                break;

            case "5":
                console.log("Da thoat chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le! Vui long chon tu 1 den 5.");
                break;
        }
    } while (menuChoice !== "5");
}

// Chay chuong trinh
main();
