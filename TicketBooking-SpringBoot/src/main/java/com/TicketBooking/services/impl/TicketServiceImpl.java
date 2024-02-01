package com.TicketBooking.services.impl;

import com.TicketBooking.entities.Ticket;
import com.TicketBooking.models.request.GenerateTicketRequest;
import com.TicketBooking.repository.TicketRepository;
import com.TicketBooking.services.TicketService;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;

    @Override
    public Ticket generateTicket(GenerateTicketRequest request) throws Exception{
        if (Objects.isNull(request)) {
            throw new Exception("Request body cannot be empty!");
        }

        // TODO: PRICE SHOULD BE CALCULATED FROM THE BACKEND SIDE
        if (request.getPrice() <= 0) {
            throw new Exception("Price cannot be null!");
        }

        if (StringUtils.isEmpty(request.getStartStation()) || StringUtils.isEmpty(request.getEndStation())) {
            throw new Exception("Station fields cannot be empty!");
        }
        Ticket ticket = new Ticket(UUID.randomUUID().toString(), LocalDateTime.now().plusHours(18), 0, request.getPrice(), request.getStartStation(), request.getEndStation());
        return ticketRepository.save(ticket);
    }

    @Override
    public String checkIn(String ticketId) throws Exception {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            return "Ticket not found";
        }

        Ticket ticket = optionalTicket.get();

        if (ticket.getExpiryTime().isBefore(LocalDateTime.now())) {
            return "Ticket is expired";
        } else if (ticket.getUsageCount() >= 1) {
            return "Check-in restricted!";
        }
        ticket.setUsageCount(1);
        ticketRepository.save(ticket);
        return "Checked-in successfully!";
    }

    @Override
    public String checkOut(String ticketId) throws Exception {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            return "Ticket not found";
        }

        Ticket ticket = optionalTicket.get();

        if (ticket.getExpiryTime().isBefore(LocalDateTime.now())) {
            return "Ticket is expired";
        } else if (ticket.getUsageCount() != 1) {
            return "Check-out restricted!";
        }
        ticket.setUsageCount(2);
        ticketRepository.save(ticket);
        return "Checked-out successfully!";
    }

    @Override
    public String validateTicket(String ticketId) throws Exception{

        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            return "Ticket not found";
        }

        Ticket ticket = optionalTicket.get();

        if (ticket.getExpiryTime().isBefore(LocalDateTime.now())) {
            return "Ticket is expired";
        } else if (ticket.getUsageCount() >= 2) {
            return "Ticket usage is over!";
        } else if (ticket.getUsageCount() == 1){
            return "Ticket used for check-in";
        }
        return "New ticket";
    }
}
