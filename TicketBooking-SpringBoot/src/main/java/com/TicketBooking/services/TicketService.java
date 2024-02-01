package com.TicketBooking.services;

import com.TicketBooking.entities.Ticket;
import com.TicketBooking.models.request.GenerateTicketRequest;
import com.TicketBooking.services.impl.TicketServiceImpl;

public interface TicketService {

  Ticket generateTicket(GenerateTicketRequest request) throws Exception;

  String checkIn(String ticketId) throws Exception;

  String checkOut(String ticketId) throws Exception;

  String validateTicket(String ticketId) throws Exception;
}
