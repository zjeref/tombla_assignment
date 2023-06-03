const asyncHandler = require('express-async-handler');
const Ticket = require('../model/ticket')
const { validateCreateTicket, validateFetchTicket } = require('../validations/ticket-validation')

exports.createTicket = asyncHandler(async (req, res) => {
    await validateCreateTicket(req, res)

    const number = req.query.number || 1;

    let ticketArray = [];
    for (let i = 0; i < number; i++) {
        const prevSet = await Ticket.find()
            .sort({ _id: -1 })
            .limit(5)
            .exec()

        const ticketSet = await generateTicket(prevSet);
        const newTicket = new Ticket({
            set: ticketSet
        })
        await newTicket.save();
        ticketArray[i] = newTicket;
    }
    res.status(200).json(ticketArray)
})


exports.fetchTicket = asyncHandler(async (req, res) => {
    await validateFetchTicket(req, res);

    const currentPage = req.query.currentPage || 1; //current page number .. default is 1
    const pageSize = req.query.pageSize || 10; // page size .. default is 10

    const totalTicketCount = await Ticket.countDocuments();
    const totalPageCount = Math.ceil(totalTicketCount / pageSize);

    const nextPageAvailable = currentPage < totalPageCount

    let allTicket;
    if (nextPageAvailable) {
        allTicket = await Ticket.find()
            .skip((currentPage - 1) * pageSize)
            .limit(10)
            .exec()
    } else {
        allTicket = await Ticket.find()
            .skip((totalPageCount - 1) * pageSize)
            .limit(10)
            .exec()
    }

    res.status(200).json({
        allTicket,
        currentPage,
        pageSize,
        totalPageCount,
        totalTicketCount,
        nextPageAvailable
    })

})











//Functions

const generateTicket = async (prevSet) => {
    let usedNumber = new Set();// for checking used number in pervious ticket
    let newTicket = []; // storing new ticket rows ... i.e 3

    //adding all used number inside set so we can check it later
    for (let i = 0; i < prevSet.length; i++) {
        for (let row = 0; row < prevSet.length; row++) {
            for (let column = 0; column < prevSet[row].length; column++) {
                if (prevSet[row][column] !== 0) {
                    usedNumber.add(prevSet[row][column]);
                }
            }
        }
    }

    //new Ticket generation 3x9
    for (let row = 0; row < 3; row++) {
        let currentRow = []

        // randomly selecting 4 columns where we will set it value to 0
        let blankCols = new Set();
        for (let i = 0; i < 4; i++) {
            let column;
            if (i == 0) {
                column = Math.floor(Math.random() * 9);
            } else {
                let number;
                do {
                    number = Math.floor(Math.random() * 9);
                } while (blankCols.has(number))
                column = number;
            }
            blankCols.add(column);
        }

        // adding random numbers in row
        for (let column = 0; column < 9; column++) {
            if (blankCols.has(column)) {
                currentRow[column] = 0;
            } else {
                let number;

                //first number shouldn't not be zero unless it is selected in blankCols
                if (column === 0) {
                    let num;
                    do {
                        num = generateRandomNumber(10 * column);
                    } while (usedNumber.has(num) || num === 0)
                    number = num;
                    currentRow[column] = number;
                    usedNumber.add(number)
                } else {
                    let num;
                    do {
                        num = generateRandomNumber(10 * column);
                    } while (usedNumber.has(num))
                    number = num;
                    currentRow[column] = number;
                    usedNumber.add(number)
                }
            }
        }
        newTicket[row] = currentRow
    }
    return newTicket;

}

const generateRandomNumber = (range) => {
    return Math.floor(Math.random() * 10) + range;
}