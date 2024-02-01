package com.TicketBooking.controllers;

import com.TicketBooking.entities.Ticket;
import com.TicketBooking.models.request.GenerateTicketRequest;
import com.TicketBooking.services.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tickets")
@AllArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/generate")
    public ResponseEntity<Ticket> generateTicket(@RequestBody GenerateTicketRequest request) {
        try {
            Ticket response = ticketService.generateTicket(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/checkIn/{ticketId}")
    public ResponseEntity checkIn(@PathVariable String ticketId) {
        try {
            String response = ticketService.checkIn(ticketId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/checkOut/{ticketId}")
    public ResponseEntity checkOut(@PathVariable String ticketId) {
        try {
            String  response = ticketService.checkOut(ticketId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/authenticate/{ticketId}")
    public ResponseEntity<String> validateTicket(@PathVariable String ticketId) {
        try {
            String response = ticketService.validateTicket(ticketId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
