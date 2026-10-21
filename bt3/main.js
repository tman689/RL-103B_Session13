
const ticket = {
    pnr: "VN001",
    passengerName: "Nguyen Van An",
    ticketClass: "ECONOMY",
    lotusMember: "TITAN"
};

const baggageList = [
    { name: "Vali", weight: 18, type: "NORMAL" },
    { name: "Guitar", weight: 5, type: "BULKY" },
    { name: "Long thu cung", weight: 4, type: "PET" }
];

// Ham tinh phi hanh ly
function calculateBaggageSurcharge(ticket, baggageList) {
    let totalWeight = 0;
    let freeWeight = 20;
    let surcharge = 0;
    let specialFee = 0;

    // Hang ve BUSINESS duoc mien 30kg
    if (ticket.ticketClass === "BUSINESS") {
        freeWeight = 30;
    }

    // Hoi vien TITAN duoc them 10kg
    if (
        ticket.lotusMember === "TITAN" ||
        ticket.lotusMember === "GOLD" ||
        ticket.lotusMember === "PLATINUM"
    ) {
        freeWeight = freeWeight + 10;
    }

    // Tinh tong can nang va phi dich vu
    for (let i = 0; i < baggageList.length; i++) {
        totalWeight = totalWeight + baggageList[i].weight;

        if (baggageList[i].type === "BULKY") {
            specialFee = specialFee + 200000;
        }

        if (baggageList[i].type === "PET") {
            specialFee = specialFee + 500000;
        }
    }

    // Tinh phi qua can
    let excessWeight = totalWeight - freeWeight;

    if (excessWeight > 0) {
        if (excessWeight <= 5) {
            surcharge = excessWeight * 60000;
        } else {
            surcharge = 5 * 60000 + (excessWeight - 5) * 80000;
        }
    }

    let totalFee = surcharge + specialFee;

    // In bien lai
    console.log("\n========================================");
    console.log("          BIEN LAI HANH LY");
    console.log("========================================");
    console.log(`Ma ve:           ${ticket.pnr}`);
    console.log(`Hanh khach:      ${ticket.passengerName}`);
    console.log(`Hang ve:         ${ticket.ticketClass}`);
    console.log(`Tong hanh ly:    ${totalWeight} kg`);
    console.log(`Mien cuoc:       ${freeWeight} kg`);
    console.log(`Vuot can:        ${Math.max(0, excessWeight)} kg`);
    console.log(`Phi qua can:     ${surcharge.toLocaleString("vi-VN")} VND`);
    console.log(`Phi dich vu:     ${specialFee.toLocaleString("vi-VN")} VND`);
    console.log("----------------------------------------");
    console.log(`TONG THANH TOAN: ${totalFee.toLocaleString("vi-VN")} VND`);
    console.log("========================================");

    return totalFee;
}

// Chay chuong trinh
calculateBaggageSurcharge(ticket, baggageList);
